import axios from 'axios'
import history from '../history'

// ACTION TYPES
const FETCH_USERS = 'FETCH_USERS'
const CREATE_USER = 'CREATE_USER'
const UPDATE_USER = 'UPDATE_USER'
const DELETE_USER = 'DELETE_USER'
const LOGIN_USER = 'LOGIN_USER'
const LOGOUT_USER = 'LOGOUT_USER'
const FETCH_CART_ITEMS = 'FETCH_CART_ITEMS'
const DELETE_CART_ITEM = 'DELETE_CART_ITEM'
const CREATE_CART_ITEM = 'CREATE_CART_ITEM'
const FETCH_ORDERS = 'FETCH_ORDERS'
const FETCH_ORDER = 'FETCH_ORDER'

// INITIAL STATE
const initialState = {
  users: [],
  user: {},
  cartItems: [],
  orders: [],
  order: {}
}

// ACTION CREATORS
const fetchUsers = users => ({
  type: FETCH_USERS,
  users
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

const loginUser = user => ({
  type: LOGIN_USER,
  user
})

const logoutUser = () => ({
  type: LOGOUT_USER
})

const fetchCartItems = cartItems => ({
  type: FETCH_CART_ITEMS,
  cartItems
})

const deleteCartItem = cartItemId => ({
  type: DELETE_CART_ITEM,
  cartItemId
})

const createCartItem = cartItem => ({
  type: CREATE_CART_ITEM,
  cartItem
})

const fetchOrders = orders => ({
  type: FETCH_ORDERS,
  orders
})

const fetchOrder = order => ({
  type: FETCH_ORDER,
  order
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

export const addToCart = (userId, body) => {
  return async dispatch => {
    const {data} = await axios.post(`/api/users/${userId}/cart`, body)
    dispatch(createCartItem(data))
  }
}

export const fetchOrdersThunk = userId => {
  return async dispatch => {
    const {data} = await axios.get(`/api/users/${userId}/orders`)
    dispatch(fetchOrders(data))
  }
}

export const fetchOrderThunk = (userId, orderId) => {
  return async dispatch => {
    const {data} = await axios.get(`/api/users/${userId}/orders/${orderId}`)
    dispatch(fetchOrder(data))
  }
}

// AUTHENTICATION THUNKS CREATORS
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(loginUser(res.data || initialState.user))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password})
  } catch (authError) {
    return dispatch(loginUser({error: authError}))
  }

  try {
    dispatch(loginUser(res.data))
    history.push('/')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(logoutUser())
    history.push('/')
  } catch (err) {
    console.error(err)
  }
}

// REDUCER
export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS:
      return {...state, users: action.users}
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
    case LOGIN_USER:
      return {...state, user: action.user}
    case LOGOUT_USER:
      return {...state, user: {}}
    case FETCH_CART_ITEMS:
      return {...state, cartItems: action.cartItems}
    case DELETE_CART_ITEM:
      return {
        ...state,
        cartItems: [...state.cartItems].filter(cartItem => {
          return cartItem.id !== action.cartItemId
        })
      }
    case CREATE_CART_ITEM:
      return {...state, cartItems: [...state.cartItems, action.cartItem]}
    case FETCH_ORDERS:
      return {...state, orders: action.orders}
    case FETCH_ORDER:
      return {...state, order: action.order}
    default:
      return state
  }
}
