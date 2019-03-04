import React from 'react'
import {connect} from 'react-redux'
import {logout} from '../store'
import PropTypes from 'prop-types'
import {Input, Menu, Icon, Label} from 'semantic-ui-react'
import {NavLink} from 'react-router-dom'
import {fetchCartItemsThunk} from '../store/user'
import {fetchAlbums} from '../store/album'

class NavBar extends React.Component {
  componentDidMount() {
    if (this.props.user.id) {
      this.props.fetchCartItems(this.props.user.id)
    }
  }

  render() {
    const {isLoggedIn, user, handleLogout, userCartItems} = this.props
    console.log('ISLOGGEDIN: >>>>>>>>>>>>>>>>>>>>>>>>> ', isLoggedIn) // using this to see if this value changes

    return (
      <Menu>
        <Menu.Item>
          <NavLink to="/">This is Vinyl App</NavLink>
        </Menu.Item>
        <Menu.Item>
          <NavLink to="/albums" onClick={this.props.fetchAlbums}>
            Albums
          </NavLink>
        </Menu.Item>
        <Menu.Item>
          <Input icon="search" placeholder="Search..." />
        </Menu.Item>

        {user.isAdmin ? (
          <Menu.Item>
            <NavLink to="/admin">Admin</NavLink>
          </Menu.Item>
        ) : null}

        {!isLoggedIn ? (
          <Menu.Menu position="right">
            <Menu.Item>
              <NavLink
                to={`/users/${user.id}/cart`}
                onClick={() => this.props.fetchCartItems(user.id)}
              >
                <Icon name="shopping cart" />
              </NavLink>
              {userCartItems && userCartItems.length ? (
                <Label>{userCartItems.length}</Label>
              ) : null}
            </Menu.Item>
            <Menu.Item>
              <NavLink to="/login">Login</NavLink>
            </Menu.Item>
            <Menu.Item>
              <NavLink to="/signup">Signup</NavLink>
            </Menu.Item>
          </Menu.Menu>
        ) : (
          <Menu.Menu position="right">
            <Menu.Item>
              <NavLink to={`/users/${user.id}/cart`}>
                <Icon name="shopping cart" />
              </NavLink>
              {userCartItems && userCartItems.length ? (
                <Label>{userCartItems.length}</Label>
              ) : null}
            </Menu.Item>
            <Menu.Item>
              <NavLink to={`/users/${user.id}`}>Account</NavLink>
            </Menu.Item>
            <Menu.Item>
              <NavLink to="/" onClick={handleLogout}>
                Logout
              </NavLink>
            </Menu.Item>
          </Menu.Menu>
        )}
      </Menu>
    )
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: !!state.user.user.id, // I changed this back to "...user.id" from "...user.isAuth"
    user: state.user.user,
    userCartItems: state.user.cartItems
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleLogout() {
      dispatch(logout())
    },
    fetchAlbums: () => dispatch(fetchAlbums()),
    fetchCartItems: userId => dispatch(fetchCartItemsThunk(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)

NavBar.propTypes = {
  handleLogout: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
