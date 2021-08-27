import React from 'react'
import PropTypes from 'prop-types'

const TimeSvg = ({ color = '#582ACB' }) => {
  return (
    <svg width="24" height="24" fill="none">
      <path
        d="M11.995 2C6.47 2 2 6.475 2 12s4.47 10 9.995 10C17.52 22 22 17.525 22 12S17.52 2 11.995 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
        fill={color}
      />
      <path d="M12.5 7H11v6l5.245 3.15.755-1.23-4.5-2.67V7z" fill={color} />
    </svg>
  )
}

TimeSvg.propTypes = {
  color: PropTypes.string
}

export default TimeSvg
