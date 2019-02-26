import React from 'react'

export default function AlbumCard(props) {
  const {album, history} = props

  return (
    <div>
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
    </div>
  )
}
