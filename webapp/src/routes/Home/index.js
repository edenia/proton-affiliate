import React, { memo, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import DoneIcon from '@material-ui/icons/Done'

import { HomeImage } from '../../components/SvgIcons'
import { affiliateUtil } from '../../utils'
import useDebounce from '../../hooks/useDebounce'
import Modal from '../../components/Modal'

import styles from './styles'

const useStyles = makeStyles(styles)

function createData(username, date, reward, tx) {
  return { username, date, reward, tx }
}

const rows = [
  createData('johndowny', 'Today', '2500', 'b37763c0'),
  createData('alexahohnson', 'Today', '2500', 'aa00bc83'),
  createData('robvega', 'Today', '2500', '497073c0'),
  createData('annajin', 'Today', '2500', '3dd5bb6'),
  createData('wrobert', 'Jun 22', '2100', 'a6bfbc94'),
  createData('pedrosancho', 'Jun 21', '200', '1d2a44c8')
]

const Home = () => {
  const classes = useStyles()
  const { t } = useTranslation('homeRoute')
  const [open, setOpen] = useState(false)
  const [checked, setCheked] = useState(false)
  const [account, setAccount] = useState('')
  const [mail, setMail] = useState('')
  const [isValidAccount, setIsValidAccount] = useState(false)
  const debouncedSearchTerm = useDebounce(account, 200)

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

  return (
    <Box className={classes.homePage}>
      <Box className={classes.title}>
        <Typography className={classes.onChain}>{t('title')}</Typography>
        <Typography className={classes.referralText}>{t('title2')}</Typography>
      </Box>
      <HomeImage />
      <Typography className={classes.info}>{t('infoPage')}</Typography>

      <Button
        className={classes.joinBtn}
        variant="contained"
        color="primary"
        onClick={() => setOpen(true)}
      >
        {t('buttonLabel')}
      </Button>
      <Box className={classes.lastReferral}>
        <Typography variant="h5" className={classes.tableTitle}>
          {t('tableTitle')}
        </Typography>
      </Box>
      <TableContainer>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>{t('username')}</TableCell>
              <TableCell align="center">{t('status')}</TableCell>
              <TableCell align="center">{t('reward')}</TableCell>
              <TableCell align="right">{t('tx')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.username}>
                <TableCell className={classes.mainColorRow}>
                  {row.username}
                </TableCell>
                <TableCell align="center">{row.date}</TableCell>
                <TableCell align="center">{row.reward}</TableCell>
                <TableCell align="right" className={classes.mainColorRow}>
                  <Link href="#">{row.tx}</Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
