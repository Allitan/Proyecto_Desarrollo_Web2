const express = require('express');
const router = express.Router();
const SolicitudAdopcion = require('../Modelos/SolicitudAdopcion');
const Mascota = require('../Modelos/Mascota');
const Usuario = require('../Modelos/Usuario');
const verificarToken = require('../middleware/auth');

const esAdoptante = (req, res, next) => {
    if(req.usuario && req.usuario.esAdoptante){
        next();
    }else{
        res.status(403).json({mensaje: 'Acceso denegado. No tiene permiso para esta accion'});
    }
};

// Crear una nueva solicitud de adopción
router.post('/solicitud', verificarToken, esAdoptante, async (req, res) => {
    try {
        const nuevaSolicitud = await SolicitudAdopcion.create({ ...req.body, adoptanteId: req.usuario.id });
        res.status(201).json({ mensaje: 'Solicitud creada exitosamente', data: nuevaSolicitud });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear solicitud', error: error.message });
    }
});

// Obtener todas las solicitudes de un adoptante
router.get('/solicitud/mis-solicitudes', verificarToken, esAdoptante, async (req, res) => {
    try {
        const solicitudes = await SolicitudAdopcion.findAll({ where: { adoptanteId: req.usuario.id } });
        res.status(200).json(solicitudes);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener sus solicitudes', error: error.message });
    }
});

// Actualizar el estado de una solicitud
router.put('/solicitud/:id', verificarToken, async (req, res) => {
    try {
        const [filasActualizadas] = await SolicitudAdopcion.update(req.body, { where: { id: req.params.id } });
        if (filasActualizadas > 0) {
            res.status(200).json({ mensaje: 'Solicitud actualizada exitosamente' });
        } else {
            res.status(404).json({ mensaje: 'Solicitud no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar solicitud', error: error.message });
    }
});

// Eliminar una solicitud de adopción
router.delete('/solicitud/:id', verificarToken, esAdoptante, async (req, res) => {
    try {
        const filasEliminadas = await SolicitudAdopcion.destroy({
            where: {
                id: req.params.id,
                adoptanteId: req.usuario.id // Verificación de propiedad
            }
        });

        if (filasEliminadas > 0) {
            res.status(200).json({ mensaje: 'Solicitud eliminada exitosamente' });
        } else {
            res.status(404).json({ mensaje: 'Solicitud no encontrada o no tiene permisos para eliminarla.' });
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar solicitud', error: error.message });
    }
});

module.exports = router;