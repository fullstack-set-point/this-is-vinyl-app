import React from 'react'
import {connect} from 'react-redux'
import {fetchUserThunk} from '../store/user'
import {Header} from 'semantic-ui-react'

class SingleUser extends React.Component {
  componentDidMount() {
    this.props.fetchUser()
  }

  render() {
    const {user} = this.props

    return (
      <div>
        <Header>{user.email}</Header>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user.user
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchUser: () => dispatch(fetchUserThunk(ownProps.match.params.userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleUser)
