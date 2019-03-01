import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchAlbum} from '../store/album'
import {addToCart} from '../store/user'
import {
  Image,
  Segment,
  Button,
  Divider,
  Header,
  Rating,
  Grid,
  Form,
  Select
} from 'semantic-ui-react'

class SingleAlbum extends Component {
  constructor(props) {
    super(props)
    this.state = {
      album: this.props.album.selectedAlbum,
      cartItem: {
        albumId: this.props.album.selectedAlbum.id,
        quantity: 1
      }
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  async componentDidMount() {
    await this.props.fetchAlbum(this.props.match.params.albumId)
    this.setState({
      album: this.props.album.selectedAlbum,
      cartItem: {
        albumId: this.props.album.selectedAlbum.id,
        quantity: 1
      }
    })
  }

  handleChange(event, {value}) {
    this.setState({
      cartItem: {
        ...this.state.cartItem,
        quantity: value
      }
    })
  }

  handleClick(event) {
    try {
      event.preventDefault()
      let productId = this.props.match.params.albumId
      productId = Number(productId)
      const quantity = this.state.cartItem.quantity
      const body = {productId, quantity}
      this.props.addToCart(this.props.user.user.id, body)
    } catch (err) {
      console.error(err)
    }
  }

  render() {
    const options = [
      {key: 1, text: '1', value: 1},
      {key: 2, text: '2', value: 2},
      {key: 3, text: '3', value: 3},
      {key: 4, text: '4', value: 4},
      {key: 5, text: '5', value: 5},
      {key: 6, text: '6', value: 6},
      {key: 7, text: '7', value: 7},
      {key: 8, text: '8', value: 8},
      {key: 9, text: '9', value: 9},
      {key: 10, text: '10', value: 10}
    ]
    return (
      <div>
        <Grid padding="very">
          <Grid.Column width={1} />
          <Grid.Column width={6}>
            <Image src={this.props.album.selectedAlbum.photo} rounded fluid />
          </Grid.Column>
          <Grid.Column width={2} />
          <Grid.Column width={6}>
            <Header as="h2">
              {this.props.album.selectedAlbum.album} -{' '}
              {this.props.album.selectedAlbum.artist}
            </Header>
            <Header as="h3">${this.props.album.selectedAlbum.price}</Header>
            <Form size="small">
              <Select
                options={options}
                placeholder="Quantity"
                onChange={this.handleChange}
                compact
              />
              <Button
                color="green"
                content="Add to Cart"
                icon="shopping cart"
                type="submit"
                fluid
                onClick={this.handleClick}
              />
            </Form>
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
          </Grid.Column>
          <Grid.Column width={1} />
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    album: state.album,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchAlbum: id => dispatch(fetchAlbum(id)),
    addToCart: (userId, body) => dispatch(addToCart(userId, body))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleAlbum)
