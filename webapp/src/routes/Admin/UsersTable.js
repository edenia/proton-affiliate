import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableFooter from '@material-ui/core/TableFooter'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'

import { affiliateUtil } from '../../utils'

import styles from './styles'

const useStyles = makeStyles(styles)

const UsersTable = ({ t }) => {
  const classes = useStyles()
  const [rows, setRows] = useState([])
  const [pagination, setPagination] = useState({})

  const handleOnLoadMore = async () => {
    const users = await affiliateUtil.getUsers(pagination.cursor)
    setRows(prev => [...prev, ...users.rows])
    setPagination({
      hasMore: users.hasMore,
      cursor: users.cursor
    })
  }

  useEffect(() => {
    handleOnLoadMore()
  }, [])

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{t('user')}</TableCell>
            <TableCell>{t('role')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!!rows.length &&
            rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.user}</TableCell>
                <TableCell>{row.role}</TableCell>
              </TableRow>
            ))}

          {!rows.length && (
            <TableRow>
              <TableCell colSpan={2}>{t('empty')}</TableCell>
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell className={classes.centerCell} colSpan={2}>
              <Button disabled={!pagination.hasMore} onClick={handleOnLoadMore}>
                {t('loadMore')}
              </Button>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  )
}

UsersTable.propTypes = {
  t: PropTypes.func
}

export default UsersTable
