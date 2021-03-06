import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import IconButton from '@material-ui/core/IconButton'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import CancelIcon from '@material-ui/icons/Cancel'
import AccessTimeIcon from '@material-ui/icons/AccessTime'
import { useQuery } from '@apollo/client'
import moment from 'moment'

import CustomizedTimeline from '../Timeline'
import Modal from '../Modal'
import { GET_LAST_SYNCED } from '../../gql'

import styles from './styles'

const useStyles = makeStyles(styles)

const HistoryModal = ({ open, onClose, children, referral, title }) => {
  const classes = useStyles()
  const { data = {}, refetch } = useQuery(GET_LAST_SYNCED, {
    fetchPolicy: 'network-only'
  })

  useEffect(() => {
    refetch()
  }, [open])

  return (
    <Modal open={open} setOpen={onClose}>
      <Box className={classes.timeline}>
        <Box className={classes.secondayBar} position="sticky">
          <Typography className={classes.secondayTitle}>
            {referral?.invitee} by {referral?.referrer}
          </Typography>
          <IconButton aria-label="Back" onClick={onClose}>
            <CancelIcon />
          </IconButton>
        </Box>
        <Box className={classes.bodySecondary}>
          <Box className={classes.boxSecondary}>
            <Typography className={classes.timelineTitle}>{title}</Typography>
            <Typography className={classes.timelineTitle}>
              Follow this referral history.
            </Typography>
            {data?.hyperion_state?.length > 0 && (
              <Typography className={classes.timelineTitle}>
                <span style={{ fontWeight: 'bold' }}>Last update: </span>
                {moment(data.hyperion_state[0].last_synced_at).format(
                  'MM-DD-YYYY, HH:mm:ss'
                )}
              </Typography>
            )}
            {referral?.history?.length > 0 && (
              <Box className={classes.listActions}>
                <CustomizedTimeline
                  items={referral?.history}
                  itemHasAction={(children || []).some(child => Boolean(child))}
                />
                <Box className={classes.modalFooter}>{children}</Box>
              </Box>
            )}
            {!referral?.history?.length && (
              <Box className={classes.emptyState}>
                <AccessTimeIcon />
                <Typography>
                  Pending Irreversibility Check again in 5min
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Modal>
  )
}

HistoryModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.node,
  title: PropTypes.string,
  referral: PropTypes.any
}

export default HistoryModal
