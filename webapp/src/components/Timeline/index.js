import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Timeline from '@material-ui/lab/Timeline'
import TimelineItem from '@material-ui/lab/TimelineItem'
import TimelineSeparator from '@material-ui/lab/TimelineSeparator'
import TimelineConnector from '@material-ui/lab/TimelineConnector'
import TimelineContent from '@material-ui/lab/TimelineContent'
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent'
import TimelineDot from '@material-ui/lab/TimelineDot'
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import CheckIcon from '@material-ui/icons/Check'
import HelpIcon from '@material-ui/icons/Help'
import CloseIcon from '@material-ui/icons/Close'
import BlockIcon from '@material-ui/icons/Block'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

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

const CustomizedTimeline = () => {
  const classes = useStyles()

  return (
    <Timeline align="alternate" classes={{ root: classes.main }}>
      <TimelineItem>
        <TimelineOppositeContent>
          <Typography variant="body2" color="textSecondary">
            06/01/21 12:54PM
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
              Referral created d045er78
            </Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>

      <TimelineItem>
        <TimelineOppositeContent>
          <Typography variant="body2" color="textSecondary">
            06/01/21 01:42PM
          </Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot
            color="primary"
            variant="outlined"
            classes={{ root: classes.item }}
          >
            <CheckIcon color="primary" />
          </TimelineDot>
          <TimelineConnector className={classes.secondaryTail} />
        </TimelineSeparator>
        <TimelineContent>
          <Paper elevation={3} className={classes.paper}>
            <Typography className={classes.infomation}>
              Account registered 0c45ef55
            </Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>

      <TimelineItem>
        <TimelineOppositeContent>
          <Typography variant="body2" color="textSecondary">
            06/01/21 01:42PM
          </Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot
            color="primary"
            variant="outlined"
            classes={{ root: classes.item }}
          >
            <PersonAddIcon color="primary" />
          </TimelineDot>
          <TimelineConnector className={classes.secondaryTail} />
        </TimelineSeparator>
        <TimelineContent>
          <Paper elevation={3} className={classes.paper}>
            <Typography className={classes.infomation}>
              Because you need rest
            </Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>

      <TimelineItem>
        <TimelineOppositeContent>
          <Typography variant="body2" color="textSecondary">
            06/01/21 01:42PM
          </Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot
            color="primary"
            variant="outlined"
            classes={{ root: classes.item }}
          >
            <VerifiedUserIcon color="primary" />
          </TimelineDot>
          <TimelineConnector className={classes.secondaryTail} />
        </TimelineSeparator>
        <TimelineContent>
          <Paper elevation={3} className={classes.paper}>
            <Typography className={classes.infomation}>
              Because you need rest
            </Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>

      <TimelineItem>
        <TimelineOppositeContent>
          <Typography variant="body2" color="textSecondary">
            06/01/21 01:42PM
          </Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot
            color="primary"
            variant="outlined"
            classes={{ root: classes.item }}
          >
            <AttachMoneyIcon color="primary" />
          </TimelineDot>
          <TimelineConnector className={classes.secondaryTail} />
        </TimelineSeparator>
        <TimelineContent>
          <Paper elevation={3} className={classes.paper}>
            <Typography className={classes.infomation}>
              Because you need rest
            </Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>

      <TimelineItem>
        <TimelineOppositeContent>
          <Typography variant="body2" color="textSecondary">
            06/01/21 01:42PM
          </Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot
            color="primary"
            variant="outlined"
            classes={{ root: classes.item }}
          >
            <PersonAddIcon color="primary" />
          </TimelineDot>
          <TimelineConnector className={classes.secondaryTail} />
        </TimelineSeparator>
        <TimelineContent>
          <Paper elevation={3} className={classes.paper}>
            <Typography className={classes.infomation}>
              Because you need rest
            </Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>

      <TimelineItem>
        <TimelineOppositeContent>
          <Typography variant="body2" color="textSecondary">
            06/01/21 01:42PM
          </Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot
            color="primary"
            variant="outlined"
            classes={{ root: classes.item }}
          >
            <CloseIcon color="primary" />
          </TimelineDot>
          <TimelineConnector className={classes.secondaryTail} />
        </TimelineSeparator>
        <TimelineContent>
          <Paper elevation={3} className={classes.paper}>
            <Typography className={classes.infomation}>
              Because you need rest
            </Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>

      <TimelineItem>
        <TimelineOppositeContent>
          <Typography variant="body2" color="textSecondary">
            06/01/21 01:42PM
          </Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot
            color="primary"
            variant="outlined"
            classes={{ root: classes.item }}
          >
            <BlockIcon color="primary" />
          </TimelineDot>
        </TimelineSeparator>
        <TimelineContent>
          <Paper elevation={3} className={classes.paper}>
            <Typography className={classes.infomation}>
              Because this is the life you love!
            </Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  )
}

export default CustomizedTimeline
