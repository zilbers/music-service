/**
 * @jest-environment node
 */
const request = require('supertest');
const { Album } = require('../models');
const app = require('../app');

const mock = {
  album: {
    collums: ['name', 'coverImg', 'artistId'],
    values: ['test', 'album', 1],
  },
  anotherAlbum: {
    collums: ['name', 'coverImg', 'artistId'],
    values: ['another', 'test', 1],
  },
  updatedAlbum: {
    collums: ['name', 'coverImg', 'artistId'],
    values: ['updated', 'albumTest', 1],
  },
  artist: {
    collums: ['name', 'coverImg', 'artistId'],
    values: ['better', 'album', 1],
  },
};

describe('2.Music - Service Database - albums API', () => {
  beforeAll(async () => {
    await Album.destroy({ truncate: true, force: true });
    await request(app).post('/api/artists').send(mock.artist).expect(200);
  });

  it('Can create album', async (done) => {
    const res = await request(app).post('/api/albums').send(mock.album).expect(200);
    const anotherRes = await request(app).post('/api/albums').send(mock.anotherAlbum).expect(200);
    expect(res.text).toBe('Posted new album');
    expect(anotherRes.text).toBe('Posted new album');
    const databaseValue = await Album.findAll({
      where: {
        name: mock.album.values[0],
      },
    });
    expect(databaseValue[0].name).toBe(mock.album.values[0]);
    const anotherDatabaseValue = await Album.findAll({
      where: {
        name: mock.anotherAlbum.values[0],
      },
    });
    expect(anotherDatabaseValue[0].name).toBe(mock.anotherAlbum.values[0]);
    done();
  });

  it('Can get all albums', async (done) => {
    const res = await request(app).get('/api/albums').expect(200);
    const databaseValue = await Album.findAll();
    expect(res.body.length).toBe(databaseValue.length);
    done();
  });

  it('Can find album by id', async (done) => {
    const res = await request(app).get('/api/albums').expect(200);
    const { id } = res.body[0];
    const databaseValueById = await Album.findByPk(id);
    const resById = await request(app).get(`/api/albums/album_${id}`).expect(200);
    expect(resById.body.name).toBe(databaseValueById.name);
    done();
  });

  it('Can update album', async (done) => {
    const res = await request(app).get('/api/albums').expect(200);
    const { id } = res.body[0];

    const udpate = await request(app).put(`/api/albums/${id}`).send(mock.updatedAlbum).expect(200);
    expect(udpate.text).toBe('Updated album');

    const databaseValueById = await Album.findByPk(id);
    expect(databaseValueById.name).not.toBe(res.body[0].name);

    const resById = await request(app).get(`/api/albums/album_${id}`).expect(200);
    expect(resById.body.name).toBe(databaseValueById.name);
    done();
  });

  it('Can find album by id', async (done) => {
    const res = await request(app).get('/api/albums').expect(200);
    const { id } = res.body[0];
    const afteDelete = await request(app).delete(`/api/albums/${id}`).expect(200);
    expect(afteDelete.text).toBe('Deleted album');
    const afterDeleteGetAll = await request(app).get('/api/albums').expect(200);
    expect(afterDeleteGetAll.length).not.toBe(res.body.length);
    done();
  });
});
