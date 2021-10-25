import commonStyles from '../../utils/commonStyles'

export default theme => {
  const { commonTitle, commonTitleInfo, commonSubtitle, commonSubtitleInfo } =
    commonStyles(theme)

  return {
    helpPage: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: theme.spacing(2),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: 1024,
        padding: theme.spacing(8, 2, 2, 2)
      }
    },
    helpTitle: {
      ...commonTitle
    },
    helpInfo: {
      ...commonTitleInfo
    },
    boxLinks: {
      display: 'flex',
      marginTop: theme.spacing(3),
      '& a': {
        '&:hover': {
          textDecoration: 'none'
        }
      },
      '& svg': {
        marginRight: theme.spacing(3)
      },
      '& p': {
        marginTop: 0
      }
    },
    helpSubtitle: {
      ...commonSubtitle
    },
    helpSubinfo: {
      ...commonSubtitleInfo
    },
    svgIcon: {
      width: 24,
      height: 24,
      margin: '0 12px'
    },
    iconBox: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: theme.spacing(3)
    },
    textUpper: {
      textTransform: 'uppercase',
      fontWeight: '500'
    },
    protonIcon: {
      width: 36,
      height: 36,
      marginRight: 12
    },
    links: {
      color: theme.palette.common.black
    }
  }
}
