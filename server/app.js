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

app.get('/artists', (req, res) => {
  let artists = getAllArtists();
  console.log(artists);
  res.status(200).json(artists)
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

app.post('/artists', (req, res) => {
  let newArtist = addArtist(req.body)

  res.status(200).json(newArtist);
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
  });


// DO NOT MODIFY
if (require.main === module) {
  const port = 8000;
  app.listen(port, () => console.log('Server is listening on port', port));
} else {
  module.exports = app;
}