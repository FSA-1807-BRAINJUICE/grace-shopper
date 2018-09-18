import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getOrdersThunk} from '../store/orders'
import SingleOrder from './SingleOrder'

import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto'
  },
  table: {
    minWidth: 700
  }
})

class Orders extends Component {
  componentDidMount() {
    this.props.getOrders(); //all orders
  }

  render() {
    const orderList = this.props.orderList
    const {classes} = this.props
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Order Number</TableCell>
              <TableCell>Order Date</TableCell>
              <TableCell>Order Total Price</TableCell>
              <TableCell>Order Items</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderList.map(order => {
              return <SingleOrder order={order} key={order.id} />
            })}
          </TableBody>
        </Table>
      </Paper>
    )
  }
}

Orders.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return {
    orderList: state.orders.orderList
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getOrders: () => dispatch(getOrdersThunk())
  }
}

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(Orders)
)
