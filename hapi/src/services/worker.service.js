const { hasuraConfig } = require('../config')
const { axiosUtil } = require('../utils')

const affiliateService = require('./affiliate.service')
const exchangeService = require('./exchange.service')

const sleep = seconds => {
  return new Promise(resolve => {
    setTimeout(() => resolve(), seconds * 1000)
  })
}

const run = async ({ name, action, interval }) => {
  try {
    await action()
  } catch (error) {
    console.log(`${name} ERROR =>`, error.message)
  }

  console.log(`COMPLETED ${name} WORKER`)

  if (!interval) {
    return
  }

  console.log(`${name} WORKER WILL RUN AGAIN IN ${interval / 60} MINUTES`)
  await sleep(interval)
  run({ name, action, interval })
}

const hasura = async () => {
  let hasuraReady = false

  while (!hasuraReady) {
    try {
      await axiosUtil.get(hasuraConfig.url.replace('/v1/graphql', '/healthz'))
      hasuraReady = true
    } catch (error) {
      hasuraReady = false
      console.log(
        'waiting for hasura...',
        hasuraConfig.url.replace('/v1/graphql', '/healthz')
      )
      await sleep(5)
    }
  }
}

const init = async () => {
  await hasura()
  run(affiliateService.verifyExpiredWorker())
  run(affiliateService.clearReferralsWorker())
  run(exchangeService.worker())
}

module.exports = {
  init
}
