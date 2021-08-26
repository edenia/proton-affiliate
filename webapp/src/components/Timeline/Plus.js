import React from 'react'
import PropTypes from 'prop-types'

const PlusSvg = ({ color = '#582ACB' }) => {
  return (
    <svg width="24" height="24" fill="none">
      <path
        d="M12 6v12M18 12H6"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

PlusSvg.propTypes = {
  color: PropTypes.string
}

export default PlusSvg
