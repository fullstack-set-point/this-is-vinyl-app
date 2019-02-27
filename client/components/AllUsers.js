import React from 'react'
import {connect} from 'react-redux'
import {fetchUsersThunk} from '../store/user'
import {Button, Card, Image, Icon} from 'semantic-ui-react'

class AllUsers extends React.Component {
  componentDidMount() {
    this.props.fetchUsers()
  }

  render() {
    const {users} = this.props

    return (
      <Card.Group centered>
        {users.map(user => {
          return (
            <Card key={user.id}>
              <Card.Content>
                <Image
                  floated="right"
                  size="mini"
                  src="https://react.semantic-ui.com/images/avatar/large/steve.jpg"
                />
                <Card.Header>{`${user.firstName} ${
                  user.lastName
                }`}</Card.Header>
                <Card.Meta>{user.isAdmin ? 'Admin' : 'Customer'}</Card.Meta>
                <Card.Description>
                  <Icon name="shopping cart" />X items
                </Card.Description>
                <Card.Description>
                  <Icon name="dollar sign" />X orders
                </Card.Description>
                <Card.Description>
                  <Icon name="thumbs up" />X reviews
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
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
              </Card.Content>
            </Card>
          )
        })}
      </Card.Group>
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
