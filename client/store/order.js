import axios from 'axios'
import {runInNewContext} from 'vm'

/**
 * ACTION TYPES
 */
const FETCH_ORDERS = 'FETCH_ORDERS'
const CREATE_ORDER = 'CREATE_ORDER'
const UPDATE_ORDER = 'UPDATE_ORDER'

/**
 * INITIAL STATE
 */
const initialState = {
  orders: []
}

/**
 * ACTION CREATORS
 */
const gotOrders = orders => ({
  type: 'FETCH_ORDERS',
  orders
})

const createOrder = order => ({
  type: CREATE_ORDER,
  order
})

const updateOrder = (orderId, order) => ({
  type: UPDATE_ORDER,
  orderId,
  order
})

/**
 * THUNK CREATORS
 */
export const fetchOrders = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/orders')
    dispatch(gotOrders(data))
  } catch (err) {
    console.error(err)
  }
}

export const createOrderThunk = body => async dispatch => {
  try {
    const {data} = await axios.post('/api/orders', body)
    dispatch(createOrder(data))
  } catch (err) {
    console.error(err)
  }
}

export const updateOrderThunk = (orderId, order) => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/orders/${orderId}`, order)
      dispatch(updateOrder(data))
    } catch (err) {
      console.error(err)
    }
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_ORDERS:
      return {...state, orders: action.orders}
    case CREATE_ORDER:
      return {...state, orders: [...state.orders, action.order]}
    case UPDATE_ORDER:
      return {
        ...state,
        orders: [...state.orders].map(order => {
          return order.id === action.orderId ? (order = action.order) : order
        })
      }
    default:
      return state
  }
}
