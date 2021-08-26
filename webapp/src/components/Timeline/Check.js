import React from 'react'
import PropTypes from 'prop-types'

const CancelSvg = ({ color = '#582ACB' }) => {
  return (
    <svg width="24" height="24" fill="none">
      <path
        d="M18.702 5.784 12.788 3.25a2 2 0 0 0-1.576 0L5.298 5.784A2 2 0 0 0 4.1 7.871l.613 4.904a7 7 0 0 0 2.465 4.509l3.54 2.95a2 2 0 0 0 2.561 0l3.541-2.95a7 7 0 0 0 2.465-4.51l.613-4.903a2 2 0 0 0-1.197-2.087z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="m9 12 2.569 2.569a.5.5 0 0 0 .77-.077L16 9"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

CancelSvg.propTypes = {
  color: PropTypes.string
}

export default CancelSvg
