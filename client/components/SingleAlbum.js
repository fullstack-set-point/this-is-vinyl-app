import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchAlbum} from '../store/album'
import {
  Image,
  Segment,
  Icon,
  Button,
  Divider,
  Header,
  Rating
} from 'semantic-ui-react'

class SingleAlbum extends Component {
  componentDidMount() {
    this.props.fetchAlbum(this.props.match.params.albumId)
  }

  render() {
    return (
      <div>
        <Segment.Group horizontal>
          <Segment padded="very">
            <Image src={this.props.album.selectedAlbum.photo} rounded fluid />
          </Segment>
          <Segment padded="very">
            <Header as="h2">
              {this.props.album.selectedAlbum.album} -{' '}
              {this.props.album.selectedAlbum.artist}
            </Header>
            <Header as="h3">${this.props.album.selectedAlbum.price}</Header>
            <Button
              color="green"
              content="Add to Cart"
              icon="shopping cart"
              fluid
            />
            <Divider />
            <Header as="h4">Details</Header>
            <p>Released: {this.props.album.selectedAlbum.year}</p>
            <div>
              Genres:
              {this.props.album.selectedAlbum.categories &&
              this.props.album.selectedAlbum.categories.length ? (
                this.props.album.selectedAlbum.categories.map(category => (
                  <li key={category.id}>{category.name}</li>
                ))
              ) : (
                <p>N/A</p>
              )}
            </div>
            <Divider />
            <Header as="h4">Reviews</Header>
            {this.props.album.selectedAlbum.reviews &&
            this.props.album.selectedAlbum.reviews.length ? (
              <div>
                {this.props.album.selectedAlbum.reviews.map(review => (
                  <Segment.Group key={review.id}>
                    <Segment>
                      {review.rating === 5 ? (
                        <Rating icon="star" defaultRating={5} maxRating={5} />
                      ) : review.rating === 4 ? (
                        <Rating icon="star" defaultRating={4} maxRating={5} />
                      ) : review.rating === 3 ? (
                        <Rating icon="star" defaultRating={3} maxRating={5} />
                      ) : review.rating === 2 ? (
                        <Rating icon="star" defaultRating={2} maxRating={5} />
                      ) : (
                        <Rating icon="star" defaultRating={1} maxRating={5} />
                      )}
                    </Segment>
                    <Segment>Comment: {review.comment}</Segment>
                  </Segment.Group>
                ))}
              </div>
            ) : (
              <p>No Reviews</p>
            )}
          </Segment>
        </Segment.Group>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    album: state.album
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchAlbum: id => dispatch(fetchAlbum(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleAlbum)
