const { BaseActionWatcher } = require('demux')
const { NodeosActionReader } = require('demux-eos')

const { networkConfig, demuxConfig } = require('../../config')
const { hasuraUtil } = require('../../utils')

const ActionHandler = require('./action-handler')
const handlerVersion = require('./handler-version')

const init = async () => {
  const actionHandler = new ActionHandler([handlerVersion])
  const actionReader = new NodeosActionReader({
    onlyIrreversible: true,
    startAtBlock: demuxConfig.startAtBlock,
    nodeosEndpoint: networkConfig.api
  })
  const watcher = new BaseActionWatcher(actionReader, actionHandler, 500)

  await hasuraUtil.hasuraAssembled()
  watcher.watch()
}

module.exports = {
  init
}
