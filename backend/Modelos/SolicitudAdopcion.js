const { DataTypes } = require('sequelize');
const sequelize = require('../Conexion/database');

const SolicitudAdopcion = sequelize.define('solicitudesAdopcion', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    adoptanteId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    mascotaId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    estado: {
        type: DataTypes.ENUM('pendiente', 'aceptada', 'rechazada'),
        defaultValue: 'pendiente',
        allowNull: false
    }
}, {
    tableName: 'solicitudesAdopcion',
    timestamps: true
});

module.exports = SolicitudAdopcion;