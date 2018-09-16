import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  menu: {
    width: 200,
  },
});



/**
 * COMPONENT
 */
const AuthForm = props => {
  const {
    name,
    displayName,
    handleSubmit,
    error,
    handleClick,
    classes
  } = props

  return (
    <div>
      <form
      className = {classes.container}
      onSubmit={handleSubmit}
      name={name}
      noValidate
      autoComplete = 'off'>
        <div>
        <TextField
          id="email"
          label="Email"
          className={classes.textField}
          margin="normal" />
        </div>
        <div>
        <TextField
          id="password"
          label="Password"
          className={classes.textField}
          margin="normal"
          type='password'
          />
        </div>
        <div>
          <Button
            variant = 'outlined'
            color='primary'
            size = 'small'
            type="submit">
          {displayName}
          </Button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
      <div className = {classes.container}>
        <a href="/auth/google">
          <Button
            variant = 'outlined'
            color='primary'
            size = 'small'
            type="submit"
          >
            {displayName} with Google
          </Button>
        </a>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    // error:  // state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    // error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export const Login = withStyles(styles)(connect(mapLogin, mapDispatch)(AuthForm))
export const Signup = withStyles(styles)(connect(mapSignup, mapDispatch)(AuthForm))

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object,
  classes: PropTypes.object.isRequired
}
