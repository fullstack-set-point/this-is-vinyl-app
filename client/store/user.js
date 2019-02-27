import axios from 'axios'
import history from '../history'

// ACTION TYPES
const FETCH_USERS = 'FETCH_USERS'
const FETCH_USER = 'FETCH_USER'
const CREATE_USER = 'CREATE_USER'
const UPDATE_USER = 'UPDATE_USER'
const DELETE_USER = 'DELETE_USER'
const FETCH_CART_ITEMS = 'FETCH_CART_ITEMS'
const DELETE_CART_ITEM = 'DELETE_CART_ITEM'

// ACTION CREATORS
const fetchUsers = users => ({
  type: FETCH_USERS,
  users
})

const fetchUser = user => ({
  type: FETCH_USER,
  user
})

const createUser = user => ({
  type: CREATE_USER,
  user
})

const updateUser = (userId, user) => ({
  type: UPDATE_USER,
  userId,
  user
})

const deleteUser = userId => ({
  type: DELETE_USER,
  userId
})

const fetchCartItems = cartItems => ({
  type: FETCH_CART_ITEMS,
  cartItems
})

const deleteCartItem = cartItemId => ({
  type: DELETE_CART_ITEM,
  cartItemId
})

// THUNK CREATORS
export const fetchUsersThunk = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/users')
      dispatch(fetchUsers(data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const fetchUserThunk = userId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/users/${userId}`)
      dispatch(fetchUser(data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const createUserThunk = user => {
  return async dispatch => {
    try {
      const {data} = await axios.post('/api/users', user)
      dispatch(createUser(data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const updateUserThunk = (userId, user) => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/users/${userId}`, user)
      dispatch(updateUser(data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const deleteUserThunk = userId => {
  return async dispatch => {
    try {
      const {data} = await axios.delete(`/api/users/${userId}`)
      dispatch(deleteUser(data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const fetchCartItemsThunk = userId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/users/${userId}/cart`)
      dispatch(fetchCartItems(data))
      console.log('INSIDE FETCHCARTITEMSTHUNK: ', data)
    } catch (err) {
      console.error(err)
    }
  }
}

export const deleteCartItemThunk = (userId, cartItemId) => {
  return async dispatch => {
    try {
      const {data} = await axios.delete(
        `/api/users/${userId}/cart/${cartItemId}`
      )
      dispatch(deleteCartItem(data))
    } catch (err) {
      console.error(err)
    }
  }
}

// AUTHENTICATION THUNKS CREATORS
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(fetchUser(res.data || initialState.user))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password})
  } catch (authError) {
    return dispatch(fetchUser({error: authError}))
  }

  try {
    dispatch(fetchUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

// INITIAL STATE
const initialState = {
  users: [],
  user: {},
  cartItems: []
}

// REDUCER
export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS:
      return {...state, users: action.users}
    case FETCH_USER:
      return {...state, user: action.user}
    case CREATE_USER:
      return {...state, users: [...state.users, action.user]}
    case UPDATE_USER:
      return {
        ...state,
        users: [...state.users].map(user => {
          return user.id === action.userId ? (user = action.user) : user
        })
      }
    case DELETE_USER:
      return {
        ...state,
        users: [...state.users].filter(user => {
          return user.id !== action.userId
        })
      }
    case FETCH_CART_ITEMS:
      return {...state, cartItems: action.cartItems}
    case DELETE_CART_ITEM:
      return {
        ...state,
        cartItems: [...state.cartItems].filter(cartItem => {
          return cartItem.id !== action.cartItemId
        })
      }

    default:
      return state
  }
}
