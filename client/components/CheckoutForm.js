import React, {Component, Fragment} from 'react'
import TextField from '@material-ui/core/TextField'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import {connect} from 'react-redux'
import {Button} from '@material-ui/core'
import {updateOrdersDone} from '../store/orders'
import {clearCart} from '../store/cart'

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 400
  },
  menu: {
    width: 200
  }
})

class CheckoutForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      addressInfo: {
        name: '',
        streetAddress: '',
        city: '',
        region: '',
        postal: '',
        phone: '',
        email: ''
      }
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange = nameAttr => event => {
    this.setState({
      addressInfo: {
        [nameAttr]: event.target.value
      }
    })
  }
  handleSubmit(evt) {
    evt.preventDefault()

    const {addressInfo} = this.state
    this.props.checkOut(addressInfo)
  }

  renderComplete() {
    const {orderNumber, email} = this.props.completedOrder
    return (
      <Fragment>
        <h1 className="success">Thank you, your order has been placed.</h1>
        <p>An email confirmation has been sent to you at {email}</p>
        <p>
          <strong>Order number: {orderNumber}</strong>
        </p>
      </Fragment>
    )
  }
  render() {
    const {classes, completedOrder} = this.props
    const {id} = completedOrder

    return completedOrder && id ? (
      this.renderComplete()
    ) : (
      <form
        onSubmit={this.handleSubmit}
        className={classes.container}
        noValidate
        autoComplete="off"
      >
        <TextField
          required={true}
          id="full-name"
          label="Full name:"
          className={classes.textField}
          value={this.state.addressInfo.name}
          onChange={this.handleChange('name')}
          margin="normal"
        />
        <TextField
          required={true}
          id="street-address"
          label="Street address:"
          className={classes.textField}
          value={this.state.addressInfo.streetAddress}
          onChange={this.handleChange('streetAddress')}
          margin="normal"
        />
        <TextField
          required={true}
          id="city"
          label="City:"
          className={classes.textField}
          value={this.state.addressInfo.city}
          onChange={this.handleChange('city')}
          margin="normal"
        />
        <TextField
          required={true}
          id="region"
          label="State/Province/Region:"
          className={classes.textField}
          value={this.state.addressInfo.region}
          onChange={this.handleChange('region')}
          margin="normal"
        />
        <TextField
          required={true}
          id="postal-code"
          label="ZIP/Postal Code:"
          className={classes.textField}
          value={this.state.addressInfo.postal}
          onChange={this.handleChange('postal')}
          margin="normal"
        />
        <TextField
          required={true}
          id="phone-number"
          label="Phone number:"
          className={classes.textField}
          value={this.state.addressInfo.phone}
          onChange={this.handleChange('phone')}
          margin="normal"
        />
        <TextField
          required={true}
          type="email"
          id="email"
          label="Email:"
          className={classes.textField}
          value={this.state.addressInfo.email}
          onChange={this.handleChange('email')}
          margin="normal"
        />
        <Button variant="contained" size="small" color="primary" type="submit">
          Continue
        </Button>
      </form>
    )
  }
}

CheckoutForm.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapState = state => ({
  completedOrder: state.orders.completedOrder,
  user: state.user.user
})

const mapDispatch = dispatch => ({
  async checkOut(addressInfo) {
    await dispatch(updateOrdersDone(addressInfo))
    dispatch(clearCart())
  }
})

export default withStyles(styles)(connect(mapState, mapDispatch)(CheckoutForm))
