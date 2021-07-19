import React, { memo, useState } from 'react'
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
import Modal from '../../components/Modal'

const useStyles = makeStyles(theme => ({
  homePage: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  title: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: theme.spacing(5),
    marginTop: theme.spacing(2)
  },
  onChain: {
    fontWeight: 'bold',
    fontSize: 40,
    lineHeight: '52px',
    textAlign: 'center',
    color: '#7045D9'
  },
  referralText: {
    fontWeight: 'bold',
    fontSize: 40,
    lineHeight: '52px',
    textAlign: 'center',
    color: '#000000'
  },
  info: {
    fontSize: 18,
    lineHeight: '20px',
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    letterSpacing: '0.25px',
    color: '#6B717F',
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(5),
    width: 250
  },
  joinBtn: {
    width: 270,
    height: 48,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 14,
    letterSpacing: '1px',
    textTransform: 'uppercase',
    color: '#FFFFFF'
  },
  lastReferral: {
    marginTop: theme.spacing(6),
    height: 56,
    width: '100%',
    background: 'rgba(245, 247, 250, 0.74)',
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 3)
  },
  tableTitle: {
    fontWeight: '600',
    fontSize: 21,
    lineHeight: '27px',
    letterSpacing: '0.15px',
    color: 'rgba(0, 0, 0, 0.87)'
  },
  table: {
    '& th': {
      padding: theme.spacing(2, 1),
      fontWeight: '600',
      fontSize: 12,
      textTransform: 'uppercase',
      color: 'rgba(0, 0, 0, 0.87)'
    },
    '& td': {
      padding: theme.spacing(2, 1),
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: 13
    }
  },
  mainColorRow: {
    color: theme.palette.primary.main
  },
  joinModel: {
    width: '80%',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(3, 3, 2, 3),
    borderRadius: 5
  },
  joinText: {
    fontSize: 16,
    lineHeight: '24px',
    letterSpacing: '0.44px',
    color: 'rgba(0, 0, 0, 0.87)'
  },
  textField: {
    width: '100%',
    marginTop: theme.spacing(2)
  },
  helperText: {
    fontSize: 12,
    lineHeight: '16px',
    letterSpacing: '0.4px',
    color: 'rgba(0, 0, 0, 0.6)',
    marginLeft: theme.spacing(1)
  },
  checkBoxReceive: {
    marginTop: theme.spacing(1),
    '& .MuiFormControlLabel-label': {
      fontSize: 15,
      lineHeight: '24px',
      letterSpacing: '0.15px',
      color: '#000000'
    }
  },
  bntWrapper: {
    marginTop: theme.spacing(4),
    display: 'flex',
    justifyContent: 'space-between'
  }
}))

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
  const [open, setOpen] = useState(false)
  const [checked, setCheked] = useState(false)

  return (
    <Box className={classes.homePage}>
      <Box className={classes.title}>
        <Typography className={classes.onChain}>On-Chain</Typography>
        <Typography className={classes.referralText}>
          Referral Program
        </Typography>
      </Box>
      <HomeImage />
      <Typography className={classes.info}>
        Join the program and recieve token rewards for every user that register
        and KYC on to Proton.
      </Typography>

      <Button
        className={classes.joinBtn}
        variant="contained"
        color="primary"
        onClick={() => setOpen(true)}
      >
        Join Now
      </Button>
      <Box className={classes.lastReferral}>
        <Typography variant="h5" className={classes.tableTitle}>
          Last 10 Referrals
        </Typography>
      </Box>
      <TableContainer>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>USERNAME</TableCell>
              <TableCell align="center">STATUS</TableCell>
              <TableCell align="center">REWARD (XPR)</TableCell>
              <TableCell align="right">TX</TableCell>
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
            Enter your Proton account and email address to let you know when you
            have been accepted to the referral program.
          </Typography>
          <form noValidate autoComplete="off">
            <TextField
              className={classes.textField}
              id="filled-account"
              label="Account"
              variant="filled"
              InputProps={{
                endAdornment: <DoneIcon color="primary" />
              }}
            />
            <Typography variant="p" className={classes.helperText}>
              Account found!
            </Typography>
            <TextField
              className={classes.textField}
              id="filled-email"
              label="Email Address"
              variant="filled"
              InputProps={{
                endAdornment: <DoneIcon color="primary" />
              }}
            />
            <Typography variant="p" className={classes.helperText}>
              Email found!
            </Typography>
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
            label="Receive news and updates."
          />
          <Box className={classes.bntWrapper}>
            <Button onClick={() => setCheked(false)}>Cancel</Button>
            <Button color="primary">Save</Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  )
}

Home.propTypes = {}

export default memo(Home)
