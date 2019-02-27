import React from 'react'
import {connect} from 'react-redux'
import {getUsers} from '../store/users'
import {Header, Button} from 'semantic-ui-react'

class Users extends React.Component {
  componentDidMount() {
    this.props.getUsers()
  }

  render() {
    const {users} = this.props

    if (!users || users.length === 0) {
      return (
        <main>
          <Header as="h1">No Users</Header>
        </main>
      )
    }

    return (
      <main>
        <Header as="h1">Users</Header>
        <ul>
          {users.map(user => {
            return (
              <li key={user.id}>
                <div>
                  <p>{user.email}</p>
                  <p>{user.isAdmin}</p>
                </div>
                <Button>Make Admin</Button>
                <Button>Delete User</Button>
                <Button>Reset Password</Button>
              </li>
            )
          })}
        </ul>
      </main>
    )
  }
}

const mapStateToProps = state => ({
  users: state.users
})

const mapDispatchToProps = dispatch => ({
  getUsers: () => dispatch(getUsers())
})

export default connect(mapStateToProps, mapDispatchToProps)(Users)
