import React, {Component} from 'react'
import {Table, TableHeaderCell} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {fetchOrdersThunk} from '../store/user'

class SingleUserOrders extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchOrdersThunk(this.props.match.params.userId)
  }

  render() {
    console.log(this.props)
    return (
      <Table celled padded>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell singleLine>Order Date</Table.HeaderCell>
            <Table.HeaderCell singleLine>Order Status</Table.HeaderCell>
            <Table.HeaderCell singleLine>Order Number</Table.HeaderCell>
            <Table.HeaderCell>Items Ordered</Table.HeaderCell>
            <TableHeaderCell />
          </Table.Row>
        </Table.Header>
        {this.props.orders && this.props.orders.length ? (
          <Table.Body>
            {this.props.orders.map(order => (
              <Table.Row key={order.id}>
                <Table.Cell singleLine>{order.orderDate}</Table.Cell>
                <Table.Cell singleLine>{order.orderStatus}</Table.Cell>
                <Table.Cell singleLine>{order.id}</Table.Cell>
                <Table.Cell singleLine>
                  {order.order_items.map(item => (
                    <div key={item.id}>Item {item.id}</div>
                  ))}
                </Table.Cell>
                <Table.Cell singleLine>View Details</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        ) : null}
      </Table>
    )
  }
}

const mapStateToProps = state => {
  return {
    orders: state.user.orders
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchOrdersThunk: userId => dispatch(fetchOrdersThunk(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleUserOrders)
