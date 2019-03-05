import React from 'react'
import {Tab, Button, Container} from 'semantic-ui-react'
import AdminAlbums from './AdminAlbums'
import AdminOrders from './AdminOrders'
import AdminUsers from './AdminUsers'
import AlbumForm from './AlbumForm'

class Admin extends React.Component {
  render() {
    const panes = [
      {
        menuItem: {key: 'albums', icon: 'music', content: 'Manage Albums'},
        render: () => (
          <Tab.Pane attached={false}>
            <AdminAlbums />
          </Tab.Pane>
        )
      },
      {
        menuItem: {key: 'orders', icon: 'truck', content: 'Manage Orders'},
        render: () => (
          <Tab.Pane attached={false}>
            <AdminOrders />
          </Tab.Pane>
        )
      },
      {
        menuItem: {key: 'users', icon: 'users', content: 'Manage Users'},
        render: () => (
          <Tab.Pane attached={false}>
            <AdminUsers />
          </Tab.Pane>
        )
      },
      {
        menuItem: {key: 'orders', icon: 'add', content: 'Add New Album'},
        render: () => (
          <Tab.Pane attached={false}>
            <AlbumForm />
          </Tab.Pane>
        )
      }
    ]

    return <Tab menu={{secondary: true, pointing: true}} panes={panes} />
  }
}

export default Admin
