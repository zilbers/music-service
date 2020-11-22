const { Router } = require('express');
const { Client } = require('@elastic/elasticsearch');
const { Op } = require('sequelize');
const { Song, Album, Playlist, Artist } = require('../models');

const client = new Client({
  cloud: {
    id: process.env.ELASTIC_CLOUD_ID,
  },
  auth: {
    username: process.env.ELASTIC_USERNAME,
    password: process.env.ELASTIC_PASSWORD,
  },
});

const songsProps = {
  id: { type: 'integer' },
  name: { type: 'text' },
  artistId: { type: 'integer' },
  youtubeLink: { type: 'text' },
};

async function bulkCreate(index, data, properties) {
  await client.indices.create(
    {
      index,
      body: {
        mappings: {
          properties: {
            ...properties,
          },
        },
      },
    },
    { ignore: [400] }
  );

  const body = data.flatMap((doc) => [{ index: { _index: index } }, doc]);

  const { body: bulkResponse } = await client.bulk({ refresh: true, body });

  if (bulkResponse.errors) {
    const erroredDocuments = [];
    // The items array has the same order of the dataset we just indexed.
    // The presence of the `error` key indicates that the operation
    // that we did for the document has failed.
    bulkResponse.items.forEach((action, i) => {
      const operation = Object.keys(action)[0];
      if (action[operation].error) {
        erroredDocuments.push({
          // If the status is 429 it means that you can retry the document,
          // otherwise it's very likely a mapping error, and you should
          // fix the document before to try it again.
          status: action[operation].status,
          error: action[operation].error,
          operation: body[i * 2],
          document: body[i * 2 + 1],
        });
      }
    });
    console.log(erroredDocuments);
  }

  const { body: count } = await client.count({ index });
  console.log(count);
  return bulkResponse;
}

const searchRouter = Router();

searchRouter.get('/', async (req, res) => {
  try {
    const { filter } = req.query;
    const { body: result } = await client.search(
      {
        index: 'songs',
        body: {
          query: {
            wildcard: {
              name: {
                value: `*${filter}*`,
                boost: 1.0,
                rewrite: 'constant_score',
              },
            },
          },
        },
      },
      {
        ignore: [404],
        maxRetries: 3,
      }
    );
    const sourceArr = result.hits.hits.map((item) => item._source);
    res.json(sourceArr);
  } catch (error) {
    res.json(error);
  }
  // const { filter } = req.query;
  // try {
  //   const filteredSongs = await Song.findAll({
  //     where: {
  //       name: {
  //         [Op.like]: `${filter}%`,
  //       },
  //     },
  //   });
  //   res.json(filteredSongs);
  // } catch (e) {
  //   res.status(500).send(e.message);
  // }
});

searchRouter.get('/test', async (req, res) => {
  const songs = await Song.findAll({
    attributes: ['id', 'name', 'artistId', 'youtubeLink'],
  });
  const resp = await bulkCreate('songs', songs, songsProps);
  res.json(resp);

  // const songsJSON = JSON.stringify(songs);
  // const resp = await bulkCreate('song', JSON.parse(songsJSON), sognsProps);
});

module.exports = searchRouter;
