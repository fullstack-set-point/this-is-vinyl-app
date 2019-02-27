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
    this.props.fetchCartItems(this.props.match.params.userId)
    console.log('PROPS!!!!', this.props)
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
          <Table.Row>
            <Table.Cell>dummy artist</Table.Cell>
            <Table.Cell>dummy album title</Table.Cell>
            <Table.Cell>dummy qty</Table.Cell>
            <Table.Cell>dummy price</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>dummy artist</Table.Cell>
            <Table.Cell>dummy album title</Table.Cell>
            <Table.Cell>dummy qty</Table.Cell>
            <Table.Cell>dummy price</Table.Cell>
          </Table.Row>
          {/* {this.props.cartItems.map(cartItem => (
            <Table.Row>
              <Table.Cell>artist</Table.Cell>
              <Table.Cell>album title</Table.Cell>
              <Table.Cell>qty</Table.Cell>
              <Table.Cell>price</Table.Cell>
            </Table.Row>
          ))} */}
        </Table.Body>
      </Table>
    )
  }
}

const mapStateToProps = state => {
  return {cartItems: state.cartItems}
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCartItems: userId => dispatch(fetchCartItemsThunk(userId)),
    // changeQty: () => dispatch(changeQty()),
    deleteCartItem: (userId, cartItemId) =>
      dispatch(deleteCartItemThunk(userId, cartItemId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewCart)
