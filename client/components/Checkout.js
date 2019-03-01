import React from 'react'
import {connect} from 'react-redux'
import {Elements, StripeProvider} from 'react-stripe-elements'
import CheckoutForm from './CheckoutForm'
import {Container, Divider, Header} from 'semantic-ui-react'
import {fetchCartItemsThunk} from '../store/user'

const Checkout = props => {
  return (
    <Container>
      <Header as="h2">Checkout</Header>
      <Divider />
      <StripeProvider apiKey="pk_test_OYbN8itNUXzHAy5ph9cI12ZG">
        <div className="example">
          <Elements>
            <CheckoutForm
              cartItems={props.cartItems}
              fetchCartItemsThunk={props.fetchCartItemsThunk}
            />
          </Elements>
        </div>
      </StripeProvider>
    </Container>
  )
}

const mapStateToProps = state => {
  return {
    cartItems: state.user.cartItems
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCartItemsThunk: () => dispatch(fetchCartItemsThunk())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
