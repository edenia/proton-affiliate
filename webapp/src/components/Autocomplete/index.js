import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { makeStyles } from '@material-ui/core/styles'

import styles from './styles'

const useStyles = makeStyles(styles)

const AutocompleteInput = ({ data, label, onHandleSelect, name, styles }) => {
  const classes = useStyles()

  return (
    <Autocomplete
      id={`country-selector-${name}`}
      className={clsx(classes.autocompleteField, styles)}
      options={data}
      classes={{
        option: classes.option
      }}
      onChange={(e, values) => onHandleSelect(name, values)}
      autoHighlight
      getOptionLabel={option => option.value}
      renderOption={option => <>{option.value}</>}
      renderInput={params => (
        <TextField
          {...params}
          label={label}
          variant="filled"
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-option'
          }}
        />
      )}
    />
  )
}

AutocompleteInput.propTypes = {
  data: PropTypes.array,
  label: PropTypes.string,
  name: PropTypes.string,
  onHandleSelect: PropTypes.func,
  styles: PropTypes.object
}
export default AutocompleteInput
