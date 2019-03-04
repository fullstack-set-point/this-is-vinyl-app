import React from 'react'
import {connect} from 'react-redux'
import {
  Container,
  Divider,
  Header,
  Grid,
  Image,
  Segment,
  Button
} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

class SingleUser extends React.Component {
  render() {
    const {user} = this.props

    return (
      <Container>
        <Header as="h2">Your Account</Header>
        <Divider />
        <Grid columns="three" divided>
          <Grid.Row>
            <Grid.Column>
              <Header as="h3">Profile</Header>
              <Segment>
                <Image src={user.imgUrl} />
              </Segment>
              {user.firstName ? (
                <Header as="h4">{`${user.firstName} ${user.lastName}`}</Header>
              ) : null}
              {user.firstName ? <p>{user.email}</p> : null}
            </Grid.Column>
            <Grid.Column>
              <Header as="h3">Shipping Information</Header>
              {user.address ? (
                <Segment>
                  <p>{`${user.firstName} ${user.lastName}`}</p>
                  <p>{user.address}</p>
                  <p>
                    {user.city}, {user.state} {user.zip}
                  </p>
                </Segment>
              ) : null}
            </Grid.Column>
            <Grid.Column>
              <Header as="h3">Orders</Header>
              <Button>
                <Link to={`/users/${user.id}/orders`}>View Past Orders</Link>
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user.user
})

export default connect(mapStateToProps)(SingleUser)
