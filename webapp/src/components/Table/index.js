import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import Box from '@material-ui/core/Box'

function createData(username, status, reward, tx) {
  return { username, status, reward, tx }
}

const rows = [
  createData('johndowny', 'Pending', '-', '-'),
  createData('alexahohnson', 'Pending', '-', '-'),
  createData('robvega', 'Registered', '-', '-'),
  createData('annajin', 'KYC', '1024', '3dd5bb6'),
  createData('wrobert', 'KYC', '920', 'a6bfbc94'),
  createData('pedrosancho', 'Expired', '200', '1d2a44c8'),
  createData('robvega', 'Pending', '1024', '497073c0'),
  createData('annajin', 'Pending', '1024', '3dd5bb6'),
  createData('wrobert', 'KYC', '920', 'a6bfbc94'),
  createData('pedrosancho', 'Expired', '200', '1d2a44c8'),
  createData('robvega', 'Pending', '1024', '-'),
  createData('annajin', 'Pending', '1024', '-'),
  createData('johndowny', 'Pending', '1024', 'b37763c0'),
  createData('alexahohnson', 'Expired', '1024', 'aa00bc83'),
  createData('robvega', 'Expired', '1024', '-'),
  createData('annajin', 'Expired', '2500', '-'),
  createData('wrobert', 'KYC', '920', 'a6bfbc94'),
  createData('pedrosancho', 'Expired', '200', '1d2a44c8'),
  createData('robvega', 'Registered', '2500', '497073c0'),
  createData('annajin', 'Registered', '2500', '-'),
  createData('wrobert', 'KYC', '920', 'a6bfbc94'),
  createData('pedrosancho', 'Expired', '200', '1d2a44c8'),
  createData('robvega', 'Registered', '2500', '497073c0'),
  createData('annajin', 'Registered', '2500', '-')
]

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2)
  },
  table: {
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
  mainColorRow: {
    color: theme.palette.primary.main
  },
  bottomPagination: {
    background: 'rgba(245, 247, 250, 0.74)'
  }
}))

const TableComp = () => {
  const classes = useStyles()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage)

  return (
    <Box className={classes.root}>
      <Box className={classes.paper}>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={'medium'}
            aria-label="enhanced table"
          >
            <TableHead>
              <TableRow>
                <TableCell>USERNAME</TableCell>
                <TableCell align="center">STATUS</TableCell>
                <TableCell align="center">REWARD</TableCell>
                <TableCell align="right">TX</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow role="checkbox" key={row.username}>
                    <TableCell
                      id={`enhanced-table-${index}`}
                      scope="row"
                      padding="none"
                      className={classes.mainColorRow}
                    >
                      {row.username}
                    </TableCell>
                    <TableCell align="center">{row.status}</TableCell>
                    <TableCell align="center">{row.reward}</TableCell>
                    <TableCell align="right" className={classes.mainColorRow}>
                      {row.tx}
                    </TableCell>
                  </TableRow>
                ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
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
          className={classes.bottomPagination}
        />
      </Box>
    </Box>
  )
}

export default TableComp
