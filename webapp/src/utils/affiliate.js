import { eosApi } from './eosapi'
import { mainConfig } from '../config'

const JOIN_REQUEST_STATUS = {
  0: 'NONE',
  1: 'PENDING_KYC',
  2: 'PENDING_APPROVAL',
  3: 'APPROVED'
}
const JOIN_REQUEST_STATUS_IDS = {
  NONE: 0,
  PENDING_KYC: 1,
  PENDING_APPROVAL: 2,
  APPROVED: 3
}
const ROLES = {
  1: 'ADMIN',
  2: 'REFERRER'
}
const ROLES_IDS = {
  ADMIN: 1,
  REFERRER: 2
}
const REFERRAL_STATUS = {
  1: 'PENDING_USER_REGISTRATION',
  2: 'PENDING_KYC_VERIFICATION',
  3: 'PENDING_PAYMENT',
  4: 'PAYMENT_REJECTED',
  5: 'EXPIRED',
  6: 'PAID'
}
const REFERRAL_STATUS_IDS = {
  PENDING_USER_REGISTRATION: 1,
  PENDING_KYC_VERIFICATION: 2,
  PENDING_PAYMENT: 3,
  PAYMENT_REJECTED: 4,
  EXPIRED: 5,
  PAID: 6
}
const GUEST_ROLE = 'NON-AFFILIATED'
const MIN_PAGE_SIZE = 10

const getUserRole = async accountName => {
  if (!accountName) {
    return GUEST_ROLE
  }

  const { rows } = await eosApi.getTableRows({
    json: true,
    code: mainConfig.affiliateAccount,
    scope: mainConfig.affiliateAccount,
    table: 'users',
    lower_bound: accountName,
    upper_bound: accountName
  })

  if (!rows.length) {
    return GUEST_ROLE
  }

  return ROLES[rows[0].role] || GUEST_ROLE
}

const addUser = async (admin, users, role = 2, accountName) => {
  const transaction = await admin.transact(
    {
      transaction: {
        actions: users.map(user => ({
          account: mainConfig.affiliateAccount,
          name: 'adduser',
          authorization: [
            {
              actor: accountName,
              permission: 'active'
            }
          ],
          data: {
            user,
            role,
            admin: accountName
          }
        }))
      }
    },
    {
      broadcast: true
    }
  )

  return {
    transactionId: transaction.processed.id,
    blockNum: transaction.processed.block_num
  }
}

const removeUsers = async (admin, users = [], accountName) => {
  const transaction = await admin.transact(
    {
      transaction: {
        actions: users.map(user => ({
          account: mainConfig.affiliateAccount,
          name: 'rmuser',
          authorization: [
            {
              actor: accountName,
              permission: 'active'
            }
          ],
          data: {
            user,
            admin: accountName
          }
        }))
      }
    },
    {
      broadcast: true
    }
  )

  return transaction
}

const approveKyc = async (admin, invitee, accountName) => {
  const transaction = await admin.transact(
    {
      transaction: {
        actions: [
          {
            account: mainConfig.affiliateAccount,
            name: 'setstatus',
            authorization: [
              {
                actor: accountName,
                permission: 'active'
              }
            ],
            data: {
              invitee,
              status: REFERRAL_STATUS_IDS.PENDING_PAYMENT,
              admin: accountName
            }
          }
        ]
      }
    },
    {
      broadcast: true
    }
  )

  return transaction
}

const payRef = async (admin, invitees = [], accountName) => {
  const transaction = await admin.transact(
    {
      transaction: {
        actions: invitees.map(invitee => ({
          account: mainConfig.affiliateAccount,
          name: 'payref',
          authorization: [
            {
              actor: accountName,
              permission: 'active'
            }
          ],
          data: {
            invitee,
            admin: accountName
          }
        }))
      }
    },
    {
      broadcast: true
    }
  )

  return transaction
}

const rejectRef = async (admin, invitees, accountName, memo) => {
  const transaction = await admin.transact(
    {
      transaction: {
        actions: invitees.map(invitee => ({
          account: mainConfig.affiliateAccount,
          name: 'rejectref',
          authorization: [
            {
              actor: accountName,
              permission: 'active'
            }
          ],
          data: {
            memo,
            invitee,
            admin: accountName
          }
        }))
      }
    },
    {
      broadcast: true
    }
  )

  return transaction
}

const payRejected = async (admin, invitees, referrers, accountName) => {
  const actions = []

  for (const index in invitees) {
    actions.push({
      account: mainConfig.affiliateAccount,
      name: 'payrejected',
      authorization: [
        {
          actor: accountName,
          permission: 'active'
        }
      ],
      data: {
        invitee: invitees[index],
        referrer: referrers[index],
        admin: accountName
      }
    })
  }

  const transaction = await admin.transact(
    {
      transaction: {
        actions
      }
    },
    {
      broadcast: true
    }
  )

  return transaction
}

const checkKyc = async acc => {
  const { rows } = await eosApi.getTableRows({
    code: mainConfig.eosioProtonAccount,
    scope: mainConfig.eosioProtonAccount,
    table: 'usersinfo',
    json: true,
    lower_bound: acc,
    upper_bound: acc
  })

  return !!rows[0]?.kyc?.length
}

const getUsersByRole = async (lowerBound, filterRowsBy) => {
  const users = await getUsers(lowerBound)
  const filteredUsers = users.rows.filter(
    ({ role }) => !filterRowsBy || role === ROLES[filterRowsBy]
  )

  if (!(filteredUsers.length < MIN_PAGE_SIZE && users.hasMore)) {
    return {
      rows: filteredUsers,
      cursor: users.cursor,
      hasMore: users.hasMore
    }
  }

  const {
    rows: tempRows,
    cursor: tempCursor,
    hasMore: tempHasMore
  } = await getUsersByRole(users.cursor, filterRowsBy)

  return {
    rows: tempRows ? [...filteredUsers, ...tempRows] : filteredUsers,
    cursor: tempCursor,
    hasMore: tempHasMore
  }
}

const getUsers = async (lowerBound, filterRowsBy) => {
  const {
    rows,
    more: hasMore,
    next_key: cursor
  } = await eosApi.getTableRows({
    code: mainConfig.affiliateAccount,
    scope: mainConfig.affiliateAccount,
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

const getParams = async () => {
  const { rows } = await eosApi.getTableRows({
    code: mainConfig.affiliateAccount,
    scope: mainConfig.affiliateAccount,
    table: 'params',
    json: true
  })

  return rows.length > 0 ? rows[0] : {}
}

const getReferralsByStatus = async (lowerBound, filterRowsBy) => {
  const users = await getReferrals(lowerBound)
  const filteredUsers = users.rows.filter(
    ({ status }) => !filterRowsBy || status === REFERRAL_STATUS[filterRowsBy]
  )

  if (!(filteredUsers.length < MIN_PAGE_SIZE && users.hasMore)) {
    return {
      rows: filteredUsers,
      cursor: users.cursor,
      hasMore: users.hasMore
    }
  }

  const {
    rows: tempRows,
    cursor: tempCursor,
    hasMore: tempHasMore
  } = await getReferralsByStatus(users.cursor, filterRowsBy)

  return {
    rows: tempRows ? [...filteredUsers, ...tempRows] : filteredUsers,
    cursor: tempCursor,
    hasMore: tempHasMore
  }
}

const getReferrals = async lowerBound => {
  const {
    rows,
    more: hasMore,
    next_key: cursor
  } = await eosApi.getTableRows({
    code: mainConfig.affiliateAccount,
    scope: mainConfig.affiliateAccount,
    table: 'referrals',
    json: true,
    lower_bound: lowerBound
  })

  return {
    rows: rows.map(row => ({ ...row, status: REFERRAL_STATUS[row.status] })),
    cursor,
    hasMore
  }
}

const getUser = async account => {
  const { rows } = await eosApi.getTableRows({
    code: mainConfig.affiliateAccount,
    scope: mainConfig.affiliateAccount,
    table: 'users',
    json: true,
    lower_bound: account,
    upper_bound: account
  })

  if (!rows.length) {
    return
  }

  return {
    ...rows[0],
    role: ROLES[rows[0].role]
  }
}

const isAccountValidAsReferrer = async account => {
  if (!account) {
    return false
  }

  try {
    const user = (await getUser(account)) || {}

    return (
      user.role === ROLES[ROLES_IDS.REFERRER] ||
      user.role === ROLES[ROLES_IDS.ADMIN]
    )
  } catch (error) {}

  return false
}

const isAccountValidAsInvitee = async account => {
  if (!account) {
    return false
  }

  try {
    const data = await eosApi.getAccount(account)

    return !data
  } catch (error) {}

  return true
}

export const affiliateUtil = {
  REFERRAL_STATUS,
  REFERRAL_STATUS_IDS,
  ROLES,
  ROLES_IDS,
  GUEST_ROLE,
  JOIN_REQUEST_STATUS,
  JOIN_REQUEST_STATUS_IDS,
  getUserRole,
  rejectRef,
  payRejected,
  payRef,
  addUser,
  removeUsers,
  approveKyc,
  checkKyc,
  getUsersByRole,
  getUsers,
  getUser,
  isAccountValidAsReferrer,
  isAccountValidAsInvitee,
  getReferralsByStatus,
  getReferrals,
  getParams
}
