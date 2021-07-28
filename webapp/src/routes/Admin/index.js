import React from 'react'
import { useTranslation } from 'react-i18next'
import { makeStyles } from '@material-ui/styles'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

import TableSearch from '../../components/TableSearch'
import Accordion from '../../components/Accordion'

import styles from './styles'
import FloatingMenu from '../../components/FloatingButon'
// import UsersTable from './UsersTable'

const useStyles = makeStyles(styles)

const Admin = () => {
  const { t } = useTranslation('adminRoute')
  const classes = useStyles()
  // const [showModal, setShowModal] = useState(false)

  // const handleOnClick = () => {
  //   setShowModal(true)
  // }

  // const handleOnClose = () => {
  //   setShowModal(false)
  // }

  return (
    <Box className={classes.adminPage}>
      <Box className={classes.adminHead}>
        <Typography className={classes.adminTitle}>{t('title')}</Typography>
        <Typography className={classes.adminInfo}>{t('pageInfo')}</Typography>
      </Box>
      <Accordion title="User Approvals">
        <TableSearch />
      </Accordion>
      <Accordion title="Referral Payments">
        <TableSearch />
      </Accordion>

      <FloatingMenu />
    </Box>
  )
}

export default Admin
