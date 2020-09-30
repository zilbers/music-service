/**
 * @jest-environment node
 */
const request = require('supertest');
const {
  Artist, Album, Playlist, Song,
} = require('../models');
const app = require('../app');

const mock = {
  test: {
    collums: ['name', 'coverImg', 'artistId', 'albumId', 'youtubeLink'],
    values: ['test', 'coverImg', 1, 1, 'first link'],
  },
  anotherTest: {
    collums: ['name', 'coverImg', 'artistId', 'albumId', 'youtubeLink'],
    values: ['anotherTest', 'anotherCoverImg', 1, 1, 'second link'],
  },
  updatedTest: {
    collums: ['name', 'coverImg', 'artistId', 'albumId', 'youtubeLink'],
    values: ['updatedTest', 'updatedCoverImg', 1, 1, 'updated link'],
  },
  artist: {
    collums: ['name', 'coverImg', 'artistId', 'albumId', 'youtubeLink'],
    values: ['better', 'album', 1],
  },
};

const test = ['artist', 'album', 'playlist', 'song'];
const models = [Artist, Album, Playlist, Song];

test.forEach((typeOfTest, index) => {
  describe(`Music - Service Database - ${typeOfTest}s API`, () => {
    beforeAll(async () => {
      await models[index].destroy({ truncate: true, force: true });
      if (test !== 'artist') {
        await request(app).post('/api/artists').send(mock.artist).expect(200);
      }
    });

    it(`Can create ${typeOfTest}`, async (done) => {
      const res = await request(app).post(`/api/${typeOfTest}s`).send(mock.test).expect(200);
      const anotherRes = await request(app).post(`/api/${typeOfTest}s`).send(mock.anotherTest).expect(200);
      expect(res.text).toBe(`Posted new ${typeOfTest}`);
      expect(anotherRes.text).toBe(`Posted new ${typeOfTest}`);
      const databaseValue = await models[index].findAll({
        where: {
          name: mock.test.values[0],
        },
      });
      expect(databaseValue[0].name).toBe(mock.test.values[0]);
      const anotherDatabaseValue = await models[index].findAll({
        where: {
          name: mock.anotherTest.values[0],
        },
      });
      expect(anotherDatabaseValue[0].name).toBe(mock.anotherTest.values[0]);
      done();
    });

    it(`Can get all ${typeOfTest}s`, async (done) => {
      const res = await request(app).get(`/api/${typeOfTest}s`).expect(200);
      const databaseValue = await models[index].findAll();
      expect(res.body.length).toBe(databaseValue.length);
      done();
    });

    it(`Can find ${typeOfTest} by id`, async (done) => {
      const res = await request(app).get(`/api/${typeOfTest}s`).expect(200);
      const { id } = res.body[0];
      const databaseValueById = await models[index].findByPk(id);
      const resById = await request(app).get(`/api/${typeOfTest}s/${typeOfTest}_${id}`).expect(200);
      expect(resById.body.name).toBe(databaseValueById.name);
      done();
    });

    it(`Can update ${typeOfTest}`, async (done) => {
      const res = await request(app).get(`/api/${typeOfTest}s`).expect(200);
      const { id } = res.body[0];

      const udpate = await request(app).put(`/api/${typeOfTest}s/${id}`).send(mock.updatedTest).expect(200);
      expect(udpate.text).toBe(`Updated ${typeOfTest}`);

      const databaseValueById = await models[index].findByPk(id);
      expect(databaseValueById.name).not.toBe(res.body[0].name);

      const resById = await request(app).get(`/api/${typeOfTest}s/${typeOfTest}_${id}`).expect(200);
      expect(resById.body.name).toBe(databaseValueById.name);
      done();
    });

    it(`Can find ${typeOfTest} by id`, async (done) => {
      const res = await request(app).get(`/api/${typeOfTest}s`).expect(200);
      const { id } = res.body[0];
      const afteDelete = await request(app).delete(`/api/${typeOfTest}s/${id}`).expect(200);
      expect(afteDelete.text).toBe(`Deleted ${typeOfTest}`);
      const afterDeleteGetAll = await request(app).get(`/api/${typeOfTest}s`).expect(200);
      expect(afterDeleteGetAll.length).not.toBe(res.body.length);
      done();
    });
  });
});
