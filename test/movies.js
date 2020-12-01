const {sequelize, Movies, Genre} = require("../db/movies");

beforeAll(async () => {
  await db.sequelize.sync();
});

test('create movie', async () => {
  expect.assertions(1);
  const movie = await db.Person.create({
      id: 1,
      firstName: 'Bobbie',
      lastName: 'Draper'
  });
  expect(movie.id).toEqual(1);
});

test('get movie', async () => {
  expect.assertions(2);
  const movie = await db.Person.findByPk(1);
  expect(movie.firstName).toEqual('Bobbie');
  expect(movie.lastName).toEqual('Draper');
});

test('delete movie', async () => {
  expect.assertions(1);
  await db.Person.destroy({
      where: {
          id: 1
      }
  });
  const movie = await db.Person.findByPk(1);
  expect(movie).toBeNull();
});

afterAll(async () => {
  await db.sequelize.close();
});