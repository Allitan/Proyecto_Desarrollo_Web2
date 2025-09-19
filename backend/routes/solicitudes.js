const express = require('express');
const router = express.Router();
const SolicitudAdopcion = require('../Modelos/SolicitudAdopcion');
const Mascota = require('../Modelos/Mascota');
const Usuario = require('../Modelos/Usuario');
const { verificarToken, esAdoptante, esDueño } = require('../middleware/auth');

// ➡️ RUTA CORREGIDA: Crear una nueva solicitud de adopción
router.post('/', verificarToken, esAdoptante, async (req, res) => {
    try {
        // Usa req.usuario.id_usuario según tu modelo de datos
        const nuevaSolicitud = await SolicitudAdopcion.create({ ...req.body, adoptanteId: req.usuario.id_usuario });
        res.status(201).json({ mensaje: 'Solicitud creada exitosamente', data: nuevaSolicitud });
    } catch (error) {
        console.error('Error al crear solicitud:', error);
        res.status(500).json({ mensaje: 'Error al crear solicitud', error: error.message });
    }
});

// ➡️ RUTA CORREGIDA: Obtener todas las solicitudes enviadas por un adoptante
router.get('/mis-solicitudes', verificarToken, esAdoptante, async (req, res) => {
    try {
        const solicitudes = await SolicitudAdopcion.findAll({
            where: { adoptanteId: req.usuario.id_usuario },
            // Incluye el modelo Mascota para poder mostrar la información en el dashboard
            include: [{ model: Mascota, as: 'mascota' }]
        });
        res.status(200).json(solicitudes);
    } catch (error) {
        console.error('Error al obtener sus solicitudes:', error);
        res.status(500).json({ mensaje: 'Error al obtener sus solicitudes', error: error.message });
    }
});

// ➡️ RUTA CORREGIDA: Obtener solicitudes recibidas por un dueño
router.get('/duenio', verificarToken, esDueño, async (req, res) => {
    try {
        const solicitudes = await SolicitudAdopcion.findAll({
            // Trae solo las solicitudes de las mascotas que pertenecen al dueño logueado
            include: [
                {
                    model: Mascota,
                    as: 'mascota',
                    where: { dueñoId: req.usuario.id_usuario }
                },
                {
                    // Incluye los datos del adoptante para mostrarlos en el dashboard
                    model: Usuario,
                    as: 'adoptante'
                }
            ]
        });
        res.status(200).json(solicitudes);
    } catch (error) {
        console.error('Error al obtener las solicitudes para el dueño:', error);
        res.status(500).json({ mensaje: 'Error al obtener las solicitudes para el dueño', error: error.message });
    }
});

// ➡️ RUTA CORREGIDA: Actualizar el estado de una solicitud (Aceptar/Rechazar)
router.put('/:id/respuesta', verificarToken, esDueño, async (req, res) => {
    try {
        const estado = req.body.estado.toLowerCase();
        const solicitud = await SolicitudAdopcion.findByPk(req.params.id, {
            include: [{ model: Mascota, as:'mascota' }]
        });

        if (!solicitud) {
            return res.status(404).json({ mensaje: 'Solicitud no encontrada.' });
        }

        if (solicitud.mascota.dueñoId !== req.usuario.id_usuario) {
            return res.status(403).json({ mensaje: 'No tiene permiso para responder a esta solicitud.' });
        }

        await solicitud.update({ estado });
        res.status(200).json({ mensaje: `Solicitud ${estado} con éxito.` });

    } catch (error) {
        console.error('Error al responder a la solicitud:', error);
        res.status(500).json({ mensaje: 'Error al actualizar solicitud', error: error.message });
    }
});

// ➡️ RUTA CORREGIDA: Eliminar una solicitud de adopción
router.delete('/:id', verificarToken, esAdoptante, async (req, res) => {
    try {
        const filasEliminadas = await SolicitudAdopcion.destroy({
            where: {
                id: req.params.id,
                adoptanteId: req.usuario.id_usuario // Usa id_usuario
            }
        });

        if (filasEliminadas > 0) {
            res.status(200).json({ mensaje: 'Solicitud eliminada exitosamente' });
        } else {
            res.status(404).json({ mensaje: 'Solicitud no encontrada o no tiene permisos para eliminarla.' });
        }
    } catch (error) {
        console.error('Error al eliminar solicitud:', error);
        res.status(500).json({ mensaje: 'Error al eliminar solicitud', error: error.message });
    }
});

module.exports = router;