import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout, me} from '../store'
import UserHome from './user-home'
import CartIcon from './CartIcon'

class Navbar extends Component {
  componentDidMount() {
    this.props.getMe()
  }

  render() {
    const {isLoggedIn} = this.props
    return (
      <div>
        <Link to="/products" className="logo-link">
          <div className="logo-style">
          <span className="logo-title">BRAINJUICE</span>
          <div className="logo-image">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14.02 16"><title>icon_health-mental-health</title><path d="M13.18,12.14a5.39,5.39,0,0,0-2.55-1.58.64.64,0,0,0-.47,0l-1.1.62c-.12.07-.12.15-.12.19s0,.12.16.15A5.9,5.9,0,0,1,12,13a4.28,4.28,0,0,1,.56,2.73.29.29,0,0,0,.07.23.29.29,0,0,0,.21.09h.77a.34.34,0,0,0,.33-.3A5.15,5.15,0,0,0,13.18,12.14Z"></path><path d="M10.86,8.26c0-.15.11-.37.17-.53a.29.29,0,0,1,.22-.14c1-.06,1.52-.44,1.64-1.14A3.28,3.28,0,0,0,12,4.19c-.1-.14-.21-.3-.29-.43a3.08,3.08,0,0,1-.27-.66A3.65,3.65,0,0,0,11,2,4.83,4.83,0,0,0,6.89,0h0A5.6,5.6,0,0,0,2.54,2.25,5.49,5.49,0,0,0,1.51,5a5.6,5.6,0,0,0,0,.64.11.11,0,0,1,0,.08.09.09,0,0,1-.08,0c-.3,0-.81,0-1.05,0a.29.29,0,0,0-.23.07A.28.28,0,0,0,0,6v.77a.34.34,0,0,0,.3.33c.36,0,1,.06,1.41.06l0,.14a6.13,6.13,0,0,0,1.29,2,5.67,5.67,0,0,0,1.33,1A6.52,6.52,0,0,0,.84,12.15,5.3,5.3,0,0,0,0,15.7a.34.34,0,0,0,.33.3h.77a.29.29,0,0,0,.21-.09.29.29,0,0,0,.07-.23A4.28,4.28,0,0,1,2,13c.61-.86,2.6-1.35,3.91-1.68l.5-.13c.33-.08.63-.15.93-.21a5.15,5.15,0,0,0,2.87-1.29A3,3,0,0,0,10.86,8.26ZM3.27,7a21,21,0,0,0,4-.7,3,3,0,0,0,2-1.75A1.82,1.82,0,0,0,9,2.92,2.42,2.42,0,0,0,7.09,2H7a3.39,3.39,0,0,0-1.87.58L5,2.62A2.37,2.37,0,0,0,3.81,4.54a.27.27,0,0,0,.09.22.28.28,0,0,0,.23.07l.78-.1a.38.38,0,0,0,.31-.32c0-.29.23-.42.53-.62L6,3.59a1.48,1.48,0,0,1,1.88.16A.43.43,0,0,1,8,4.17,1.69,1.69,0,0,1,6.87,5,20.47,20.47,0,0,1,3,5.66a.11.11,0,0,1-.08,0,.1.1,0,0,1,0-.08,4.14,4.14,0,0,1,.78-2.49A4.18,4.18,0,0,1,6.88,1.4a3.47,3.47,0,0,1,3,1.42,2.46,2.46,0,0,1,.31.72,4.23,4.23,0,0,0,.4.95c.1.16.21.32.33.5a5,5,0,0,1,.6,1,.11.11,0,0,1,0,.09.13.13,0,0,1-.08.06,2.6,2.6,0,0,1-.43,0c-1,0-1.24,1-1.45,1.67a3,3,0,0,1-.29.76A3.87,3.87,0,0,1,7,9.57h-.2l-.1,0A5.14,5.14,0,0,1,4,8.24a5.28,5.28,0,0,1-.79-1.12.05.05,0,0,1,0,0Z"></path></svg>
          </div>
          </div>
        </Link>
        <nav className="nav-items">
          {isLoggedIn ?
            (
              <UserHome/>
            ) :
            (
              // <div>
              //   {/* The navbar will show these links after you log in */}
              //   <h1>HIHIHIHHIHI</h1>
              //   {/* <Route path="/home" component={UserHome} /> */}
              //   {/* <Link to="/home">Home</Link>
              //   <a href="#" onClick={handleClick}>
              //     Logout
              //   </a> */}
              // </div>
              <div className="nav-items">
                {/* The navbar will show these links before you log in */}
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign Up</Link>
              </div>
              )
          }

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
  console.log('USER', state.user.user)
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

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
