import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_ALBUMS = 'GET_ALBUMS'

/**
 * INITIAL STATE
 */
const initialState = {
  allAlbums: []
}

/**
 * ACTION CREATORS
 */
const gotAlbums = albums => ({type: GET_ALBUMS, albums})

/**
 * THUNK CREATORS
 */
export const fetchAlbums = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/albums')
    dispatch(gotAlbums(data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALBUMS:
      return {...state, allAlbums: action.albums}
    default:
      return state
  }
}
