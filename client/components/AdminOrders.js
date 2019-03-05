import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {
  Table,
  Button,
  Dropdown,
  Container,
  Header,
  Divider,
  Menu,
  Icon
} from 'semantic-ui-react'
import {fetchOrders} from '../store/order'

class AdminOrders extends React.Component {
  constructor(props) {
    super(props)
    this.formatDate = this.formatDate.bind(this)
  }

  componentDidMount() {
    this.props.fetchOrders()
  }

  formatDate(date) {
    const formattedDate = date.split('T')
    return formattedDate[0]
  }

  render() {
    const {orders} = this.props

    const options = [
      {text: 'Created', value: 'created'},
      {text: 'Processing', value: 'processing'},
      {text: 'Cancelled', value: 'cancelled'},
      {text: 'Completed', value: 'completed'}
    ]

    return (
      <Container>
        <Header as="h2">Orders</Header>
        <Divider />
        <Table singleLine>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Date</Table.HeaderCell>
              <Table.HeaderCell>Order Number</Table.HeaderCell>
              <Table.HeaderCell>Customer Name</Table.HeaderCell>
              <Table.HeaderCell>Customer ID</Table.HeaderCell>
              <Table.HeaderCell>Total</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell>View</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {orders.map(order => {
              return (
                <Table.Row key={order.id}>
                  <Table.Cell>{this.formatDate(order.orderDate)}</Table.Cell>
                  <Table.Cell>{order.id}</Table.Cell>
                  <Table.Cell>
                    {order.user.firstName} {order.user.lastName}
                  </Table.Cell>
                  <Table.Cell>{order.user.id}</Table.Cell>
                  <Table.Cell>${order.total.toFixed(2)}</Table.Cell>
                  <Table.Cell>
                    <Dropdown
                      placeholder={order.orderStatus}
                      fluid
                      selection
                      options={options}
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/users/${order.userId}/orders/${order.id}`}>
                      <Button color="blue">View</Button>
                    </Link>
                  </Table.Cell>
                </Table.Row>
              )
            })}
          </Table.Body>
        </Table>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  orders: state.order.orders
})

const mapDispatchToProps = dispatch => ({
  fetchOrders: () => dispatch(fetchOrders())
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminOrders)
