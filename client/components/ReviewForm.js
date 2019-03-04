import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  Container,
  Header,
  Divider,
  Form,
  Select,
  TextArea
} from 'semantic-ui-react'
import {fetchAlbum} from '../store/album'
import {createReview} from '../store/review'

class ReviewForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      rating: 0,
      comment: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    this.props.fetchAlbum(this.props.match.params.albumId)
  }

  handleChange(event, {name, value}) {
    this.setState({
      [name]: value
    })
  }

  handleSubmit() {
    const {title, rating, comment} = this.state
    const albumId = this.props.match.params.albumId
    const userId = this.props.user.id
    const body = {title, rating, comment, albumId, userId}
    this.props.createReview(body)
  }

  render() {
    const ratingOptions = [
      {key: '1', text: '1', value: 1},
      {key: '2', text: '2', value: 2},
      {key: '3', text: '3', value: 3},
      {key: '4', text: '4', value: 4},
      {key: '5', text: '5', value: 5}
    ]
    const {title, comment} = this.state
    return (
      <Container>
        <Header as="h2">Review Form</Header>
        <Divider />
        <Header as="h4">Review for:</Header>
        <p>
          {this.props.album.album} by {this.props.album.artist}
        </p>
        <Form onSubmit={this.handleSubmit}>
          <Form.Input
            placeholder="Title"
            label="Title"
            name="title"
            value={title}
            onChange={this.handleChange}
          />
          <Form.Field
            control={TextArea}
            name="comment"
            label="Comment"
            placeholder="Comment"
            value={comment}
            onChange={this.handleChange}
          />
          <Form.Field
            name="rating"
            control={Select}
            options={ratingOptions}
            label="Rating"
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
    album: state.album.selectedAlbum,
    user: state.user.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchAlbum: albumId => dispatch(fetchAlbum(albumId)),
    createReview: body => dispatch(createReview(body))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewForm)
