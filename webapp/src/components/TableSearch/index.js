import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Checkbox from '@material-ui/core/Checkbox'

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein }
}

const rows = [
  createData('johndowny', 'Pending', '-', '-'),
  createData('alexahohnson', 'Pending', '-', '-'),
  createData('robvega', 'Registered', '-', '-'),
  createData('annajin', 'KYC', '1024', '3dd5bb6'),
  createData('wrobert', 'KYC', '920', 'a6bfbc94'),
  createData('pedrosancho', 'Expired', '200', '1d2a44c8'),
  createData('robvega2', 'Pending', '1024', '497073c0'),
  createData('annajin2', 'Pending', '1024', '3dd5bb6'),
  createData('wrobert', 'KYC', '920', 'a6bfbc94'),
  createData('pedrosancho1', 'Expired', '200', '1d2a44c8'),
  createData('robvega3', 'Pending', '1024', '-'),
  createData('annajin3', 'Pending', '1024', '-'),
  createData('johndowny2', 'Pending', '1024', 'b37763c0'),
  createData('alexahohnson2', 'Expired', '1024', 'aa00bc83'),
  createData('robvega4', 'Expired', '1024', '-'),
  createData('annajin4', 'Expired', '2500', '-'),
  createData('wrobert', 'KYC', '920', 'a6bfbc94'),
  createData('pedrosancho2', 'Expired', '200', '1d2a44c8'),
  createData('robvega5', 'Registered', '2500', '497073c0'),
  createData('annajin5', 'Registered', '2500', '-'),
  createData('wrobert', 'KYC', '920', 'a6bfbc94'),
  createData('pedrosancho3', 'Expired', '200', '1d2a44c8'),
  createData('robvega6', 'Registered', '2500', '497073c0'),
  createData('annajin6', 'Registered', '2500', '-')
]

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })
  return stabilizedThis.map(el => el[0])
}

const headCells = [
  {
    id: 'name',
    align: 'center',
    disablePadding: true,
    label: 'username'
  },
  { id: 'calories', align: 'center', disablePadding: false, label: 'status' },
  { id: 'fat', align: 'center', disablePadding: false, label: 'reward' },
  { id: 'carbs', align: 'center', disablePadding: false, label: 'tx' }
]

const EnhancedTableHead = props => {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount } = props

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="none" style={{ padding: '0' }}>
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2)
  },
  table: {
    minWidth: '100%',
    '& th': {
      padding: theme.spacing(2, 1),
      fontWeight: '600',
      fontSize: 12,
      textTransform: 'uppercase',
      color: 'rgba(0, 0, 0, 0.87)'
    },
    '& td': {
      padding: theme.spacing(2, 1),
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: 13
    }
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1
  },
  mainColorRow: {
    color: theme.palette.primary.main
  },
  linkLabel: {
    fontSize: 13,
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    letterSpacing: 'normal'
  }
}))

const EnhancedTable = () => {
  const classes = useStyles()
  const [order, setOrder] = React.useState('asc')
  const [orderBy, setOrderBy] = React.useState('calories')
  const [selected, setSelected] = React.useState([])
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = rows.map(n => n.name)
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
    }

    setSelected(newSelected)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const isSelected = name => selected.indexOf(name) !== -1

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage)

  return (
    <div className={classes.root}>
      <Box className={classes.paper}>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name)
                  const labelId = `enhanced-table-checkbox-${index}`

                  return (
                    <TableRow
                      hover
                      aria-checked={isItemSelected}
                      key={row.name}
                      selected={isItemSelected}
                    >
                      <TableCell padding="none" style={{ padding: '0' }}>
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          onClick={event => handleClick(event, row.name)}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell
                        id={labelId}
                        scope="row"
                        padding="none"
                        className={classes.mainColorRow}
                      >
                        <Typography
                          className={classes.linkLabel}
                          onClick={() => console.log(row.name)}
                        >
                          {row.name}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">{row.calories}</TableCell>
                      <TableCell align="center">{row.fat}</TableCell>
                      <TableCell
                        align="center"
                        className={classes.mainColorRow}
                      >
                        {row.carbs}
                      </TableCell>
                    </TableRow>
                  )
                })}
              {emptyRows > 0 && (
                <TableRow>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </div>
  )
}

export default EnhancedTable
