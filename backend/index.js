const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const cors = require('cors');
const sequelize = require('./Conexion/database');
require('./Modelos/relaciones');

const app = express();
const PORT = 5000;

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    req.io = io;
    next();
});

const usuariosRoutes = require('./routes/usuarios');
const mascotasRoutes = require('./routes/mascotas');
const solicutudesRoutes = require('./routes/solicitudes');

app.use('/api/usuarios', usuariosRoutes);
app.use('/api', mascotasRoutes);
app.use('/api', solicutudesRoutes);


io.on('connection', (socket) => {
    console.log(`Usuario conectado: ${socket.id}`);
 socket.on('join_room', (userId) => {
        socket.join(userId);
        console.log(`Usuario con ID ${socket.id} se unió a la sala ${userId}`);
    });
  socket.on('disconnect', () => {
        console.log('Usuario desconectado', socket.id);
    });
});


sequelize.sync({ force: false})
    .then(()=> {
        server.listen(PORT, () => {
            console.log(`Servidor escuchando en el puerto ${PORT}`);
        })
    })
    .catch(error => {
        console.error('Error al sincronizar la base de datos:', error)
    })
