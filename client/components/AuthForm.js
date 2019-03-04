import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import {Button, Divider, Form, Grid, Segment, Icon} from 'semantic-ui-react'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <Segment compact={true} className="center">
      <Grid columns={2} relaxed="very">
        <Grid.Column>
          <Form onSubmit={handleSubmit} name={name}>
            <Form.Input
              icon="user"
              iconPosition="left"
              label="Email"
              name="email"
              type="email"
              placeholder="email"
              required
            />
            <Form.Input
              icon="lock"
              iconPosition="left"
              label="Password"
              name="password"
              type="password"
              placeholder="password"
              required
            />

            <Button primary type="submit">
              {displayName}
            </Button>
            {error && error.response && <div> {error.response.data} </div>}
          </Form>
        </Grid.Column>

        <Grid.Column verticalAlign="middle">
          <a href="/auth/google">
            <Button size="big" color="red">
              <Icon name="google" />Google {displayName}
            </Button>
          </a>
        </Grid.Column>
      </Grid>

      <Divider vertical>Or</Divider>
    </Segment>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Signup',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
