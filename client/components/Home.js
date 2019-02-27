import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Header} from 'semantic-ui-react'

/**
 * COMPONENT
 */
export const Home = props => {
  const {user} = props

  return (
    <div>
      <Header>Welcome!</Header>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user.user
  }
}

export default connect(mapState)(Home)

/**
 * PROP TYPES
 */
Home.propTypes = {
  email: PropTypes.string
}
