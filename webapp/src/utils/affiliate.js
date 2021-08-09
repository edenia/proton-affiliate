import { eosApi } from './eosapi'

const ROLES = {
  1: 'ADMIN',
  2: 'REFERRER'
}
const ROLES_IDS = {
  ADMIN: 1,
  REFERRER: 2
}
const REFFERAL_STATUS = {
  1: 'PENDING_USER_REGISTRATION',
  2: 'PENDING_KYC_VERIFICATION',
  3: 'PENDING_PAYMENT',
  4: 'PAYMENT_REJECTED',
  5: 'EXPIRED',
  6: 'PAID'
}
const REFFERAL_STATUS_IDS = {
  PENDING_USER_REGISTRATION: 1,
  PENDING_KYC_VERIFICATION: 2,
  PENDING_PAYMENT: 3,
  PAYMENT_REJECTED: 4,
  EXPIRED: 5,
  PAID: 6
}
const GUEST_ROLE = 'NON-AFFILIATED'
// @todo: use env variable for smart contract name
const AFFILLIATE_ACCOUNT = 'affiliate'

const getUserRole = async accountName => {
  if (!accountName) {
    return GUEST_ROLE
  }

  const { rows } = await eosApi.getTableRows({
    json: true,
    code: AFFILLIATE_ACCOUNT,
    scope: AFFILLIATE_ACCOUNT,
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
          account: AFFILLIATE_ACCOUNT,
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

const approveKyc = async (admin, invitee) => {
  const transaction = await admin.signTransaction(
    {
      actions: [
        {
          account: AFFILLIATE_ACCOUNT,
          name: 'setstatus',
          authorization: [
            {
              actor: admin.accountName,
              permission: 'active'
            }
          ],
          data: {
            invitee,
            status: REFFERAL_STATUS_IDS.PENDING_PAYMENT,
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

const payRef = async (admin, invitee) => {
  const transaction = await admin.signTransaction(
    {
      actions: [
        {
          account: AFFILLIATE_ACCOUNT,
          name: 'payref',
          authorization: [
            {
              actor: admin.accountName,
              permission: 'active'
            }
          ],
          data: {
            invitee,
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

const rejectRef = async (admin, invitee, memo = '') => {
  const transaction = await admin.signTransaction(
    {
      actions: [
        {
          account: AFFILLIATE_ACCOUNT,
          name: 'rejectref',
          authorization: [
            {
              actor: admin.accountName,
              permission: 'active'
            }
          ],
          data: {
            memo,
            invitee,
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

const getReferrals = async lowerBound => {
  const {
    rows,
    more: hasMore,
    next_key: cursor
  } = await eosApi.getTableRows({
    code: AFFILLIATE_ACCOUNT,
    scope: AFFILLIATE_ACCOUNT,
    table: 'referrals',
    json: true,
    lower_bound: lowerBound
  })

  return {
    rows: rows.map(row => ({ ...row, status: REFFERAL_STATUS[row.status] })),
    cursor,
    hasMore
  }
}

const getUser = async account => {
  const { rows } = await eosApi.getTableRows({
    code: AFFILLIATE_ACCOUNT,
    scope: AFFILLIATE_ACCOUNT,
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

    return user.role === ROLES[2]
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
  REFFERAL_STATUS,
  REFFERAL_STATUS_IDS,
  ROLES,
  ROLES_IDS,
  GUEST_ROLE,
  getUserRole,
  rejectRef,
  payRef,
  addUser,
  approveKyc,
  getUsers,
  getUser,
  isAccountValidAsReferrer,
  isAccountValidAsInvitee,
  getReferrals
}
