import { createMuiTheme } from '@material-ui/core/styles'

import palette from './palette'
import breakpoints from './breakpoints'
import typography from './typography'

export default useDarkMode =>
  createMuiTheme({
    breakpoints,
    typography,
    palette: { type: useDarkMode ? 'dark' : 'light', ...palette }
  })
