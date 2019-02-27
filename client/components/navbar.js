import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {Input, Menu, Icon} from 'semantic-ui-react'
import {BrowserRouter as Router, Switch, Route, NavLink} from 'react-router-dom'

class NavBar extends React.Component {
  render() {
    return (
      <Menu>
        <Menu.Item>
          <NavLink to="/">This is Vinyl App</NavLink>
        </Menu.Item>
        <Menu.Item>
          <Input icon="search" placeholder="Search..." />
        </Menu.Item>

        <Menu.Menu position="right">
          <Menu.Item>
            <NavLink to="/cart">
              <Icon name="shopping cart" />
            </NavLink>
          </Menu.Item>
          <Menu.Item>
            <NavLink to="/login">Login</NavLink>
          </Menu.Item>
          <Menu.Item>
            <NavLink to="/signup">Signup</NavLink>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    )
  }
}

// const Navbar = ({handleClick, isLoggedIn}) => (
//   <div>
//     <h1>This is Vinyl App</h1>
//     <nav>
//       {isLoggedIn ? (
//         <div>
//           {/* The navbar will show these links after you log in */}
//           <Link to="/home">Home</Link>
//           <a href="#" onClick={handleClick}>
//             Logout
//           </a>
//         </div>
//       ) : (
//         <div>
//           {/* The navbar will show these links before you log in */}
//           <Link to="/login">Login</Link>
//           <Link to="/signup">Sign Up</Link>
//         </div>
//       )}
//     </nav>
//     <hr />
//   </div>

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(NavBar)

/**
 * PROP TYPES
 */
// Navbar.propTypes = {
//   handleClick: PropTypes.func.isRequired,
//   isLoggedIn: PropTypes.bool.isRequired
// }
