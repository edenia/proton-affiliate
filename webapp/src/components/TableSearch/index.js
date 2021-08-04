import React, { useState } from 'react'
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
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Checkbox from '@material-ui/core/Checkbox'

import styles from './styles'

const EnhancedTableHead = ({
  onSelectAllClick,
  numSelected,
  rowCount,
  showColumnCheck,
  headCells
}) => (
  <TableHead>
    <TableRow>
      {showColumnCheck && (
        <TableCell padding="none" style={{ padding: '0' }}>
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
      )}
      {headCells.map(headCell => (
        <TableCell key={headCell.id} align={headCell.align}>
          {headCell.label}
        </TableCell>
      ))}
    </TableRow>
  </TableHead>
)

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  rowCount: PropTypes.number.isRequired,
  showColumnCheck: PropTypes.bool,
  headCells: PropTypes.array
}

const useStyles = makeStyles(styles)

const TablePages = ({
  usePagination,
  showColumnCheck,
  rows,
  headCells,
  useLoadMore,
  loadMoreDisable,
  handleOnLoadMore,
  pagination,
  handleOnPageChange,
  handleOnRowsPerPageChange,
  onClickRow
}) => {
  const classes = useStyles()
  const [selected, setSelected] = useState([])

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      setSelected(rows.map(n => n.name))

      return
    }
    setSelected([])
  }

  const handleClick = (_, name) => {
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

  const isSelected = name => selected.indexOf(name) !== -1

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
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={rows.length}
              showColumnCheck={showColumnCheck}
              headCells={headCells}
            />
            <TableBody>
              {(rows || []).map((row, index) => {
                const isItemSelected = isSelected(row.username)
                const labelId = `table-checkbox-${index}`

                return (
                  <TableRow
                    hover
                    aria-checked={isItemSelected}
                    key={labelId}
                    selected={isItemSelected}
                    onClick={() => onClickRow(row)}
                  >
                    {showColumnCheck && (
                      <TableCell padding="none" style={{ padding: '0' }}>
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          onClick={event => handleClick(event, row.username)}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                    )}
                    <TableCell
                      id={labelId}
                      scope="row"
                      padding="none"
                      className={classes.mainColorRow}
                    >
                      <Typography
                        className={classes.linkLabel}
                        onClick={() => console.log(row.invitee)}
                      >
                        {row[headCells[0].id]}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">{row[headCells[1].id]}</TableCell>
                    <TableCell align="center">{row[headCells[2].id]}</TableCell>
                    <TableCell align="right" className={classes.mainColorRow}>
                      {row[headCells[3].id]}
                    </TableCell>
                  </TableRow>
                )
              })}
              {!rows.length && (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    {/* @todo: add translation */}
                    No hay datos
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {useLoadMore && (
          <Box
            style={{
              marginTop: 16,
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <Button
              disabled={!loadMoreDisable}
              variant="outlined"
              color="primary"
              onClick={handleOnLoadMore}
            >
              LOAD MORE
            </Button>
          </Box>
        )}
        {usePagination && (
          <TablePagination
            classes={{ root: classes.tablePagination }}
            rowsPerPageOptions={pagination.rowsPerPageOptions}
            component="div"
            count={pagination.count}
            rowsPerPage={pagination.rowsPerPage}
            page={pagination.page}
            onPageChange={handleOnPageChange}
            onRowsPerPageChange={handleOnRowsPerPageChange}
          />
        )}
      </Box>
    </Box>
  )
}

TablePages.propTypes = {
  usePagination: PropTypes.bool,
  showColumnCheck: PropTypes.bool,
  rows: PropTypes.array,
  headCells: PropTypes.array,
  useLoadMore: PropTypes.bool,
  loadMoreDisable: PropTypes.bool,
  handleOnLoadMore: PropTypes.func,
  pagination: PropTypes.object,
  handleOnPageChange: PropTypes.func,
  handleOnRowsPerPageChange: PropTypes.func,
  onClickRow: PropTypes.func
}

TablePages.defaultProps = {
  usePagination: false,
  showColumnCheck: false,
  rows: [],
  headCells: [],
  useLoadMore: false,
  loadMoreDisable: false,
  handleOnLoadMore: () => {},
  handleOnPageChange: () => {},
  handleOnRowsPerPageChange: () => {},
  onClickRow: () => {},
  pagination: {
    count: 0,
    rowsPerPage: 5,
    rowsPerPageOptions: [5, 10, 25],
    page: 1
  }
}

export default TablePages
