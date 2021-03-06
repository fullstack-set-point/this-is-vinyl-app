import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, Signup} from './components'
import {me} from './store'
import AllAlbums from './components/AllAlbums'
import SingleAlbum from './components/SingleAlbum'
import Admin from './components/Admin'
import SingleUser from './components/SingleUser'
import ViewCart from './components/ViewCart'
import SingleUserOrders from './components/SingleUserOrders'
import SingleUserOrder from './components/SingleUserOrder'
import Checkout from './components/Checkout'
import ReviewForm from './components/ReviewForm'
import UpdateAlbumForm from './components/UpdateAlbumForm'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isAdmin} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/albums" component={AllAlbums} />
        <Route exact path="/albums/:albumId" component={SingleAlbum} />
        <Route exact path="/albums/:albumId/review" component={ReviewForm} />
        <Route exact path="/users/:userId" component={SingleUser} />
        <Route exact path="/users/:userId/cart" component={ViewCart} />
        <Route
          exact
          path="/users/:userId/orders"
          component={SingleUserOrders}
        />
        <Route
          exact
          path="/users/:userId/orders/:orderId"
          component={SingleUserOrder}
        />
        <Route
          exact
          path="/albums/categories/:categoryId"
          component={AllAlbums}
        />
        <Route exact path="/users/:userId/cart/checkout" component={Checkout} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        {isAdmin && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route exact path="/admin" component={Admin} />
            <Route
              exact
              path="/albums/:albumId/update"
              component={UpdateAlbumForm}
            />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Redirect from="/" to="/albums" />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.user.isAuth,
    isAdmin: state.user.user.isAdmin
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData: () => dispatch(me())
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
