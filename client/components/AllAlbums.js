import React from 'react'
import {connect} from 'react-redux'
import {fetchAlbums} from '../store'
// import AlbumCard from './AlbumCard'

class AllAlbums extends React.Component {
  // componentDidMount() {
  //   this.props.fetchAlbums()
  // }

  render() {
    const {history, albums} = this.props
    return (
      <div>
        <h1>THIS SHOULD BE TEXT</h1>
        {/* <ul>
          {albums.map(album => (
            <ul>
              <img
                src={album.photo}
                onClick={() => history.push(`/api/albums/${album.id}`)}
              />
              <li onClick={() => history.push(`/api/albums/${album.id}`)}>
                Name: {album.name}
              </li>
              <li>Artist: {album.artist}</li>
              <li>Year: {album.year}</li>
              <li>Price: {album.price}</li>
            </ul>
            // <AlbumCard key={album.id} album={album} history={history} /> //making an AlbumCard component to render individual albums on the AllAlbums page (presentational)
          ))}
        </ul> */}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {albums: state.allAlbums}
}

const mapDispatchToProps = dispatch => {
  return {
    fetchAlbums: () => dispatch(fetchAlbums())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllAlbums)
