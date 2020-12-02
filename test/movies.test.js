var { sequelize, Movies, moviegenere } = require('../config/sequelize');

const nextMovieId = 4;

beforeAll(async () => {
  await sequelize.sync();
});

test('create movie', async () => {
  expect.assertions(1);
  const movie = await Movies.create({
    name:         "Test Movie",
    description:  "Test Description",
    releaseDate:  "2021-01-15T00:00:00.000Z",
    duration:     10,
    rating:       4,
  });
  expect(movie.id).toEqual(nextMovieId);
});

test('get movie', async () => {
  expect.assertions(5);
  const movie = await Movies.findByPk(nextMovieId);
  expect(movie.name).toEqual('Test Movie');
  expect(movie.description).toEqual('Test Description');
  expect(movie.releaseDate).toEqual('2021-01-15');
  expect(movie.duration).toEqual(10);
  expect(movie.rating).toEqual(4);
});

test('delete movie', async () => {
  expect.assertions(1);
  await Movies.destroy({
      where: {
          id: nextMovieId
      }
  });
  const movie = await Movies.findByPk(nextMovieId);
  expect(movie).toBeNull();
});

afterAll(async () => {
  await sequelize.close();
});