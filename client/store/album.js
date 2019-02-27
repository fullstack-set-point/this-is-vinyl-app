import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_ALBUMS = 'GET_ALBUMS'
const GET_ALBUM = 'GET_ALBUM'

/**
 * INITIAL STATE
 */
const initialState = {
  albums: [],
  selectedAlbum: {}
}

/**
 * ACTION CREATORS
 */
const gotAlbums = albums => ({type: GET_ALBUMS, albums})

const gotAlbum = album => ({
  type: GET_ALBUM,
  album
})

/**
 * THUNK CREATORS
 */
export const fetchAlbums = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/albums')
    console.log('DATA: ', data)
    dispatch(gotAlbums(data))
  } catch (err) {
    console.error(err)
  }
}

export const fetchAlbum = id => {
  return async dispatch => {
    const {data} = await axios.get(`/api/albums/${id}`)
    const action = gotAlbum(data)
    dispatch(action)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALBUMS:
      return {...state, albums: action.albums}
    case GET_ALBUM:
      return {...state, selectedAlbum: action.album}
    default:
      return state
  }
}
