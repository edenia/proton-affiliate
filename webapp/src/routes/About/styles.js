import commonStyles from '../../utils/commonStyles'

export default theme => {
  const { commonTitle, commonTitleInfo, commonSubtitle, commonSubtitleInfo } =
    commonStyles(theme)

  return {
    aboutPage: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
      padding: theme.spacing(2),
      [theme.breakpoints.up('md')]: {
        width: 1024,
        padding: theme.spacing(8, 2, 2, 2)
      }
    },
    aboutTitle: {
      ...commonTitle
    },
    aboutMainInfo: {
      ...commonTitleInfo
    },
    aboutSubtitle: {
      ...commonSubtitle
    },
    aboutInfo: {
      ...commonSubtitleInfo
    },
    logoSm: {
      width: '100%',
      '& svg': {
        width: '100%',
        height: 300
      },
      [theme.breakpoints.up('md')]: {
        width: '0%',
        height: 0
      }
    },
    boxInfo: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'left',
      marginBottom: theme.spacing(1)
    },
    boxInfoTitle: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: theme.spacing(1),
      [theme.breakpoints.up('md')]: {
        alignItems: 'left'
      }
    },
    logoMd: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
        width: '100%'
      }
    },
    boxSm: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none'
      }
    },
    boxMd: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'initial',
        marginBottom: theme.spacing(1)
      }
    }
  }
}
