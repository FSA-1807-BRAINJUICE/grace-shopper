import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {me} from '../store/user'

/**
 * COMPONENT
 */

class UserHome extends Component {
  componentDidMount(){
    this.props.getMe()
  }
  render(){
    const {email} = this.props
    return (
      <div>
        <h3>Welcome, {email}</h3>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  console.log(state.user)
  return {
    email: state.user.user.email
  }
}

const mapDispatch = dispatch => {
  return {
    getMe: () => dispatch(me())
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
