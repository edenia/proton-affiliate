import React, { memo, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { makeStyles } from '@material-ui/core/styles'
import { useQuery } from '@apollo/client'
import moment from 'moment'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import DoneIcon from '@material-ui/icons/Done'

import { HomeImage } from '../../components/SvgIcons'
import { affiliateUtil } from '../../utils'
import { GET_REFERRAL_HISTORY } from '../../gql'
import useDebounce from '../../hooks/useDebounce'
import TableSearch from '../../components/TableSearch'
import Modal from '../../components/Modal'

import styles from './styles'

const dateFormat = blockTime => {
  const currentData = moment()
  const diff = currentData.diff(moment(blockTime), 'days')

  console.log({ diff, currentData, blockTime: moment(blockTime) })

  if (diff === 0) return 'Today'

  return moment(blockTime).format('ll')
}

const headCellLAstReward = [
  { id: 'username', align: 'left', label: 'username' },
  { id: 'date', align: 'center', label: 'date' },
  { id: 'reward', align: 'center', label: 'reward (XPR)' },
  { id: 'tx', align: 'center', label: 'tx' }
]
const useStyles = makeStyles(styles)

const Home = () => {
  const classes = useStyles()
  const { t } = useTranslation('homeRoute')
  const { loading, data } = useQuery(GET_REFERRAL_HISTORY)
  const [open, setOpen] = useState(false)
  const [checked, setCheked] = useState(false)
  const [account, setAccount] = useState('')
  const [mail, setMail] = useState('')
  const [isValidAccount, setIsValidAccount] = useState(false)
  const debouncedSearchTerm = useDebounce(account, 200)
  const [referralRows, setReferralRows] = useState([])

  const handleOnChangeAccount = e => {
    setAccount(e.target.value)
  }

  const handleOnChangeMail = e => {
    setMail(e.target.value)
  }

  useEffect(() => {
    const validateAccount = async () => {
      const isValid = await affiliateUtil.isAccountValidAsInvitee(
        debouncedSearchTerm
      )

      setIsValidAccount(isValid)
    }

    if (debouncedSearchTerm) {
      validateAccount()
    }
  }, [debouncedSearchTerm])

  useEffect(() => {
    if (loading || !data) return

    const lastReferrals = (data.referral_history || []).map(item => ({
      username: item.invitee,
      date: dateFormat(item.block_time),
      reward: '-',
      tx: (item.trxid || '').slice(0, 7)
    }))

    setReferralRows(lastReferrals)
  }, [data, loading])

  return (
    <Box className={classes.homePage}>
      <Box className={classes.infoBox}>
        <Box className="left">
          <Box className={classes.title}>
            <Typography className={classes.onChain}>{t('title')}</Typography>
            <Typography className={classes.referralText}>
              {t('title2')}
            </Typography>
          </Box>
          <HomeImage className={classes.imageSm} width={352} height={193} />
          <Typography className={classes.info}>{t('infoPage')}</Typography>

          <Button
            className={classes.joinBtn}
            variant="contained"
            color="primary"
            onClick={() => setOpen(true)}
          >
            {t('buttonLabel')}
          </Button>
        </Box>
        <HomeImage className={classes.imageMd} height={328} />
      </Box>

      <Box className={classes.lastReferral}>
        <Typography variant="h5" className={classes.tableTitle}>
          {t('tableTitle')}
        </Typography>
      </Box>

      <TableSearch
        headCells={headCellLAstReward || []}
        rows={referralRows || []}
      />

      <Modal open={open} setOpen={setOpen}>
        <Box className={classes.joinModel}>
          <Typography variant="p" className={classes.joinText}>
            {t('modalInfo')}
          </Typography>
          <form noValidate autoComplete="off">
            <TextField
              className={classes.textField}
              onChange={handleOnChangeAccount}
              value={account}
              id="filled-account"
              label={t('account')}
              variant="filled"
              InputProps={{
                endAdornment: isValidAccount ? (
                  <DoneIcon color="primary" />
                ) : (
                  <></>
                )
              }}
            />
            {isValidAccount && (
              <Typography variant="p" className={classes.helperText}>
                {t('accountHelperText')}
              </Typography>
            )}
            <TextField
              className={classes.textField}
              onChange={handleOnChangeMail}
              value={mail}
              id="filled-email"
              label={t('address')}
              variant="filled"
            />
          </form>
          <FormControlLabel
            className={classes.checkBoxReceive}
            control={
              <Switch
                checked={checked}
                onChange={() => setCheked(!checked)}
                name="receive"
                color="primary"
              />
            }
            label={t('switchLabel')}
          />
          <Box className={classes.bntWrapper}>
            <Button
              onClick={() => {
                setCheked(false)
                setOpen(false)
              }}
            >
              {t('cancel')}
            </Button>
            <Button color="primary">{t('save')}</Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  )
}

Home.propTypes = {}

export default memo(Home)
