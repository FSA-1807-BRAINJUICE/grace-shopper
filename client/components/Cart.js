import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getCartThunk } from '../store/cart'
import CartItem from './CartItem'

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


class Cart extends Component {
  componentDidMount() {
    this.props.getCart();
  }
  render() {
    const cartItems = this.props.cartItems;
    const parsedCartItems = Array.from(cartItems)
    console.log('.product', parsedCartItems)
    cartItems.sort((a,b) => {
      return a.name > b.name
    })
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
              parsedCartItems.map(cartItem => {
                return <CartItem cartItem={cartItem} key={cartItem.id} />
              })
            }
          </TableBody>
        </Table>
      </Paper>
    )
  }
}

Cart.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    cartItems: state.cart.cartItems
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCart: () => dispatch(getCartThunk())
  }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Cart))
