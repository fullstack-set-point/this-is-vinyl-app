import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {
  Table,
  Image,
  Button,
  Dropdown,
  Menu,
  Icon,
  Checkbox,
  Container,
  Divider,
  Header,
  Segment,
  ButtonGroup
} from 'semantic-ui-react'
import {fetchAlbums} from '../store/album'

class AdminAlbums extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentPage: 1,
      albumsPerPage: 65
    }
    this.handlePageChange = this.handlePageChange.bind(this)
  }
  componentDidMount() {
    this.props.fetchAlbums()
  }

  handlePageChange(event) {
    this.setState({
      currentPage: Number(event.target.id)
    })
  }

  render() {
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

    const options = [
      {key: 'rock', text: 'Rock', value: 'rock'},
      {key: 'reggae', text: 'Reggae', value: 'reggae'},
      {key: 'country', text: 'Country', value: 'country'},
      {key: 'jazz', text: 'Jazz', value: 'jazz'},
      {key: 'rap', text: 'Rap', value: 'rap'},
      {key: 'electronic', text: 'Electronic', value: 'electronic'},
      {key: 'pop', text: 'Pop', value: 'pop'}
    ]

    return (
      <Container>
        <Header as="h2">Albums</Header>
        <Divider />
        <Table singleLine>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Cover</Table.HeaderCell>
              <Table.HeaderCell>Title</Table.HeaderCell>
              <Table.HeaderCell>Artist</Table.HeaderCell>
              <Table.HeaderCell>Year</Table.HeaderCell>
              <Table.HeaderCell>Price</Table.HeaderCell>
              <Table.HeaderCell>Inventory</Table.HeaderCell>
              <Table.HeaderCell>Available</Table.HeaderCell>
              <Table.HeaderCell>Categories</Table.HeaderCell>
              <Table.HeaderCell>Edit</Table.HeaderCell>
              <Table.HeaderCell>View</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {currentAlbums.map(album => {
              return (
                <Table.Row key={album.id}>
                  <Table.Cell>
                    <Image centered size="mini" src={album.image} />
                  </Table.Cell>
                  <Table.Cell>{album.title}</Table.Cell>
                  <Table.Cell>{album.description}</Table.Cell>
                  <Table.Cell>{album.year}</Table.Cell>
                  <Table.Cell>${album.price}</Table.Cell>
                  <Table.Cell>{album.quantity}</Table.Cell>
                  <Table.Cell>
                    <Checkbox toggle />
                  </Table.Cell>
                  <Table.Cell>
                    <Dropdown
                      // placeholder={album.categories.map(category => {
                      //   return (
                      //     <a key ={category.id} className='ui label' value={category.name}>
                      //       {category.name}
                      //       <i className='delete icon'></i>
                      //     </a>
                      //   )
                      // })}
                      fluid
                      multiple
                      selection
                      options={options}
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/albums/${album.id}/update`}>
                      <Button color="yellow">Edit</Button>
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/albums/${album.id}`}>
                      <Button color="blue">View</Button>
                    </Link>
                  </Table.Cell>
                </Table.Row>
              )
            })}
          </Table.Body>
        </Table>
        <Segment textAlign="center">
          <ButtonGroup>{renderPageNumbers}</ButtonGroup>
        </Segment>
        <Divider />
      </Container>
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
