// test/truncate.js
import map from 'lodash/map';
import models from '../models';

export default async function truncate() {
  return await Promise.all(
    map(Object.keys(models), (key) => {
      if (['sequelize', 'Sequelize'].includes(key)) return null;
      return models[key].destroy({ where: {}, force: true });
    }),
  );
}
