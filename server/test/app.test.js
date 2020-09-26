/**
 * @jest-environment node
 */
const request = require('supertest');
const {
  Album, Artist, Playlist, Song,
} = require('../models');
const app = require('../app');

const mock = {
  artist: {
    collums: ['name', 'cover_img'],
    values: ['good', 'singer'],
  },
  album: {
    collums: ['name', 'cover_img', 'artist_id'],
    values: ['amazing', 'album', 1],
  },
  playlist: {
    collums: ['name', 'cover_img'],
    values: ['ok', 'playlist'],
  },
  song: {
    collums: ['name', 'cover_img', 'album_id', 'artist_id'],
    values: ['ok', 'playlist', 2, 2],
  },
};

const projectName = '1.Music - Service Database';

describe(`${projectName} - first test suite`, () => {
  beforeEach(async () => {
    await Artist.destroy({ truncate: true, force: true });
    await Album.destroy({ truncate: true, force: true });
  });

  it('Can create artist', async (done) => {
    const res = await request(app).post('/api/artists').send(mock.artist).expect(200);
    expect(res.text).toBe('Posted new artist');
    const databaseValue = await Artist.findByPk(1);
    expect(databaseValue.name).toBe(mock.artist.values[0]);
    done();
  });

  it('Can find artist', async (done) => {
    const res = await request(app).get('/api/artists').expect(200);
    const databaseValue = await Artist.findAll();
    expect(res.body).toStrictEqual(databaseValue);
    done();
  });

  it('Can create album', async (done) => {
    const res = await request(app).post('/api/albums').send(mock.album).expect(200);
    expect(res.text).toBe('Posted new album');
    const databaseValue = await Album.findByPk(1);
    expect(databaseValue.name).toBe(mock.album.values[0]);
    done();
  });

  it('Can find albums', async (done) => {
    const res = await request(app).get('/api/albums').expect(200);
    const databaseValue = await Album.findAll();
    expect(res.body).toStrictEqual(databaseValue);
    done();
  });

  it('Can create playlist', async (done) => {
    const res = await request(app).post('/api/playlists').send(mock.playlist).expect(200);
    expect(res.text).toBe('Posted new playlist');
    const databaseValue = await Playlist.findByPk(1);
    expect(databaseValue.name).toBe(mock.playlist.values[0]);
    done();
  });

  it('Can find playlist', async (done) => {
    const res = await request(app).get('/api/playlists').expect(200);
    const databaseValue = await Playlist.findAll();
    expect(res.body[0].name).toBe(databaseValue[0].name);
    done();
  });

  it('Can create song', async (done) => {
    const res = await request(app).post('/api/songs').send(mock.playlist).expect(200);
    expect(res.text).toBe('Posted new song');
    const databaseValue = await Song.findByPk(1);
    expect(databaseValue.name).toBe(mock.song.values[0]);
    done();
  });

  it('Can find song', async (done) => {
    const res = await request(app).get('/api/songs').expect(200);
    const databaseValue = await Song.findAll();
    expect(res.body[0].name).toBe(databaseValue[0].name);
    done();
  });
});
