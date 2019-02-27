import React from 'react'
import {connect} from 'react-redux'
import {fetchUserThunk} from '../store/user'
import {Item} from 'semantic-ui-react'

class SingleUser extends React.Component {
  render() {
    const {user} = this.props

    return (
      <Item>
        <Item.Image size="tiny" src={user.imgUrl} />

        <Item.Content>
          <Item.Header>{`${user.firstName} ${user.lastName}`}</Item.Header>
          <Item.Meta>Profile Info</Item.Meta>
          <Item.Description>{user.email}</Item.Description>

          <Item.Meta>Shipping Info</Item.Meta>
          <Item.Description>{user.address}</Item.Description>
          <Item.Description>{user.city}</Item.Description>
          <Item.Description>{user.state}</Item.Description>
          <Item.Description>{user.Zip}</Item.Description>
          <Item.Extra>Additional Details</Item.Extra>
        </Item.Content>
      </Item>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user.user
})

export default connect(mapStateToProps)(SingleUser)
