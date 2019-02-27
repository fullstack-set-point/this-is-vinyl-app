import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, Signup, Home} from './components'
import {me, fetchAlbums} from './store'
import AllAlbums from './components/AllAlbums'
import SingleAlbum from './components/SingleAlbum'
import AllUsers from './components/AllUsers'
import SingleUser from './components/SingleUser'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/albums" component={AllAlbums} />
        <Route exact path="/albums/:albumId" component={SingleAlbum} />
        <Route exact path="/users/:userId" component={SingleUser} />
        <Route
          exact
          path="/albums/categories/:categoryId"
          component={AllAlbums}
        />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route exact path="/users" component={AllUsers} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route path="/" component={Home} />
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
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData: () => dispatch(me()),
    fetchAlbums: () => dispatch(fetchAlbums())
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
