import { eosApi } from './eosapi'

const ROLES = {
  1: 'ADMIN',
  2: 'REFERRER'
}

const GUEST_ROLE = 'NON-AFFILIATED'

const getUserRole = async accountName => {
  if (!accountName) {
    return GUEST_ROLE
  }

  // @todo: use env variable for smart contract name
  const { rows } = await eosApi.getTableRows({
    json: true,
    code: 'affiliate',
    scope: 'affiliate',
    table: 'users',
    lower_bound: accountName,
    upper_bound: accountName
  })

  if (!rows.length) {
    return GUEST_ROLE
  }

  return ROLES[rows[0].role] || GUEST_ROLE
}

const addUser = async (admin, user, role = 2) => {
  const transaction = await admin.signTransaction(
    {
      actions: [
        {
          account: 'affiliate',
          name: 'adduser',
          authorization: [
            {
              actor: admin.accountName,
              permission: 'active'
            }
          ],
          data: {
            user,
            role,
            admin: admin.accountName
          }
        }
      ]
    },
    {
      broadcast: true
    }
  )

  return transaction
}

const getUsers = async lowerBound => {
  const {
    rows,
    more: hasMore,
    next_key: cursor
  } = await eosApi.getTableRows({
    code: AFFILLIATE_ACCOUNT,
    scope: AFFILLIATE_ACCOUNT,
    table: 'users',
    json: true,
    lower_bound: lowerBound
  })

  return {
    rows: rows.map(row => ({ ...row, role: ROLES[row.role] })),
    cursor,
    hasMore
  }
}

export const affiliateUtil = {
  ROLES,
  GUEST_ROLE,
  getUserRole,
  addUser
}
