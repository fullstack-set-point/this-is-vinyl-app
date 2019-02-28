import React from 'react'
import {connect} from 'react-redux'
import {Grid, Image, Header, Button, Dropdown} from 'semantic-ui-react'
import {fetchOrders} from '../store/user'

class AdminOrders extends React.Component {
  componentDidMount() {
    this.props.fetchOrders()
  }

  render() {
    const {orders} = this.props

    return (
      <Grid columns={7} celled textAlign="center" verticalAlign="middle">
        <Grid.Row>
          <Grid.Column>
            <Header>Date</Header>
          </Grid.Column>
          <Grid.Column>
            <Header>Items</Header>
          </Grid.Column>
          <Grid.Column>
            <Header>Total</Header>
          </Grid.Column>
          <Grid.Column>
            <Header>Status</Header>
          </Grid.Column>
          <Grid.Column>
            <Header>Management</Header>
          </Grid.Column>
        </Grid.Row>

        {/* {orders.map(order => {
          return (
            <Grid.Row key={order.id}>
              <Grid.Column>
                {order.orderDate}
              </Grid.Column>
              <Grid.Column>
                {order.items}
              </Grid.Column>
              <Grid.Column>
                {order.total}
              </Grid.Column>
              <Grid.Column>
                {order.orderStatus}
              </Grid.Column>
              <Grid.Column>
                <Button>Edit</Button>
              </Grid.Column>
            </Grid.Row>
          )
        })} */}
      </Grid>
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
