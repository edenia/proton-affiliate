import React from 'react'
import PropTypes from 'prop-types'

const AddSvg = ({ color = '#582ACB' }) => {
  return (
    <svg width="24" height="24" fill="none">
      <circle
        cx="12"
        cy="8"
        r="4"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.327 15.076C12.889 15.026 12.445 15 12 15c-1.92 0-3.806.474-5.369 1.373-1.562.9-2.75 2.197-3.3 3.738a1 1 0 0 0 1.883.672c.362-1.01 1.183-1.967 2.415-2.676 1.014-.584 2.235-.957 3.529-1.07a3.005 3.005 0 0 1 2.169-1.961z"
        fill={color}
      />
      <path
        d="M18 14v8M22 18h-8"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

AddSvg.propTypes = {
  color: PropTypes.string
}

export default AddSvg
