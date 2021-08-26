import React from 'react'
import PropTypes from 'prop-types'

const CloseSvg = ({ color = '#582ACB' }) => {
  return (
    <svg width="24" height="24" fill="none">
      <path
        d="M18 6 6 18M6 6l12 12"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
    </svg>
  )
}

CloseSvg.propTypes = {
  color: PropTypes.string
}

export default CloseSvg
