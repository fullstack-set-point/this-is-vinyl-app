import React, {Component} from 'react'
import {Table} from 'semantic-ui-react'
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
    return (
      <Table striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Artist Name</Table.HeaderCell>
            <Table.HeaderCell>Album Title Joined</Table.HeaderCell>
            <Table.HeaderCell>Quantity</Table.HeaderCell>
            <Table.HeaderCell>Price</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {this.props.user.cartItems[0].product &&
          this.props.user.cartItems.length ? (
            this.props.user.cartItems.map(cartItem => (
              <Table.Row key={cartItem.id}>
                <Table.Cell>{cartItem.product.artist}</Table.Cell>
                <Table.Cell>{cartItem.product.album}</Table.Cell>
                <Table.Cell>{cartItem.product.price}</Table.Cell>
                <Table.Cell>{cartItem.quantity}</Table.Cell>
              </Table.Row>
            ))
          ) : (
            <Table.Row>Loading</Table.Row>
          )}
        </Table.Body>
      </Table>
    )
  }
}

const mapStateToProps = state => {
  return state
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
