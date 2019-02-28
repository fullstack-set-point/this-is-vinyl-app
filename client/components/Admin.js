import React from 'react'
import {Tab} from 'semantic-ui-react'
import AdminAlbums from './AdminAlbums'
import AdminOrders from './AdminOrders'
import AdminUsers from './AdminUsers'

class Admin extends React.Component {
  render() {
    const panes = [
      {
        menuItem: 'Albums',
        render: () => (
          <Tab.Pane>
            <AdminAlbums />
          </Tab.Pane>
        )
      },
      {
        menuItem: 'Orders',
        render: () => (
          <Tab.Pane>
            <AdminOrders />
          </Tab.Pane>
        )
      },
      {
        menuItem: 'Users',
        render: () => (
          <Tab.Pane>
            <AdminUsers />
          </Tab.Pane>
        )
      }
    ]

    return (
      <div>
        <Tab panes={panes} />
      </div>
    )
  }
}

export default Admin
