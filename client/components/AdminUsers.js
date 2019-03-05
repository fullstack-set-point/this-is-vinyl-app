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
import {fetchUsersThunk, deleteUserThunk, updateUserThunk} from '../store/user'

class AdminUsers extends React.Component {
  constructor(props) {
    super(props)
    this.updateStatus = this.updateStatus.bind(this)
  }

  componentDidMount() {
    this.props.fetchUsers()
  }

  handleDelete = userId => {
    this.props.deleteUser(userId)
  }

  updateStatus(user, {value}) {
    user.isAdmin = value
    this.props.updateUser(user.id, user)
  }

  render() {
    const {users} = this.props

    const options = [
      {text: 'Admin', value: true},
      {text: 'Customer', value: false}
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
                          // onChange={() => this.updateStatus(user)}
                        />
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
          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan="6">
                <Menu floated="right" pagination>
                  <Menu.Item as="a" icon>
                    <Icon name="chevron left" />
                  </Menu.Item>
                  <Menu.Item as="a">1</Menu.Item>
                  <Menu.Item as="a">2</Menu.Item>
                  <Menu.Item as="a">3</Menu.Item>
                  <Menu.Item as="a">4</Menu.Item>
                  <Menu.Item as="a" icon>
                    <Icon name="chevron right" />
                  </Menu.Item>
                </Menu>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
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
  deleteUser: userId => dispatch(deleteUserThunk(userId)),
  updateUser: (userId, user) => dispatch(updateUserThunk(userId, user))
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminUsers)
