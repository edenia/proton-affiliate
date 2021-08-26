import React from 'react'
import PropTypes from 'prop-types'

const CancelSvg = ({ color = '#582ACB' }) => {
  return (
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="2" />
      <path stroke={color} strokeWidth="2" d="M18 18L6 6" />
    </svg>
  )
}

CancelSvg.propTypes = {
  color: PropTypes.string
}

export default CancelSvg
