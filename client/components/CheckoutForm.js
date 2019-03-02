import React, {Component} from 'react'
import {CardElement, injectStripe} from 'react-stripe-elements'
import {Form, Divider, Header} from 'semantic-ui-react'

class CheckoutForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      complete: false,
      name: '',
      email: '',
      address: '',
      city: '',
      state: '',
      zip: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  async componentDidMount() {
    await this.props.fetchCartItemsThunk(this.props.userId)
  }

  handleChange(event, {name, value}) {
    this.setState({
      [name]: value
    })
  }

  async handleSubmit(event) {
    const {name, email, address, city, state, zip} = this.state
    const cartItems = this.props.cartItems
    const body = {name, email, address, city, state, zip, cartItems}
    let {token} = await this.props.stripe.createToken({
      name
    })

    let response = await fetch('/charge', {
      method: 'POST',
      headers: {'Content-Type': 'text/plain'},
      body: token.id
    })

    if (response.ok) this.setState({complete: true})

    this.props.createOrderThunk(body)
  }

  render() {
    let subtotal = 0
    const {name, email, address, city, state, zip} = this.state
    if (this.state.complete)
      return (
        <div>
          <h4>Purchase Complete</h4>
          <p>An order confirmation email will be sent to {this.state.email}.</p>
        </div>
      )
    return (
      <div className="checkout">
        <Form onSubmit={this.handleSubmit}>
          <Form.Input
            placeholder="Full Name"
            name="name"
            value={name}
            onChange={this.handleChange}
          />
          <Form.Input
            placeholder="Email"
            name="email"
            value={email}
            onChange={this.handleChange}
          />
          <Form.Input
            placeholder="Address"
            name="address"
            value={address}
            onChange={this.handleChange}
          />
          <Form.Input
            placeholder="City"
            name="city"
            value={city}
            onChange={this.handleChange}
          />
          <Form.Input
            placeholder="State"
            name="state"
            value={state}
            onChange={this.handleChange}
          />
          <Form.Input
            placeholder="ZipCode"
            name="zip"
            value={zip}
            onChange={this.handleChange}
          />
          <CardElement style={{base: {fontSize: '18px'}}} />
          <Divider />
          <Header as="h3">Order Summary</Header>
          <Divider />
          {this.props.cartItems && this.props.cartItems.length
            ? this.props.cartItems.map(item => {
                subtotal += item.product.price * item.quantity
                return (
                  <p key={item.id}>
                    {item.product.album} x {item.quantity}
                  </p>
                )
              })
            : null}
          <Header as="h4">Subtotal: ${subtotal.toFixed(2)}</Header>
          <Form.Button content="Submit" />
          <Divider />
        </Form>
      </div>
    )
  }
}

export default injectStripe(CheckoutForm)
