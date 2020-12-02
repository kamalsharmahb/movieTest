var { sequelize, Genere } = require("../config/sequelize");

const nextGenereId = 5;

beforeAll(async () => {
  await sequelize.sync();
});

test('create Genere', async () => {
  expect.assertions(1);
  const genere = await Genere.create({
      Name: 'G-Name',
      Description: 'Desc'
  });
  expect(genere.GenereId).toEqual(nextGenereId);
});

test('get all genere', async () => {
  expect.assertions(2);
  const genere = await Genere.findByPk(nextGenereId);
  expect(genere.Name).toEqual('G-Name');
  expect(genere.Description).toEqual('Desc');
});

afterAll(async () => {
  await sequelize.close();
});