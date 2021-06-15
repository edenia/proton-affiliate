const { axiosUtil } = require('../utils')
const { exchangeConfig } = require('../config')

const affiliateSservice = require('./affiliate.service')

const getRate = async (from, to) => {
  const { data } = await axiosUtil.get(
    exchangeConfig.api.replace('(from)', from).replace('(to)', to)
  )

  return data[from][to]
}

const sync = async () => {
  try {
    const rate = await getRate(exchangeConfig.from, exchangeConfig.to)
    const transaction = await affiliateSservice.setRate(parseFloat(rate))
    console.log(`success sync rate: trxid ${transaction.processed.id}`)
  } catch (error) {
    console.error(`error syncing exchange rate: ${error.message}`)
  }
}

const worker = () => {
  return {
    name: 'SYNC EXCHANGE RATE',
    interval: exchangeConfig.syncInterval,
    action: sync
  }
}

module.exports = {
  worker
}
