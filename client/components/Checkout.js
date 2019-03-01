import React from 'react'
import {connect} from 'react-redux'
import {Elements, StripeProvider} from 'react-stripe-elements'
import CheckoutForm from './CheckoutForm'
import {Container, Divider, Header} from 'semantic-ui-react'
import {fetchCartItemsThunk} from '../store/user'
import {createOrderThunk} from '../store/order'

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
              createOrderThunk={props.createOrderThunk}
              userId={props.userId}
            />
          </Elements>
        </div>
      </StripeProvider>
    </Container>
  )
}

const mapStateToProps = state => {
  return {
    cartItems: state.user.cartItems,
    userId: state.user.user.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCartItemsThunk: userId => dispatch(fetchCartItemsThunk(userId)),
    createOrderThunk: body => dispatch(createOrderThunk(body))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
