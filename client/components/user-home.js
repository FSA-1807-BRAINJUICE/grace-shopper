import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {me, logout} from '../store/user'
import { Button } from '@material-ui/core';
import { Redirect, Link } from 'react-router-dom'
/**
 * COMPONENT
 */

class UserHome extends Component {
  // componentDidMount(){
  //   this.props.getMe()
  // }
  render(){
    const {id, email} = this.props.user
    if (!id){
      return <Redirect to = "/products" />
    }
    return (
      <div>
        <h3>Welcome, {email}</h3>
        <div>
        <Button
          variant = 'outlined'
          color='primary'
          size = 'small'
          onClick={this.props.handleClick}>
            Logout
        </Button>
        </div>
        <div>
        <Button
          variant = 'outlined'
          color='primary'
          size = 'small'
          component = { Link } to="/orders">
          {/* the link needs to go to the Order History Component */}
            Order History
        </Button>
        </div>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user.user
  }
}

const mapDispatch = dispatch => {
  return {
    // getMe: () => dispatch(me()),
    handleClick: () => dispatch(logout())
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
