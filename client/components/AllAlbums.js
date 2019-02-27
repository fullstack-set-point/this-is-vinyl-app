import React, {Component, Fragment} from 'react'
import _ from 'lodash'
import {connect} from 'react-redux'
import {fetchAlbums} from '../store/album'
import {Card, Image} from 'semantic-ui-react'

class AllAlbums extends Component {
  componentDidMount() {
    this.props.fetchAlbums()
  }

  render() {
    const {history} = this.props
    const {albums} = this.props.album
    console.log('THIS PROPS', this.props)
    return (
      <Fragment>
        <Card.Group doubling itemsPerRow={4} stackable>
          {_.map(albums, album => (
            <Card key={album.id}>
              <Image
                size="medium"
                bordered
                centered
                src={album.photo}
                onClick={() => history.push(`/albums/${album.id}`)}
              />
              <Card.Content>
                <Fragment>
                  <Card.Header>{album.album}</Card.Header>
                  <Card.Meta>{album.artist}</Card.Meta>
                  <Card.Description>{album.year}</Card.Description>
                </Fragment>
              </Card.Content>
            </Card>
          ))}
        </Card.Group>
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {album: state.album}
}

const mapDispatchToProps = dispatch => {
  return {
    fetchAlbums: () => dispatch(fetchAlbums())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllAlbums)
