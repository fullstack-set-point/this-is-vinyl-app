import React from 'react'
import {connect} from 'react-redux'
import {Grid, Image, Header, Button} from 'semantic-ui-react'
import {fetchAlbums} from '../store/album'

class AdminAlbums extends React.Component {
  componentDidMount() {
    this.props.fetchAlbums()
  }

  render() {
    const {albums} = this.props

    return (
      <Grid columns={7} celled textAlign="center" verticalAlign="middle">
        <Grid.Row>
          <Grid.Column>
            <Header>Cover</Header>
          </Grid.Column>
          <Grid.Column>
            <Header>Title</Header>
          </Grid.Column>
          <Grid.Column>
            <Header>Artist</Header>
          </Grid.Column>
          <Grid.Column>
            <Header>Year</Header>
          </Grid.Column>
          <Grid.Column>
            <Header>Price</Header>
          </Grid.Column>
          <Grid.Column>
            <Header>Inventory</Header>
          </Grid.Column>
          <Grid.Column>
            <Header>Management</Header>
          </Grid.Column>
        </Grid.Row>

        {albums.map(album => {
          return (
            <Grid.Row key={album.id}>
              <Grid.Column>
                <Image centered size="mini" src={album.photo} />
              </Grid.Column>
              <Grid.Column>{album.album}</Grid.Column>
              <Grid.Column>{album.artist}</Grid.Column>
              <Grid.Column>{album.year}</Grid.Column>
              <Grid.Column>${album.price}</Grid.Column>
              <Grid.Column>{album.quantity}</Grid.Column>
              <Grid.Column>
                <Button>Edit</Button>
              </Grid.Column>
            </Grid.Row>
          )
        })}
      </Grid>
    )
  }
}

const mapStateToProps = state => ({
  albums: state.album.albums
})

const mapDispatchToProps = dispatch => ({
  fetchAlbums: () => dispatch(fetchAlbums())
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminAlbums)
