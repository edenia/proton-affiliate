import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import styles from './styles'

const useStyles = makeStyles(styles)

const SearchForm = ({ handleOnClick, handleOnChange, value }) => {
  const classes = useStyles()
  const { t } = useTranslation('searchForm')

  const onHandleOnClick = () => {
    handleOnClick(value)
  }

  const onHandleOnKeyPress = e => {
    if (e.charCode === 13) {
      handleOnClick(e.target.value)
    }
  }

  const onHandleOnChange = e => {
    handleOnChange(e.target.value)
  }

  return (
    <Box className={classes.searchFormWrapper}>
      <Box noValidate autoComplete="off" className={classes.form}>
        <Typography variant="h6" className={classes.searchTitle}>
          {t('searchTitle')}
        </Typography>
        <Box className={classes.formInputsWrapper}>
          <TextField
            className={classes.searchInput}
            onChange={onHandleOnChange}
            value={value}
            placeholder={t('protonAccount')}
            variant="outlined"
            size="small"
            autoComplete="off"
            onKeyPress={onHandleOnKeyPress}
          />
          <Button
            className={classes.searchBtn}
            variant="contained"
            color="primary"
            onClick={onHandleOnClick}
          >
            {t('check')}
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

SearchForm.propTypes = {
  handleOnClick: PropTypes.func,
  handleOnChange: PropTypes.func,
  value: PropTypes.string
}

export default SearchForm
