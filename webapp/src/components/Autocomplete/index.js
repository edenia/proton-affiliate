import React from 'react'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  option: {
    fontSize: 15,
    '& > span': {
      marginRight: 10,
      fontSize: 18
    }
  }
})

const AutocompleteInput = ({ data, label, onHandleSelect, name }) => {
  const classes = useStyles()

  return (
    <Autocomplete
      id={`country-selector-${name}`}
      style={{ width: '100%', marginTop: 16 }}
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
  onHandleSelect: PropTypes.func
}
export default AutocompleteInput
