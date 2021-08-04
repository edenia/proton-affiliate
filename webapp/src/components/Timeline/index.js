import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Timeline from '@material-ui/lab/Timeline'
import TimelineItem from '@material-ui/lab/TimelineItem'
import TimelineSeparator from '@material-ui/lab/TimelineSeparator'
import TimelineConnector from '@material-ui/lab/TimelineConnector'
import TimelineDot from '@material-ui/lab/TimelineDot'
import TimelineContent from '@material-ui/lab/TimelineContent'
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent'
// import VerifiedUserIcon from '@material-ui/icons/VerifiedUser'
// import PersonAddIcon from '@material-ui/icons/PersonAdd'
// import CheckIcon from '@material-ui/icons/Check'
// import CloseIcon from '@material-ui/icons/Close'
// import BlockIcon from '@material-ui/icons/Block'
// import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
import HelpIcon from '@material-ui/icons/Help'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import moment from 'moment'
import { getLastCharacters } from '../../utils'

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(1)
  },
  secondaryTail: {
    backgroundColor: theme.palette.primary.main
  },
  main: {
    padding: 0
  },
  infomation: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 12,
    lineHeight: '16px',
    display: 'flex',
    letterSpacing: '0.4px',
    color: '#000000',
    textAlign: 'start'
  },
  item: {
    marginTop: 0,
    marginBottom: 0
  }
}))

const CustomizedTimeline = ({ items }) => {
  const classes = useStyles()

  return (
    <Timeline align="alternate" classes={{ root: classes.main }}>
      {items.map((item, index) => (
        <TimelineItem key={index}>
          <TimelineOppositeContent>
            <Typography variant="body2" color="textSecondary">
              {moment(item.block_time).format('MM/DD/YYYY hh:mmA')}
            </Typography>
          </TimelineOppositeContent>

          <TimelineSeparator>
            <TimelineDot
              color="primary"
              variant="outlined"
              classes={{ root: classes.item }}
            >
              <HelpIcon color="primary" />
            </TimelineDot>
            <TimelineConnector className={classes.secondaryTail} />
          </TimelineSeparator>

          <TimelineContent>
            <Paper elevation={3} className={classes.paper}>
              <Typography className={classes.infomation}>
                {item.action}
              </Typography>
              <a
                rel="noreferrer"
                target="_blank"
                href={`https://testnet.protonscan.io/transaction/${item.trxid}`}
              >
                {getLastCharacters(item.trxid)}
              </a>
            </Paper>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  )
}

CustomizedTimeline.propTypes = {
  items: PropTypes.array
}

CustomizedTimeline.defaultProps = {
  items: []
}

export default CustomizedTimeline
