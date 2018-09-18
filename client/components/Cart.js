import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getCartThunk} from '../store/cart'
import CartItem from './CartItem'
import Button from '@material-ui/core/Button'

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
    overflowX: 'auto',
    textAlign: 'right'
  },
  table: {
    minWidth: 700
  }
})

class Cart extends Component {
  componentDidMount() {
    this.props.getCart()
  }

  render() {
    const cartItems = this.props.cartItems
    const parsedCartItems = Array.from(cartItems)
    parsedCartItems.sort((a, b) => {
      return a.product.name > b.product.name
    })

    let cartTotalPrice = parsedCartItems.reduce((a, b) => {
      return a + b.product.price * b.quantity
    }, 0)
    cartTotalPrice = cartTotalPrice.toFixed(2)

    const {classes} = this.props
    return (
      <div>
        <span style={{fontSize: '20px'}}>
          <strong>Total Price: {cartTotalPrice} USD</strong>
        </span>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Product Name</TableCell>
                <TableCell>Unit Price</TableCell>
                <TableCell>Quantity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {parsedCartItems && parsedCartItems.length > 0 ? (
                parsedCartItems.map(cartItem => {
                  return <CartItem cartItem={cartItem} key={cartItem.id} />
                })
              ) : (
                <TableRow>
                  <TableCell>
                    <p>
                      Nothing has been added to the cart. &nbsp;
                      <Link to={`/products`}>Continue Shopping!</Link>
                    </p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          <Button
            style={{textAlign: 'right'}}
            component={Link}
            to="/checkout-prompt"
            size="small"
            color="primary"
            variant="contained"
          >
            Checkout
          </Button>
        </Paper>
      </div>
    )
  }
}

Cart.propTypes = {
  classes: PropTypes.object.isRequired
}

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

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(Cart)
)
