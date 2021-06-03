const { BaseActionWatcher } = require('demux')
const { NodeosActionReader } = require('demux-eos')

const ActionHandler = require('./action-handler')
const handlerVersion = require('./handler-version')

const init = () => {
  const actionHandler = new ActionHandler([handlerVersion])
  const actionReader = new NodeosActionReader({
    onlyIrreversible: true,
    // @todo: get start from env variable
    startAtBlock: 73407893,
    // @todo: get node endpoint from environment variable
    nodeosEndpoint: 'https://test.proton.eosusa.news'
  })
  const watcher = new BaseActionWatcher(actionReader, actionHandler, 500)

  watcher.watch()
}

module.exports = {
  init
}
