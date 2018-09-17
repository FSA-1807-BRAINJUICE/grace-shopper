import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout, me} from '../store'
import UserHome from './user-home'
import { SSL_OP_NO_SESSION_RESUMPTION_ON_RENEGOTIATION } from 'constants';
import CartIcon from './CartIcon'

class Navbar extends Component {

  componentDidMount(){
    this.props.getMe()
  }

  render(){
    const {isLoggedIn} = this.props;
    console.log(isLoggedIn)
    return(
      <div>
        <Link to="/products">
          <h1>BRAINJUICE</h1>
        </Link>
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
          <CartIcon />

        </nav>
        <hr />
      </div>
    )
  }
}


/**
 * CONTAINER
 */
const mapState = state => {
  console.log("USER", state.user.user)
  return {
    isLoggedIn: Boolean(state.user.user && state.user.user.id)
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    },
    getMe() {
      dispatch(me())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar);

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
