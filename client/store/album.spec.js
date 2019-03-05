'use strict'
import {expect} from 'chai'
import {
  fetchAlbums,
  fetchAlbum,
  fetchAlbumsByCategory,
  createAlbum,
  updateAlbumThunk
} from './album'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

const Product = require('../../server/db/models/Product')

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('Album Redux', () => {
  describe('thunk creators', () => {
    let store
    let mockAxios

    const initialState = {albums: [], selectedAlbum: {}}

    const init1 = {
      title: 'title',
      description: 'desc',
      year: 1999,
      price: 10,
      quantity: 2
    }

    const add1 = {
      title: 'add1',
      description: 'add1',
      year: 2002,
      price: 11,
      quantity: 2
    }

    const edit1 = {
      id: 1,
      title: 'edit1',
      description: 'edit1',
      year: 1980,
      price: 8,
      quantity: 2
    }

    beforeEach(async () => {
      mockAxios = new MockAdapter(axios)
      store = mockStore(initialState)
      try {
        await Product.create(init1)
      } catch (err) {
        console.error(err)
      }
    })

    afterEach(() => {
      mockAxios.restore()
      store.clearActions()
    })

    it('fetchAlbums thunk', async () => {
      mockAxios.onGet('api/albums').replyOnce(201)
      await store.dispatch(fetchAlbums())
      const actions = store.getActions()
      expect(actions[0].type).to.equal('GET_ALBUMS')
      // expect(actions[0].albums).to.deep.equal(init1)
    })

    it('createAlbum thunk', async () => {
      mockAxios.onPost('api/albums').replyOnce(201, add1)
      await store.dispatch(createAlbum(add1))
      const actions = store.getActions()
      expect(actions[0].type).to.equal('NEW_ALBUM')
      expect(actions[0].album).to.deep.equal(add1)
    })

    it('updateAlbumThunk', async () => {
      mockAxios.onPut('api/albums', edit1).replyOnce(204, edit1)
      await store.dispatch(updateAlbumThunk(edit1))
      const actions = store.getActions()
      expect(actions[0].type).to.equal('UPDATE_ALBUM')
      expect(actions[0].album).to.deep.equal(edit1)
    })
  })
})
