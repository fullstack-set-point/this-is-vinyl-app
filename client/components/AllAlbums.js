import React from 'react'
import {connect} from 'react-redux'
// import { fetchAlbums } from '../store';
// import AlbumCard from './AlbumCard';

class AllALbums extends React.Component {
  // componentDidMount() {
  //   this.props.fetchAlbums();
  // }

  render() {
    const {history, albums} = this.props
    return (
      <div>
        <ul>
          {albums.map(album => (
            <AlbumCard key={album.id} album={album} history={history} /> //making an AlbumCard component to render individual albums on the AllAlbums page (presentational)
          ))}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {albums: state.albums}
}

const mapDispatchToProps = dispatch => {
  return {
    fetchAlbums: () => dispatch(fetchAlbums())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllAlbums)
