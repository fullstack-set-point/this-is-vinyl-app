import React from 'react'
import {connect} from 'react-redux'
import {Grid, Image, Header, Button} from 'semantic-ui-react'
import {fetchUsersThunk} from '../store/user'

class AdminUsers extends React.Component {
  componentDidMount() {
    this.props.fetchUsers()
  }

  render() {
    const {users} = this.props

    return (
      <Grid columns={5} celled textAlign="center" verticalAlign="middle">
        <Grid.Row>
          <Grid.Column>
            <Header>Profile</Header>
          </Grid.Column>
          <Grid.Column>
            <Header>Name</Header>
          </Grid.Column>
          <Grid.Column>
            <Header>Email</Header>
          </Grid.Column>
          <Grid.Column>
            <Header>Status</Header>
          </Grid.Column>
          <Grid.Column>
            <Header>Management</Header>
          </Grid.Column>
        </Grid.Row>

        {users.map(user => {
          return (
            <Grid.Row key={user.id}>
              <Grid.Column>
                <Image centered size="mini" src={user.imgUrl} />
              </Grid.Column>
              <Grid.Column>{`${user.firstName} ${user.lastName}`}</Grid.Column>
              <Grid.Column>{user.email}</Grid.Column>
              <Grid.Column>{user.isAdmin ? 'Admin' : 'Customer'}</Grid.Column>
              <Grid.Column>
                <div className="ui three buttons">
                  <Button basic color="green">
                    Make Admin
                  </Button>
                  <Button basic color="yellow">
                    Reset Password
                  </Button>
                  <Button basic color="red">
                    Delete User
                  </Button>
                </div>
              </Grid.Column>
            </Grid.Row>
          )
        })}
      </Grid>
    )
  }
}

const mapStateToProps = state => ({
  users: state.user.users
})

const mapDispatchToProps = dispatch => ({
  fetchUsers: () => dispatch(fetchUsersThunk())
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminUsers)
