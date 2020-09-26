// test/factories/user.js
import faker from 'faker';
import models from '../../models';

/**
 * Generate an object which container attributes needed
 * to successfully create a user instance.
 *
 * @param  {Object} props Properties to use for the user.
 *
 * @return {Object}       An object to build the user from.
 */
const data = async (props = {}) => {
  const defaultProps = {
    email: faker.internet.email(),
    password: faker.internet.password(),
    isAdmin: 0,
  };
  return { ...defaultProps, ...props };
};

/**
 * Generates a user instance from the properties provided.
 *
 * @param  {Object} props Properties to use for the user.
 *
 * @return {Object}       A user instance
 */
export default async (props = {}) => models.User.create(await data(props));
