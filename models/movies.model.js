module.exports = (sequelize, DataTypes) => {
  const Movies = sequelize.define('Movies', {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
      releaseDate: {
        type: DataTypes.DATE,
        allowNull: true
    },
      duration: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
      createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
      },
  });

  return Movies;
};