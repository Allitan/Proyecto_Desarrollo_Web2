const express = require('express');
const path = require('path');
const Usuario = require('./models/Usuario');
const Mascota = require('./models/Mascota');
const SolicitudAdopcion = require('./models/SolicitudAdopcion');
const AdopcionService = require('./services/AdopcionService');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Ruta principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// === API ENDPOINTS ===

// Registrar usuario
app.post('/api/usuarios', async (req, res) => {
  try {
    const resultado = await AdopcionService.registrarUsuario(req.body);
    if (resultado.success) {
      res.status(201).json({ message: 'Usuario registrado exitosamente', id: resultado.id });
    } else {
      res.status(400).json({ error: resultado.message || resultado.error });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Autenticar usuario
app.post('/api/login', async (req, res) => {
  try {
    const { email, contraseña } = req.body;
    const resultado = await Usuario.authenticate(email, contraseña);
    
    if (resultado.success) {
      res.json({ 
        message: 'Login exitoso', 
        usuario: {
          id: resultado.usuario.id_usuario,
          nombre: resultado.usuario.nombre,
          email: resultado.usuario.email,
          esAdoptante: resultado.usuario.esAdoptante,
          esDueño: resultado.usuario.esDueño
        }
      });
    } else {
      res.status(401).json({ error: resultado.message });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Obtener mascotas disponibles
app.get('/api/mascotas', async (req, res) => {
  try {
    const filtros = req.query;
    const mascotas = await AdopcionService.buscarMascotas(filtros);
    res.json(mascotas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener mascotas' });
  }
});

// Registrar mascota
app.post('/api/mascotas', async (req, res) => {
  try {
    const resultado = await AdopcionService.registrarMascota(req.body);
    if (resultado.success) {
      res.status(201).json({ message: 'Mascota registrada exitosamente', id: resultado.id });
    } else {
      res.status(400).json({ error: resultado.error });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Obtener mascota por ID
app.get('/api/mascotas/:id', async (req, res) => {
  try {
    const mascota = await Mascota.findById(req.params.id);
    if (mascota) {
      res.json(mascota);
    } else {
      res.status(404).json({ error: 'Mascota no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Solicitar adopción
app.post('/api/adopcion/solicitar', async (req, res) => {
  try {
    const { adoptante_id, mascota_id } = req.body;
    const resultado = await AdopcionService.solicitarAdopcion(adoptante_id, mascota_id);
    
    if (resultado.success) {
      res.status(201).json({ message: 'Solicitud de adopción enviada exitosamente' });
    } else {
      res.status(400).json({ error: resultado.message });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Procesar solicitud de adopción
app.put('/api/adopcion/procesar/:id', async (req, res) => {
  try {
    const { estado, dueño_id } = req.body;
    const resultado = await AdopcionService.procesarSolicitud(req.params.id, estado, dueño_id);
    
    if (resultado.success) {
      res.json({ message: `Solicitud ${estado} exitosamente` });
    } else {
      res.status(400).json({ error: resultado.message });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Dashboard del usuario
app.get('/api/dashboard/:usuario_id', async (req, res) => {
  try {
    const data = await AdopcionService.getDashboardData(req.params.usuario_id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener datos del dashboard' });
  }
});

// Obtener todos los usuarios (para admin)
app.get('/api/usuarios', async (_req, res) => {
  try {
    const usuarios = await Usuario.getAll();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
});

// === DEMO ENDPOINTS ===

// Endpoint para probar la funcionalidad
app.get('/api/demo', async (req, res) => {
  try {
    console.log('=== DEMO DEL SISTEMA DE ADOPCIÓN ===');
    
    // Crear usuario de prueba
    const nuevoUsuario = await AdopcionService.registrarUsuario({
      nombre: 'Demo User',
      email: 'demo@example.com',
      contraseña: 'demo123',
      esAdoptante: true,
      esDueño: false
    });
    
    console.log('Usuario creado:', nuevoUsuario);
    
    // Obtener mascotas disponibles
    const mascotas = await Mascota.getAvailable();
    console.log('Mascotas disponibles:', mascotas.length);
    
    res.json({
      message: 'Demo ejecutado exitosamente',
      usuario: nuevoUsuario,
      mascotasDisponibles: mascotas.length
    });
    
  } catch (error) {
    console.error('Error en demo:', error);
    res.status(500).json({ error: 'Error en la demo' });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(` Servidor de adopción de mascotas ejecutándose en http://0.0.0.0:${PORT}`);
  console.log(' Endpoints disponibles:');
  console.log('   GET  /api/mascotas - Obtener mascotas disponibles');
  console.log('   POST /api/usuarios - Registrar usuario');
  console.log('   POST /api/login - Autenticar usuario');
  console.log('   POST /api/mascotas - Registrar mascota');
  console.log('   POST /api/adopcion/solicitar - Solicitar adopción');
  console.log('   GET  /api/demo - Ejecutar demo del sistema');
  console.log(' Asegúrate de configurar la base de datos MySQL primero');
});
