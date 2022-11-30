const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "post",
    {
      idUser: {
        type: DataTypes.STRING,
      },
      nameUser: {
        type: DataTypes.STRING,
      },
      phoneNumber: {
        type: DataTypes.FLOAT,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rangePrice: {
        type: DataTypes.STRING,
      },
      location: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    }
  );
};
