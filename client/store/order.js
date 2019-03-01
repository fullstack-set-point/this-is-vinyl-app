import axios from 'axios'
import {runInNewContext} from 'vm'

/**
 * ACTION TYPES
 */
const FETCH_ORDERS = 'FETCH_ORDERS'
const CREATE_ORDER = 'CREATE_ORDER'

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
/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_ORDERS:
      return {...state, orders: action.orders}
    case CREATE_ORDER:
      return {...state, orders: [...state.orders, action.order]}
    default:
      return state
  }
}
