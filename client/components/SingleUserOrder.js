import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchOrderThunk} from '../store/user'

class SingleUserOrder extends Component {
  componentDidMount() {
    const userId = this.props.match.params.userId
    const orderId = this.props.match.params.orderId
    this.props.fetchOrderThunk(userId, orderId)
  }
  render() {
    return <div>Single Order Details</div>
  }
}

const mapStateToProps = state => {
  return {
    order: state.user.order
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchOrderThunk: (userId, orderId) =>
      dispatch(fetchOrderThunk(userId, orderId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleUserOrder)
