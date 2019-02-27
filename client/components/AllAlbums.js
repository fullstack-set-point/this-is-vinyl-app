import React, {Component, Fragment} from 'react'
import _ from 'lodash'
import {connect} from 'react-redux'
import {fetchAlbums, fetchAlbumsByCategory} from '../store/album'
import {
  Button,
  Card,
  Divider,
  Image,
  Placeholder,
  Grid
} from 'semantic-ui-react'
import CategoryFilter from './CategoryFilter'

class AllAlbums extends Component {
  constructor(props) {
    super(props)
    this.handleCategoryClick = this.handleCategoryClick.bind(this)
  }

  componentDidMount() {
    this.props.fetchAlbums()
  }

  async handleCategoryClick(event) {
    const id = event.target.value
    await this.props.fetchAlbumsByCategory(id)
  }

  render() {
    const {history} = this.props
    const {albums} = this.props.album
    console.log('THIS PROPS', this.props)
    return (
      <Fragment>
        <Grid>
          <Grid.Column width={2}>
            <CategoryFilter handleCategoryClick={this.handleCategoryClick} />
          </Grid.Column>
          {albums ? (
            <Grid.Column width={13}>
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
            </Grid.Column>
          ) : null}
        </Grid>
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {album: state.album}
}

const mapDispatchToProps = dispatch => {
  return {
    fetchAlbums: () => dispatch(fetchAlbums()),
    fetchAlbumsByCategory: id => dispatch(fetchAlbumsByCategory(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllAlbums)
