import React from 'react'
import {Login} from '../components/auth-form'
import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core';
// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';

const CheckoutPrompt = () => {
  return(
    <div id = 'checkout-prompt'>
      <Login />
      <Button
        component={Link}
        to="/checkout-form"
        variant = 'contained'
        color='primary'
        size='small'
      >
        Checkout as Guest
      </Button>
    </div>
  )
}

export default CheckoutPrompt
