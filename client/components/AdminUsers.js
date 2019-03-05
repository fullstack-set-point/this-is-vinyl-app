import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {
  Table,
  Image,
  Button,
  Dropdown,
  Menu,
  Icon,
  Container,
  Divider,
  Header
} from 'semantic-ui-react'
import {fetchUsersThunk, deleteUserThunk} from '../store/user'

class AdminUsers extends React.Component {
  componentDidMount() {
    this.props.fetchUsers()
  }

  handleDelete = userId => {
    this.props.deleteUser(userId)
  }

  render() {
    const {users} = this.props

    const options = [
      {text: 'Admin', value: 'admin'},
      {text: 'Customer', value: 'customer'}
    ]

    return (
      <Container>
        <Header as="h2">Users</Header>
        <Divider />
        <Table singleLine>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Profile</Table.HeaderCell>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Email</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell>Password</Table.HeaderCell>
              <Table.HeaderCell>Delete</Table.HeaderCell>
              <Table.HeaderCell>View</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {users && users.length
              ? users.map(user => {
                  return (
                    <Table.Row key={user.id}>
                      <Table.Cell>
                        <Image centered size="mini" src={user.imgUrl} />
                      </Table.Cell>
                      <Table.Cell>{`${user.firstName} ${
                        user.lastName
                      }`}</Table.Cell>
                      <Table.Cell>{user.email}</Table.Cell>
                      <Table.Cell>
                        <Dropdown
                          placeholder={user.isAdmin ? 'Admin' : 'Customer'}
                          fluid
                          selection
                          options={options}
                        />
                      </Table.Cell>
                      <Table.Cell>
                        <Button color="yellow">Reset</Button>
                      </Table.Cell>
                      <Table.Cell>
                        <Button
                          color="red"
                          onClick={() => this.handleDelete(user.id)}
                        >
                          Delete
                        </Button>
                      </Table.Cell>
                      <Table.Cell>
                        <Link to={`/users/${user.id}`}>
                          <Button color="blue">View</Button>
                        </Link>
                      </Table.Cell>
                    </Table.Row>
                  )
                })
              : null}
          </Table.Body>
        </Table>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  users: state.user.users
})

const mapDispatchToProps = dispatch => ({
  fetchUsers: () => dispatch(fetchUsersThunk()),
  deleteUser: userId => dispatch(deleteUserThunk(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminUsers)
