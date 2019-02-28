import React, {Component} from 'react'
import {Table, TableHeaderCell} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchOrdersThunk} from '../store/user'

class SingleUserOrders extends Component {
  componentDidMount() {
    this.props.fetchOrdersThunk(this.props.match.params.userId)
  }

  render() {
    return (
      <Table singleLine padded>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell singleLine>Order Date</Table.HeaderCell>
            <Table.HeaderCell singleLine>Order Status</Table.HeaderCell>
            <Table.HeaderCell singleLine>Order Number</Table.HeaderCell>
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
                  <Link to={`/users/${this.props.user.id}/orders/${order.id}`}>
                    View Details
                  </Link>
                </Table.Cell>
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
    orders: state.user.orders,
    user: state.user.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchOrdersThunk: userId => dispatch(fetchOrdersThunk(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleUserOrders)
