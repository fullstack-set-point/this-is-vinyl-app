import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchOrderThunk} from '../store/user'
import {Container, Header, Divider, Grid, Table} from 'semantic-ui-react'

class SingleUserOrder extends Component {
  constructor(props) {
    super(props)
    this.formatDate = this.formatDate.bind(this)
    this.getPrices = this.getPrices.bind(this)
  }

  componentDidMount() {
    const userId = this.props.match.params.userId
    const orderId = this.props.match.params.orderId
    this.props.fetchOrderThunk(userId, orderId)
  }

  formatDate(date) {
    const formattedDate = date.split('T')
    return formattedDate[0]
  }

  getPrices(orderItems) {
    orderItems.map(item => {
      let prices = []
      prices.push(item.price)
      return prices
    })
  }

  render() {
    const {user, order} = this.props
    return (
      <Container>
        <Header as="h2">Order Details</Header>
        <Divider />
        <Table singleLine padded>
          <Table.Body>
            <Table.Row>
              <Table.Cell singleLine>
                <Header as="h4">Order Date:</Header>
              </Table.Cell>
              <Table.Cell singleLine>
                {order.orderDate && order.orderDate.length ? (
                  <p>{this.formatDate(order.orderDate)}</p>
                ) : null}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell singleLine>
                <Header as="h4">Status:</Header>
              </Table.Cell>
              <Table.Cell singleLine>
                <p>{order.orderStatus}</p>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell singleLine>
                <Header as="h4">Order Number:</Header>
              </Table.Cell>
              <Table.Cell singleLine>
                <p>{order.id}</p>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell singleLine>
                <Header as="h4">Shipping To:</Header>
              </Table.Cell>
              <Table.Cell singleLine>
                <div>
                  <p>{`${user.firstName} ${user.lastName}`}</p>
                  <p>{user.address}</p>
                  <p>
                    {user.city}, {user.state} {user.zip}
                  </p>
                </div>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
        <Header as="h2">Items</Header>
        <Divider />
        <Table singleLine padded>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell singleLine>Item</Table.HeaderCell>
              <Table.HeaderCell singleLine>Item Price</Table.HeaderCell>
              <Table.HeaderCell singleLine>Quantity</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {order.order_items && order.order_items.length
              ? order.order_items.map(item => {
                  return (
                    <Table.Row key={item.id}>
                      <Table.Cell singleLine>ITEM NAME</Table.Cell>
                      <Table.Cell singleLine>${item.price}</Table.Cell>
                      <Table.Cell singleLine>{item.quantity}</Table.Cell>
                    </Table.Row>
                  )
                })
              : null}
          </Table.Body>
        </Table>
        <Header as="h2">Order Summary:</Header>
        <Divider />
        <Table padded>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell singleLine>Subtotal</Table.HeaderCell>
              <Table.HeaderCell singleLine>Shipping</Table.HeaderCell>
              <Table.HeaderCell singleLine>Tax</Table.HeaderCell>
              <Table.HeaderCell singleLine>Total</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell singleLine>${order.total}</Table.Cell>
              <Table.Cell singleLine>$0</Table.Cell>
              <Table.Cell singleLine>$0</Table.Cell>
              <Table.Cell>
                <Header as="h5">${order.total}</Header>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    order: state.user.order,
    user: state.user.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchOrderThunk: (userId, orderId) =>
      dispatch(fetchOrderThunk(userId, orderId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleUserOrder)
