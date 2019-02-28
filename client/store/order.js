import axios from 'axios'

/**
 * ACTION TYPES
 */
const FETCH_ORDERS = 'FETCH_ORDERS'

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

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_ORDERS:
      return {...state, orders: action.orders}
    default:
      return state
  }
}
