const express = require('express');
const cors = require('cors');
const sequelize = require('./Conexion/database');
require('./Modelos/relaciones');

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

const usuariosRoutes = require('./routes/usuarios');
const mascotasRoutes = require('./routes/mascotas');
const solicutudesRoutes = require('./routes/solicitudes');

app.use('/api/usuarios', usuariosRoutes);
app.use('/api', mascotasRoutes);
app.use('/api', solicutudesRoutes);

sequelize.sync({ force: false})
    .then(()=> {
        app.listen(PORT, () => {
            console.log(`Servidor escuchando en el puerto ${PORT}`);
        })
    })
    .catch(error => {
        console.error('Error al sincronizar la base de datos:', error)
    })
