/**
 * @jest-environment node
 */
const request = require('supertest');
const { Artist } = require('../models');
const app = require('../app');

const mock = {
  artist: {
    collums: ['name', 'coverImg'],
    values: ['good', 'singer'],
  },
  anotherArtist: {
    collums: ['name', 'coverImg'],
    values: ['decent', 'artist'],
  },
  updatedArtist: {
    collums: ['name', 'coverImg'],
    values: ['updated', 'test'],
  },
};

describe('1.Music - Service Database - Artists API', () => {
  beforeAll(async () => {
    await Artist.destroy({ truncate: true, force: true });
  });

  it('Can create artist', async (done) => {
    const res = await request(app).post('/api/artists').send(mock.artist).expect(200);
    const anotherRes = await request(app).post('/api/artists').send(mock.anotherArtist).expect(200);
    expect(res.text).toBe('Posted new artist');
    expect(anotherRes.text).toBe('Posted new artist');
    const databaseValue = await Artist.findAll({
      where: {
        name: mock.artist.values[0],
      },
    });
    expect(databaseValue[0].name).toBe(mock.artist.values[0]);
    const anotherDatabaseValue = await Artist.findAll({
      where: {
        name: mock.anotherArtist.values[0],
      },
    });
    expect(anotherDatabaseValue[0].name).toBe(mock.anotherArtist.values[0]);
    done();
  });

  it('Can get all artists', async (done) => {
    const res = await request(app).get('/api/artists').expect(200);
    const databaseValue = await Artist.findAll();
    expect(res.body.length).toBe(databaseValue.length);
    done();
  });

  it('Can find artist by id', async (done) => {
    const res = await request(app).get('/api/artists').expect(200);
    const { id } = res.body[0];
    const databaseValueById = await Artist.findByPk(id);
    const resById = await request(app).get(`/api/artists/artist_${id}`).expect(200);
    expect(resById.body.name).toBe(databaseValueById.name);
    done();
  });

  it('Can update artist', async (done) => {
    const res = await request(app).get('/api/artists').expect(200);
    const { id } = res.body[0];

    const udpate = await request(app).put(`/api/artists/${id}`).send(mock.updatedArtist).expect(200);
    expect(udpate.text).toBe('Updated artist');

    const databaseValueById = await Artist.findByPk(id);
    expect(databaseValueById.name).not.toBe(res.body[0].name);

    const resById = await request(app).get(`/api/artists/artist_${id}`).expect(200);
    expect(resById.body.name).toBe(databaseValueById.name);
    done();
  });

  it('Can find artist by id', async (done) => {
    const res = await request(app).get('/api/artists').expect(200);
    const { id } = res.body[0];
    const afteDelete = await request(app).delete(`/api/artists/${id}`).expect(200);
    expect(afteDelete.text).toBe('Deleted artist');
    const afterDeleteGetAll = await request(app).get('/api/artists').expect(200);
    expect(afterDeleteGetAll.length).not.toBe(res.body.length);
    done();
  });
});
