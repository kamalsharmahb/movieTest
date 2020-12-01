module.exports = (sequelize, DataTypes) => {
  const MoviesGenere = sequelize.define('moviegeneres', {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      allowNull: false
    },
    movieId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    GenereId: {
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