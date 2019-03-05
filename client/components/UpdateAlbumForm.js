import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Container, Header, Divider, Form} from 'semantic-ui-react'
import {fetchAlbum, updateAlbumThunk} from '../store/album'

class UpdateAlbumForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      complete: false,
      title: '',
      description: '',
      year: '',
      price: '',
      quantity: '',
      image: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.fetchAlbum(this.props.match.params.albumId)
    this.setState({
      title: this.props.selectedAlbum.title,
      description: this.props.selectedAlbum.description,
      year: this.props.selectedAlbum.year,
      price: this.props.selectedAlbum.price,
      quantity: this.props.selectedAlbum.quantity,
      image: this.props.selectedAlbum.image
    })
  }

  handleChange(event, {name, value}) {
    this.setState({
      [name]: value
    })
  }

  handleSubmit() {
    const {title, description, year, price, quantity, image} = this.state
    const albumId = this.props.match.params.albumId
    const body = {title, description, year, price, quantity, image, albumId}
    this.props.updateAlbumThunk(body)
    this.setState({
      complete: true
    })
  }

  render() {
    const {title, description, year, price, quantity, image} = this.state
    if (this.state.complete)
      return (
        <Container>
          <Header as="h2">Update Album</Header>
          <Divider />
          <h4>Album Updated!</h4>
        </Container>
      )
    return (
      <Container>
        <Header as="h2">Update Album</Header>
        <Divider />
        <Form onSubmit={this.handleSubmit}>
          <Form.Input
            required
            placeholder={this.props.selectedAlbum.title}
            label="Album Name"
            name="title"
            value={title}
            onChange={this.handleChange}
          />
          <Form.Input
            required
            placeholder={this.props.selectedAlbum.description}
            label="Artist Name"
            name="description"
            value={description}
            onChange={this.handleChange}
          />
          <Form.Input
            required
            placeholder={this.props.selectedAlbum.year}
            label="Year Released"
            name="year"
            type="number"
            value={year}
            onChange={this.handleChange}
          />
          <Form.Input
            required
            placeholder={this.props.selectedAlbum.price}
            label="Price"
            name="price"
            type="number"
            value={price}
            onChange={this.handleChange}
          />
          <Form.Input
            required
            placeholder={this.props.selectedAlbum.quantity}
            label="Quantity Available"
            name="quantity"
            type="number"
            value={quantity}
            onChange={this.handleChange}
          />
          <Form.Input
            required
            placeholder={this.props.selectedAlbum.image}
            label="Image Link"
            name="image"
            value={image}
            onChange={this.handleChange}
          />
          <Form.Button content="Submit" />
        </Form>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    selectedAlbum: state.album.selectedAlbum
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchAlbum: albumId => dispatch(fetchAlbum(albumId)),
    updateAlbumThunk: body => dispatch(updateAlbumThunk(body))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateAlbumForm)
