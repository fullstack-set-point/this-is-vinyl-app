import React, {Component} from 'react'
import {
  Table,
  Container,
  Header,
  Divider,
  Select,
  Button
} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
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

  async handleRemove(event) {
    const userId = this.props.match.params.userId
    const cartItemId = event.target.value
    await this.props.deleteCartItemThunk(userId, cartItemId)
    this.props.fetchCartItems(this.props.match.params.userId)
  }

  render() {
    const {history} = this.props
    let cartTotal = 0
    const options = [
      {key: 1, text: '1', value: 1},
      {key: 2, text: '2', value: 2},
      {key: 3, text: '3', value: 3},
      {key: 4, text: '4', value: 4},
      {key: 5, text: '5', value: 5},
      {key: 6, text: '6', value: 6},
      {key: 7, text: '7', value: 7},
      {key: 8, text: '8', value: 8},
      {key: 9, text: '9', value: 9},
      {key: 10, text: '10', value: 10}
    ]
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
              <Table.HeaderCell />
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.props.cartItems.length !== 0 &&
            this.props.cartItems[0].product ? (
              this.props.cartItems.map(cartItem => {
                cartTotal += cartItem.quantity * cartItem.product.price
                return (
                  <Table.Row key={cartItem.id}>
                    <Table.Cell
                      onClick={() =>
                        history.push(`/albums/${cartItem.productId}`)
                      }
                    >
                      {cartItem.product.title}
                    </Table.Cell>

                    <Table.Cell>{cartItem.product.description}</Table.Cell>
                    <Table.Cell>{cartItem.quantity}</Table.Cell>
                    <Table.Cell>
                      ${cartItem.product.price.toFixed(2)} x {cartItem.quantity}
                    </Table.Cell>
                    <Table.Cell>
                      <button
                        type="button"
                        className="btn-danger"
                        onClick={this.handleRemove}
                        value={cartItem.id}
                      >
                        Remove
                      </button>
                    </Table.Cell>
                  </Table.Row>
                )
              })
            ) : (
              <Table.Row />
            )}
          </Table.Body>
        </Table>
        <Header as="h3">Subtotal: ${cartTotal.toFixed(2)}</Header>
        <Button>
          <NavLink
            to={`/users/${this.props.match.params.userId}/cart/checkout`}
          >
            Checkout
          </NavLink>
        </Button>
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
    deleteCartItemThunk: (userId, cartItemId) =>
      dispatch(deleteCartItemThunk(userId, cartItemId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewCart)
