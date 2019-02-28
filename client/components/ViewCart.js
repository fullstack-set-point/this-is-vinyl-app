import React, {Component} from 'react'
import {Table, Container, Header, Divider} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {deleteCartItemThunk, fetchCartItemsThunk} from '../store/user'

class ViewCart extends Component {
  constructor(props) {
    super(props)
    this.handleRemove = this.handleRemove.bind(this)
    // this.handleQuantityChange = this.handleQuantityChange.bind(this)
  }

  componentDidMount() {
    this.props.fetchCartItems(this.props.match.params.userId) // this is returning user.cartItems as an array with productId and qty
  }

  // handleQuantityChange() {
  //   this.props.changeQty()
  // }

  handleRemove() {
    this.props.removeCartItem()
  }

  render() {
    let cartTotal = 0
    return (
      <Container>
        <Header as="h2">Your Cart</Header>
        <Divider />
        <Table striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Album</Table.HeaderCell>
              <Table.HeaderCell>Artist</Table.HeaderCell>
              <Table.HeaderCell>Quantity</Table.HeaderCell>
              <Table.HeaderCell>Price</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.props.cartItems && this.props.cartItems.length ? (
              this.props.cartItems.map(cartItem => {
                cartTotal += cartItem.quantity * cartItem.product.price
                return (
                  <Table.Row key={cartItem.id}>
                    <Table.Cell>{cartItem.product.album}</Table.Cell>
                    <Table.Cell>{cartItem.product.artist}</Table.Cell>
                    <Table.Cell>{cartItem.quantity}</Table.Cell>
                    <Table.Cell>
                      ${cartItem.product.price} x {cartItem.quantity}
                    </Table.Cell>
                  </Table.Row>
                )
              })
            ) : (
              <Table.Row>Loading</Table.Row>
            )}
          </Table.Body>
        </Table>
        <Header as="h3">Subtotal: ${cartTotal}</Header>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    cartItems: state.user.cartItems
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCartItems: userId => dispatch(fetchCartItemsThunk(userId)),
    // changeQty: () => dispatch(changeQty())
    deleteCartItem: (userId, cartItemId) =>
      dispatch(deleteCartItemThunk(userId, cartItemId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewCart)
