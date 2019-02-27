import React from 'react'
import {connect} from 'react-redux'
import {fetchUsersThunk} from '../store/user'
import {Header} from 'semantic-ui-react'

class AllUsers extends React.Component {
  componentDidMount() {
    this.props.fetchUsers()
  }

  render() {
    const {users} = this.props

    return (
      <div>
        <ul>
          {users.map(user => {
            return <li key={user.id}>{user.email}</li>
          })}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  users: state.user.users
})

const mapDispatchToProps = dispatch => ({
  fetchUsers: () => dispatch(fetchUsersThunk())
})

export default connect(mapStateToProps, mapDispatchToProps)(AllUsers)
