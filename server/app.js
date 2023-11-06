// Phase 2
const {
  getAllArtists,
  getLatestArtist,
  getArtistByArtistId,
  addArtist,
  editArtistByArtistId,
  deleteArtistByArtistId,
  getAlbumsForLatestArtist,
  getAlbumsByArtistId,
  getAlbumByAlbumId,
  addAlbumByArtistId,
  editAlbumByAlbumId,
  deleteAlbumByAlbumId,
  getFilteredAlbums,
  getSongsByArtistId,
  getSongsByAlbumId,
  getSongBySongId,
  addSongByAlbumId,
  editSongBySongId,
  deleteSongBySongId
} = require('./data');

const express = require('express');
const app = express();

// Your code here
app.use(express.json())

app.use((req, res, next) => {

  next()
})

app.route('/songs/:songId')
  .get((req, res) => {
    let { songId } = req.params
    let song = getSongBySongId(songId)
    res.status(200).json(song)
  })
  .put((req, res) => {
    let { songId } = req.params
    let song = editSongBySongId(songId, req.body)
    res.status(200).json(song)
  })
  .delete((req, res) => {
    let { songId } = req.params
    let song = deleteSongBySongId(songId)
    res.status(200).json(song)
  })

app.route('/albums/:albumId/songs')
  .get((req, res) => {
    let { albumId } = req.params
    let songs = getSongsByAlbumId(albumId)
    res.status(200).json(songs)
  })
  .post((req, res) => {
    let { albumId } = req.params
    let song = addSongByAlbumId(albumId, req.body)
    res.status(201).json(song)
  })

app.route('/albums/:albumId')
  .get((req, res) => {
    let { albumId } = req.params
    let albums = getAlbumByAlbumId(albumId)
    res.status(200).json(albums)
  })
  .put((req, res) => {
    let { albumId } = req.params
    let album = editAlbumByAlbumId(albumId, req.body)
    res.status(200).json(album)
  })
  .delete((req, res) => {
    let { albumId } = req.params
    deleteAlbumByAlbumId(albumId)
    res.status(200).json({ "message": "Succesfully deleted" })
  })

app.get('/albums', (req, res) => {
  let { startsWith } = req.query
  let albums = getFilteredAlbums(startsWith)
  res.status(200).json(albums)
})

app.get('/artists/:artistId/songs', (req, res) => {
  let { artistId } = req.params
  let songs = getSongsByArtistId(artistId)
  res.status(200).json(songs)
})


app.route('/artists/:artistId/albums')
  .get((req, res) => {
    let { artistId } = req.params
    let albums = getAlbumsByArtistId(artistId)
    res.status(200).json(albums)
  })
  .post((req, res) => {
    let { artistId } = req.params
    let album = addAlbumByArtistId(artistId, req.body)
    res.status(201).json(album)
  })

app.get('/artists/:artistId', (req, res) => {
  let artistId = req.params.artistId
  let artist = getArtistByArtistId(artistId);
  if (artist) {
    return res.status(200).json(artist)
  } else {
    return res.send("failed")
  }
})

app.route('/artists/:artistId')
  .put((req, res) => {
    let artistId = req.params.artistId
    let editedArtist = editArtistByArtistId(artistId, req.body)
    return res.status(200).json(editedArtist)
  })
  .patch((req, res) => {
    let artistId = req.params.artistId
    let editedArtist = editArtistByArtistId(artistId, req.body)
    return res.status(200).json(editedArtist)
  })
  .delete((req, res) => {
    let artistId = req.params.artistId
    let deletedArtist = deleteArtistByArtistId(artistId)
    if (deletedArtist) {
      res.status(200).json({ "message": "Successfully deleted" })
    }
    res.status(404).json({ "message": "Failed deletion" })
  })

app.route('/artists')
  .get((req, res) => {
    let newArtist = addArtist(req.body)
    res.status(200).json(newArtist);
  })

// DO NOT MODIFY
if (require.main === module) {
  const port = 8000;
  app.listen(port, () => console.log('Server is listening on port', port));
} else {
  module.exports = app;
}

///test