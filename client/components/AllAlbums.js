import React, {Component, Fragment} from 'react'
import _ from 'lodash'
import {connect} from 'react-redux'
import {fetchAlbums, fetchAlbumsByCategory} from '../store/album'
import {fetchUserThunk} from '../store/user'
import {
  Card,
  Image,
  Grid,
  Container,
  Button,
  ButtonGroup,
  Divider,
  Segment
} from 'semantic-ui-react'
import CategoryFilter from './CategoryFilter'

class AllAlbums extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentPage: 1,
      albumsPerPage: 65
    }
    this.handleCategoryClick = this.handleCategoryClick.bind(this)
    this.handlePageChange = this.handlePageChange.bind(this)
  }

  componentDidMount() {
    this.props.fetchAlbums()
    const user = this.props.user.user
    if (user.id && user.isAuth) {
      // added this to stop it from erroring on load with no user present - might remove
      this.props.fetchUser(user)
    }
  }

  async handleCategoryClick(event) {
    const id = event.target.value
    await this.props.fetchAlbumsByCategory(id)
  }

  handlePageChange(event) {
    this.setState({
      currentPage: Number(event.target.id)
    })
  }

  render() {
    const {history} = this.props
    const {albums} = this.props
    const {currentPage, albumsPerPage} = this.state

    const indexOfLastAlbum = currentPage * albumsPerPage
    const indexOfFirstAlbum = indexOfLastAlbum - albumsPerPage
    const currentAlbums = albums.slice(indexOfFirstAlbum, indexOfLastAlbum)

    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(albums.length / albumsPerPage); i++) {
      pageNumbers.push(i)
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <Button key={number} id={number} onClick={this.handlePageChange}>
          {number}
        </Button>
      )
    })

    return (
      <Container>
        <Grid>
          <Grid.Column width={2}>
            <CategoryFilter handleCategoryClick={this.handleCategoryClick} />
          </Grid.Column>
          {albums ? (
            <Grid.Column width={14}>
              <Card.Group doubling itemsPerRow={4} stackable>
                {_.map(currentAlbums, album => (
                  <Card key={album.id}>
                    <Image
                      size="medium"
                      bordered
                      centered
                      src={album.image}
                      onClick={() => history.push(`/albums/${album.id}`)}
                    />
                    <Card.Content>
                      <Fragment>
                        <Card.Header>{album.title}</Card.Header>
                        <Card.Meta>{album.description}</Card.Meta>
                        <Card.Description>${album.price}</Card.Description>
                      </Fragment>
                    </Card.Content>
                  </Card>
                ))}
              </Card.Group>
            </Grid.Column>
          ) : null}
        </Grid>
        <Segment textAlign="center">
          <ButtonGroup>{renderPageNumbers}</ButtonGroup>
        </Segment>
        <Divider />
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    albums: state.album.albums,
    user: state.user,
    cart: state.user.cartItems
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchAlbums: () => dispatch(fetchAlbums()),
    fetchUser: user => dispatch(fetchUserThunk(user)),
    fetchAlbumsByCategory: id => dispatch(fetchAlbumsByCategory(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllAlbums)
