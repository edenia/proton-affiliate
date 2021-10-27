const { hasuraUtil } = require('../utils')

const findByAccount = async account => {
  const query = `
    query ($account: String!) {
      join_request(where: {account: {_eq: $account}}) {
        id
        account
        email
        receive_news
        created_at
        updated_at
      }
    }
  `
  const data = await hasuraUtil.instance.request(query, { account })

  return !!data.join_request.length ? data.join_request[0] : null
}

module.exports = {
  findByAccount
}
