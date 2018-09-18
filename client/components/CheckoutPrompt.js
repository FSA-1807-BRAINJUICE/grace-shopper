import React from 'react'
import {Login} from '../components/auth-form'
import {Link} from 'react-router-dom'
import {Button} from '@material-ui/core'
import {connect} from 'react-redux'

const CheckoutPrompt = ({user}) => {
  return (
    <div id="checkout-prompt">
      {!user.id && <Login />}
      <Button
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

export default connect(mapState)(CheckoutPrompt)
