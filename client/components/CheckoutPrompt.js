import React from 'react'
import {Login} from '../components/auth-form'
import {Link} from 'react-router-dom'
import {Button} from '@material-ui/core'
import {connect} from 'react-redux'
import {clearOrder} from '../store/orders'

const CheckoutPrompt = ({user, clearPreviousOrder}) => {
  return (
    <div id="checkout-prompt">
      {!user.id && <Login />}
      <Button
        onClick={clearPreviousOrder}
        component={Link}
        to="/checkout"
        variant="contained"
        color="primary"
        size="small"
      >
        Continue{!user.id && ' as Guest'}
      </Button>
    </div>
  )
}

const mapState = state => ({
  user: state.user.user
})

const mapDispatch = dispatch => ({
  clearPreviousOrder() {
    dispatch(clearOrder())
  }
})

export default connect(mapState, mapDispatch)(CheckoutPrompt)
