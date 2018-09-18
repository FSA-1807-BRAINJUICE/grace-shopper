import React, { Component } from 'react'
import { connect } from 'react-redux'
import SingleOrderItem from './SingleOrderItem'
import {getSingleOrderThunk} from '../store/orders'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';



const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});


class OrderItems extends Component {
  componentDidMount() {
    this.props.getSingleOrder(this.props.match.params.orderId); //all orders
  }
  render() {
    const singleOrder = this.props.singleOrder;
    const { classes } = this.props;
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              singleOrder.map(item => {
                return <SingleOrderItem item={item} key={item.id} />
              })
            }
          </TableBody>
        </Table>
      </Paper>
    )
  }
}

OrderItems.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    singleOrder: state.orders.singleOrder
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getSingleOrder: (id) => dispatch(getSingleOrderThunk(id))
  }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(OrderItems))


