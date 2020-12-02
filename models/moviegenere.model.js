module.exports = (sequelize, DataTypes) => {
  const MoviesGenere = sequelize.define('moviegenere', {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
    },
    movieId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    genereId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });

  return MoviesGenere;
};