import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Container, Header, Divider, Form} from 'semantic-ui-react'
import {createAlbum} from '../store/album'

class NewAlbumForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      complete: false,
      title: '',
      description: '',
      year: '',
      price: '',
      quantity: 0,
      image: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event, {name, value}) {
    this.setState({
      [name]: value
    })
  }

  handleSubmit() {
    const {title, description, year, price, quantity, image} = this.state
    const body = {title, description, year, price, quantity, image}
    this.props.createAlbum(body)
    this.setState({
      complete: true
    })
  }

  render() {
    const {title, description, year, price, quantity, image} = this.state
    if (this.state.complete)
      return (
        <Container>
          <Header as="h2">New Album</Header>
          <Divider />
          <h4>Album Added!</h4>
        </Container>
      )
    return (
      <Container>
        <Header as="h2">New Album</Header>
        <Divider />
        <Form onSubmit={this.handleSubmit}>
          <Form.Input
            required
            placeholder="Album Name"
            label="Album Name"
            name="title"
            value={title}
            onChange={this.handleChange}
          />
          <Form.Input
            required
            placeholder="Artist Name"
            label="Artist Name"
            name="description"
            value={description}
            onChange={this.handleChange}
          />
          <Form.Input
            required
            placeholder="Year Released"
            label="Year Released"
            name="year"
            type="number"
            value={year}
            onChange={this.handleChange}
          />
          <Form.Input
            required
            placeholder="Price"
            label="Price"
            name="price"
            type="number"
            value={price}
            onChange={this.handleChange}
          />
          <Form.Input
            required
            placeholder="Quantity Available"
            label="Quantity Available"
            name="quantity"
            type="number"
            value={quantity}
            onChange={this.handleChange}
          />
          <Form.Input
            required
            placeholder="Image Link"
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

const mapDispatchToProps = dispatch => {
  return {
    createAlbum: body => dispatch(createAlbum(body))
  }
}

export default connect(null, mapDispatchToProps)(NewAlbumForm)
