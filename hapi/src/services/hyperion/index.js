const moment = require('moment')

const { hyperionConfig } = require('../../config')
const { hasuraUtil, axiosUtil, sleepUtil } = require('../../utils')

const hyperionStateService = require('../hyperion-state.service')

const updaters = require('./updaters')

const getLastSyncedAt = async () => {
  const state = await hyperionStateService.getState()

  if (!!state) {
    return state.lastSyncedAt
  }

  await hyperionStateService.saveOrUpdate(hyperionConfig.startAt)

  return hyperionConfig.startAt
}

const getGap = lastSyncedAt => {
  if (moment().diff(moment(lastSyncedAt), 'days') > 0) {
    return {
      amount: 1,
      unit: 'day'
    }
  }

  if (moment().diff(moment(lastSyncedAt), 'hours') > 0) {
    return {
      amount: 1,
      unit: 'hour'
    }
  }

  return {
    amount: 164,
    unit: 'seconds'
  }
}

const getActions = async params => {
  const limit = 100
  const { data } = await axiosUtil.get(
    `${hyperionConfig.api}/v2/history/get_actions`,
    {
      params: {
        ...params,
        limit,
        filter: updaters.map(updater => updater.type).join(','),
        sort: 'asc',
        simple: true,
        checkLib: true
      }
    }
  )
  const notIrreversible = data.simple_actions.find(item => !item.irreversible)

  if (!!notIrreversible) {
    await sleepUtil(
      164 - moment().diff(moment(notIrreversible.timestamp), 'seconds')
    )

    return getActions(params)
  }

  return {
    hasMore: data.total.value > limit + params.skip || 0,
    actions: data.simple_actions
  }
}

const runUpdaters = async actions => {
  for (let index = 0; index < actions.length; index++) {
    const action = actions[index]
    const updater = updaters.find(
      item => item.type === `${action.contract}:${action.action}`
    )

    if (!updater) {
      continue
    }

    await updater.apply(action)
  }
}

const sync = async () => {
  await hasuraUtil.hasuraAssembled()
  const lastSyncedAt = await getLastSyncedAt()
  const gap = getGap(lastSyncedAt)
  const after = moment(lastSyncedAt).add(1, 'millisecond').toISOString()
  const before = moment(after).add(gap.amount, gap.unit).toISOString()
  let skip = 0
  let hasMore = true
  let actions = []

  if (moment().diff(moment(before), 'seconds') <= 0) {
    await sleepUtil(1)

    return sync()
  }

  while (hasMore) {
    ;({ hasMore, actions } = await getActions({ after, before, skip }))
    skip += actions.length
    await runUpdaters(actions)
  }

  await hyperionStateService.saveOrUpdate(before)

  return sync()
}

const syncWorker = () => {
  return {
    name: 'SYNC ACTIONS',
    action: sync
  }
}

module.exports = {
  syncWorker
}
