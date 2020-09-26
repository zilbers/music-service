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
    collums: ['name', 'coverImg'],
    values: ['good', 'singer'],
  },
  album: {
    collums: ['name', 'coverImg', 'artistId'],
    values: ['fine', 'album', 2],
  },
  playlist: {
    collums: ['name', 'coverImg'],
    values: ['ok', 'playlist'],
  },
  song: {
    collums: ['name', 'artistId', 'albumId', 'lyrics', 'youtubeLink'],
    values: ['A', 2, 2, 'very', 'good song'],
  },
  // Misses name property
  badInput: {
    collums: ['albumId', 'artistId', 'youtubeLink'],
    values: [1, 1, 'link'],
  },
};

const projectName = '1.Music - Service Database';

describe(`${projectName} - first test suite`, () => {
  beforeAll(async () => {
    await Artist.destroy({ truncate: true, force: true });
    await Album.destroy({ truncate: true, force: true });
    await Song.destroy({ truncate: true, force: true });
    await Playlist.destroy({ truncate: true, force: true });
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
    expect(res.body[0].name).toBe(databaseValue[0].name);
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
    expect(res.body[0].name).toBe(databaseValue[0].name);
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
    const res = await request(app).post('/api/songs').send(mock.song).expect(200);
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

  it('Not allowing to upload bad data', async (done) => {
    await request(app).post('/api/songs').send(mock.badInput).expect(500);
    await request(app).post('/api/albums').send(mock.badInput).expect(500);
    await request(app).post('/api/playlists').send(mock.badInput).expect(500);
    await request(app).post('/api/artists').send(mock.badInput).expect(500);
    done();
  });
});
