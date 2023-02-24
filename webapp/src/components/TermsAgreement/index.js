import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Checkbox from '@material-ui/core/Checkbox'

import styles from './styles'

const useStyles = makeStyles(styles)

const TermsAgreement = ({ termsAgreed, setTermsAgreed }) => {
  const classes = useStyles()
  const { t } = useTranslation('termsComponent')

  return (
    <Box className={classes.terms}>
      <Checkbox
        color="primary"
        checked={termsAgreed}
        onChange={() => setTermsAgreed(!termsAgreed)}
        inputProps={{ 'aria-label': 'agree terms and conditions' }}
      />
      <Typography>
        {t('agreement')}{' '}
        <Link to="/terms" target="_blank">
          {t('terms')}
        </Link>
        .
      </Typography>
    </Box>
  )
}

TermsAgreement.propTypes = {
  termsAgreed: PropTypes.bool,
  setTermsAgreed: PropTypes.func
}

export default memo(TermsAgreement)
