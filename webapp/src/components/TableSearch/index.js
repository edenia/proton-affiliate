import React from 'react'
import { useTranslation } from 'react-i18next'
import clsx from 'clsx'
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
import Link from '@material-ui/core/Link'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Checkbox from '@material-ui/core/Checkbox'
import IconButton from '@material-ui/core/IconButton'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'

import { mainConfig } from '../../config'

import styles from './styles'

const EnhancedTableHead = ({
  onSelectAllClick,
  numSelected,
  rowCount,
  showColumnCheck,
  headCells,
  showColumnButton,
  disabled,
  classes
}) => (
  <TableHead>
    <TableRow>
      {showColumnCheck && (
        <TableCell className={classes.noPadding}>
          <Checkbox
            disabled={Boolean(disabled)}
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
      )}
      {headCells.map((headCell, index) => (
        <TableCell
          key={headCell.id}
          align={
            showColumnButton && index === headCells.length - 1
              ? 'center'
              : headCell.align
          }
        >
          {headCell.label}
        </TableCell>
      ))}
      {showColumnButton && <TableCell align="right">History</TableCell>}
    </TableRow>
  </TableHead>
)

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  rowCount: PropTypes.number.isRequired,
  showColumnCheck: PropTypes.bool,
  headCells: PropTypes.array,
  showColumnButton: PropTypes.bool,
  disabled: PropTypes.bool,
  classes: PropTypes.object
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
  onReload,
  pagination,
  handleOnPageChange,
  handleOnRowsPerPageChange,
  idName,
  onSelectItem,
  tableName,
  selected,
  showColumnButton,
  onClickButton,
  disableByStatus
}) => {
  const classes = useStyles()
  const { t } = useTranslation('common')

  const handleSelectAllClick = event => {
    if (!event.target.checked) {
      onSelectItem(tableName, [])

      return
    }

    const ids = disableByStatus
      ? rows
          .filter(item => item.statusId === disableByStatus)
          .map(n => n[idName])
      : rows.map(n => n[idName])

    if (tableName === 'new') {
      const accounts = rows
        .filter(row => ids.indexOf(row.id) !== -1)
        .map(item => item.account)

      onSelectItem(tableName, ids, accounts)

      return
    }

    onSelectItem(tableName, ids)
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

    if (tableName === 'new') {
      const accounts = rows
        .filter(row => newSelected.indexOf(row.id) !== -1)
        .map(item => item.account)

      onSelectItem(tableName, newSelected, accounts)

      return
    }

    onSelectItem(tableName, newSelected)
  }

  const isSelected = name => selected.indexOf(name) !== -1

  return (
    <Box className={classes.root}>
      <Box className={classes.boxTable}>
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
              showColumnButton={showColumnButton}
              disabled={
                disableByStatus
                  ? !(rows || []).some(row => row.statusId === disableByStatus)
                  : false
              }
            />
            <TableBody>
              {(rows || []).map((row, index) => {
                const isItemSelected = isSelected(row[idName])
                const labelId = `table-checkbox-${index}`

                return (
                  <TableRow
                    hover
                    aria-checked={isItemSelected}
                    key={labelId}
                    selected={isItemSelected}
                  >
                    {showColumnCheck && (
                      <TableCell padding="none" style={{ padding: '0' }}>
                        <Checkbox
                          disabled={
                            disableByStatus
                              ? disableByStatus !== row.statusId
                              : false
                          }
                          color="primary"
                          checked={isItemSelected}
                          onClick={event => handleClick(event, row[idName])}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                    )}

                    {(headCells || []).map((col, index) => {
                      if (index === 0) {
                        return (
                          <TableCell
                            key={`${labelId}-${index}`}
                            id={labelId}
                            className={classes.mainColorRow}
                          >
                            <Typography className={classes.linkLabel}>
                              {col.rowLink ? (
                                <Link
                                  href={`${mainConfig.blockExplorer}/account/${
                                    row[col.id]
                                  }`}
                                  underline="always"
                                  target="_blank"
                                >
                                  {row[col.id]}
                                </Link>
                              ) : (
                                row[col.id]
                              )}
                            </Typography>
                          </TableCell>
                        )
                      }

                      if (col.id === 'tx') {
                        return (
                          <TableCell
                            key={`${labelId}-${index}`}
                            align={col.align}
                            className={clsx({
                              [classes.mainColorRow]: col.useMainColor
                            })}
                          >
                            <Link
                              href={`${mainConfig.blockExplorer}/transaction/${row.link}`}
                              underline="always"
                              target="_blank"
                            >
                              {row[col.id]}
                            </Link>
                          </TableCell>
                        )
                      }

                      return (
                        <TableCell
                          key={`${labelId}-${index}`}
                          align={col.align}
                          className={clsx({
                            [classes.mainColorRow]: col.useMainColor
                          })}
                        >
                          {row[col.id]}
                        </TableCell>
                      )
                    })}

                    {showColumnButton && (
                      <TableCell
                        padding="none"
                        align="right"
                        className={classes.arrowBodyColumn}
                      >
                        <IconButton
                          color="primary"
                          aria-label="history"
                          component="span"
                          onClick={() => onClickButton(row)}
                        >
                          <ArrowForwardIcon className={classes.historyIcon} />
                        </IconButton>
                      </TableCell>
                    )}
                  </TableRow>
                )
              })}
              {!rows.length && (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    {t('empty')}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Box
          style={{
            marginTop: 16,
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          {!!onReload && (
            <Button
              variant="outlined"
              color="primary"
              onClick={onReload}
              className={classes.loadMore}
            >
              {t('reload')}
            </Button>
          )}
          {useLoadMore && (
            <Button
              disabled={!loadMoreDisable}
              variant="outlined"
              color="primary"
              onClick={handleOnLoadMore}
              className={classes.loadMore}
            >
              {t('loadMore')}
            </Button>
          )}
        </Box>

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
  onReload: PropTypes.func,
  pagination: PropTypes.object,
  handleOnPageChange: PropTypes.func,
  handleOnRowsPerPageChange: PropTypes.func,
  onClickButton: PropTypes.func,
  idName: PropTypes.string,
  onSelectItem: PropTypes.func,
  tableName: PropTypes.string,
  selected: PropTypes.array,
  showColumnButton: PropTypes.bool,
  disableByStatus: PropTypes.string
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
  onClickButton: () => {},
  onSelectItem: () => {},
  pagination: {
    count: 0,
    rowsPerPage: 5,
    rowsPerPageOptions: [5, 10, 25],
    page: 1
  },
  tableName: '',
  selected: [],
  showColumnButton: false,
  disableByStatus: ''
}

export default TablePages
