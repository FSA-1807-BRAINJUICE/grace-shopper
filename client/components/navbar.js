import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import UserHome from './user-home'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <h1>BOILERMAKER</h1>
    <nav>
      {isLoggedIn ? ( <UserHome />
        // <div>
        //   {/* The navbar will show these links after you log in */}
        //   <h1>HIHIHIHHIHI</h1>
        //   {/* <Route path="/home" component={UserHome} /> */}
        //   {/* <Link to="/home">Home</Link>
        //   <a href="#" onClick={handleClick}>
        //     Logout
        //   </a> */}
        // </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  console.log("USER", state.user.user)
  return {
    isLoggedIn: state.user.user && state.user.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
