import React from 'react'
import {connect} from 'react-redux'
import {Grid, Header, Button, Dropdown} from 'semantic-ui-react'
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
      <Grid columns={7} celled textAlign="center" verticalAlign="middle">
        <Grid.Row>
          <Grid.Column>
            <Header>Date</Header>
          </Grid.Column>
          <Grid.Column>
            <Header>Customer</Header>
          </Grid.Column>
          <Grid.Column>
            <Header>Total</Header>
          </Grid.Column>
          <Grid.Column>
            <Header>Status</Header>
          </Grid.Column>
          <Grid.Column>
            <Header>Details</Header>
          </Grid.Column>
        </Grid.Row>

        {orders.map(order => {
          return (
            <Grid.Row key={order.id}>
              <Grid.Column>{order.orderDate}</Grid.Column>
              <Grid.Column>Customer</Grid.Column>
              <Grid.Column>${order.total}</Grid.Column>
              <Grid.Column>
                <Dropdown
                  placeholder="status"
                  fluid
                  selection
                  options={options}
                />
              </Grid.Column>
              <Grid.Column>
                <Button>View</Button>
              </Grid.Column>
            </Grid.Row>
          )
        })}
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
