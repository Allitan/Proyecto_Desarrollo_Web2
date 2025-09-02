const { DataTypes } = require('sequelize');
const sequelize = require('../Conexion/database');

const Usuario = sequelize.define('usuarios', {
    id_usuario:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    }, 
    nombre :{
        type: DataTypes.STRING,
        allowNull: false
    },
    email :{
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    contraseña:{
        type: DataTypes.STRING,
        allowNull: false
    },
    esAdoptante :{
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    esDueño:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
},
    {
        tableName: 'usuarios',
        timestamps: true
    }
)

module.exports=Usuario;