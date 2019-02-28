import React from 'react'
import {connect} from 'react-redux'
import {Table, Button, Dropdown, Menu, Icon} from 'semantic-ui-react'
import {fetchOrders} from '../store/order'

const options = [
  {text: 'Created', value: 'created'},
  {text: 'Processing', value: 'processing'},
  {text: 'Cancelled', value: 'cancelled'},
  {text: 'Completed', value: 'completed'}
]

class AdminOrders extends React.Component {
  componentDidMount() {
    this.props.fetchOrders()
  }

  render() {
    const {orders} = this.props

    return (
      <Table celled textAlign="center" verticalAlign="middle">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Date</Table.HeaderCell>
            <Table.HeaderCell>Customer</Table.HeaderCell>
            <Table.HeaderCell>Total</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>View</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {orders.map(order => {
            return (
              <Table.Row key={order.id}>
                <Table.Cell>{order.orderDate}</Table.Cell>
                <Table.Cell>Name</Table.Cell>
                <Table.Cell>${order.total}</Table.Cell>
                <Table.Cell>
                  <Dropdown
                    placeholder="status"
                    fluid
                    selection
                    options={options}
                  />
                </Table.Cell>
                <Table.Cell>
                  <Button color="blue">View</Button>
                </Table.Cell>
              </Table.Row>
            )
          })}
        </Table.Body>

        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan="5">
              <Menu floated="right" pagination>
                <Menu.Item as="a" icon>
                  <Icon name="chevron left" />
                </Menu.Item>
                <Menu.Item as="a">1</Menu.Item>
                <Menu.Item as="a">2</Menu.Item>
                <Menu.Item as="a">3</Menu.Item>
                <Menu.Item as="a">4</Menu.Item>
                <Menu.Item as="a" icon>
                  <Icon name="chevron right" />
                </Menu.Item>
              </Menu>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
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
