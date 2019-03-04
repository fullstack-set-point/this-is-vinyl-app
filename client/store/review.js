import axios from 'axios'

/**
 * ACTION TYPES
 */
const NEW_REVIEW = 'NEW_REVIEW'

/**
 * INITIAL STATE
 */
const initialState = {
  reviews: []
}

/**
 * ACTION CREATORS
 */
const newReview = review => ({
  type: NEW_REVIEW,
  review
})

/**
 * THUNK CREATORS
 */
export const createReview = body => {
  return async dispatch => {
    const {data} = await axios.post('/api/reviews', body)
    const action = newReview(data)
    dispatch(action)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case NEW_REVIEW:
      return {...state, reviews: [...state.reviews, action.review]}
    default:
      return state
  }
}
