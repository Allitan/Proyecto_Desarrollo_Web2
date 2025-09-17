const { DataTypes } = require('sequelize');
const sequelize = require('../Conexion/database');
const Usuario = require('./Usuario');
const Mascota = require('./Mascota');

const SolicitudAdopcion = sequelize.define('solicitudes_adopcion', {
    id_solicitud: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    estado: {
        type: DataTypes.ENUM('pendiente', 'aceptada', 'rechazada'),
        defaultValue: 'pendiente',
        allowNull: false
    }
},
    {
        tableName: 'solicitudes_adopcion',
        timestamps: true
    }
);


SolicitudAdopcion.belongsTo(Usuario, {
    foreignKey: 'adoptanteId',
    as: 'adoptante'
});


SolicitudAdopcion.belongsTo(Mascota, {
    foreignKey: 'mascotaId',
    as: 'mascota'
});

module.exports = SolicitudAdopcion;