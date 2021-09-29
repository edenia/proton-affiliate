const { axiosUtil } = require('../utils')
const { exchangeConfig } = require('../config')

const getRate = async (from, to) => {
  const { data } = await axiosUtil.get(
    exchangeConfig.api.replace('(from)', from).replace('(to)', to)
  )

  return data[from][to]
}

module.exports = {
  getRate
}
