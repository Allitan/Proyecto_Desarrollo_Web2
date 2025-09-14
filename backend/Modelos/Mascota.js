const { DataTypes } = require('sequelize');
const sequelize = require('../Conexion/database');

const Mascota = sequelize.define('mascotas', {
    id_mascota: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    especie: {
        type: DataTypes.STRING,
        allowNull: false
    },
    raza: {
        type: DataTypes.STRING,
        allowNull: true
    },
    edad: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    foto: {
        type: DataTypes.STRING,
        allowNull: true
    },
    estado: {
        type: DataTypes.ENUM('disponible', 'pendiente', 'adoptado'),
        defaultValue: 'disponible',
    },
    dueñoId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'mascotas',
    timestamps: true
});

module.exports = Mascota;