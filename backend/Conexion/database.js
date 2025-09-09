const {Sequelize}= require('sequelize');

const sequelize = new Sequelize(
    'proyecto',
    'root-user',
    'root-contraseña Diego,20',
    {
        host:'localhost',
        port:3306,
        dialect:'mysql'
    }
)

sequelize.authenticate()
    .then(() => console.log('Conexion establecida'))
    .catch((error)=> console.log('Error de conexion' + error))

module.exports=sequelize;    