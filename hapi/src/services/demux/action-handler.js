const { AbstractActionHandler } = require('demux')

// @todo handle demux state with a database
let state = {
  blockNumber: 0,
  blockHash: '',
  handlerVersionName: 'v1'
}

class ActionHandler extends AbstractActionHandler {
  setup() {}

  async handleWithState(handle) {
    try {
      await handle(state)
    } catch (err) {
      console.error(err)
    }
  }

  async updateIndexState(prevState, block) {
    const { blockInfo } = block
    console.log(`updateIndexState ${blockInfo.blockNumber}`)

    try {
      state = {
        ...prevState,
        blockNumber: blockInfo.blockNumber,
        blockHash: blockInfo.blockHash
      }
    } catch (err) {
      console.error(err)
    }
  }

  async loadIndexState() {
    try {
      return state
    } catch (err) {
      console.error(err)
    }
  }
}

module.exports = ActionHandler
