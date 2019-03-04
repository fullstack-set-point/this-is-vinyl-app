import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchOrderThunk} from '../store/user'
import {Container, Header, Divider, Table, Button} from 'semantic-ui-react'

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
    const {order} = this.props
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
                {order.user ? (
                  <div>
                    <p>{`${order.user.firstName} ${order.user.lastName}`}</p>
                    <p>{order.user.address}</p>
                    <p>
                      {order.user.city}, {order.user.state} {order.user.zip}
                    </p>
                  </div>
                ) : null}
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
              <Table.HeaderCell />
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {order.order_items && order.order_items.length
              ? order.order_items.map(item => {
                  return (
                    <Table.Row key={item.id}>
                      <Table.Cell singleLine>{item.productName}</Table.Cell>
                      <Table.Cell singleLine>
                        ${item.price.toFixed(2)}
                      </Table.Cell>
                      <Table.Cell singleLine>{item.quantity}</Table.Cell>
                      <Table.Cell>
                        <Link to={`/albums/${item.productId}/review`}>
                          <Button
                            content="Add a Review"
                            icon="comment alternate outline"
                            labelPosition="right"
                          />
                        </Link>
                      </Table.Cell>
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
            {order.total ? (
              <Table.Row>
                <Table.Cell singleLine>${order.total.toFixed(2)}</Table.Cell>
                <Table.Cell singleLine>$0.00</Table.Cell>
                <Table.Cell singleLine>$0.00</Table.Cell>
                <Table.Cell>
                  <Header as="h5">${order.total.toFixed(2)}</Header>
                </Table.Cell>
              </Table.Row>
            ) : null}
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
