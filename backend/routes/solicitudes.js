const express = require('express');
const router = express.Router();
const SolicitudAdopcion = require('../Modelos/SolicitudAdopcion');
const Mascota = require('../Modelos/Mascota');
const Usuario = require('../Modelos/Usuario');
const verificarToken = require('../middleware/auth');

// este es para verificar si el usuario es un adoptantee
const esAdoptante = (req, res, next) => {
    if (req.usuario && req.usuario.esAdoptante) {
        next();
    } else {
        res.status(403).json({ mensaje: 'Acceso denegado. No tiene permiso para esta accion' });
    }
};

// esto es para crear una nueva solicitud de adopcionn
router.post('/solicitud', verificarToken, esAdoptante, async (req, res) => {
    try {
        const { mascotaId } = req.body;
        const adoptanteId = req.usuario.id_usuario;

        const mascota = await Mascota.findByPk(mascotaId);
        if (!mascota) {
            return res.status(404).json({ mensaje: 'Mascota no encontrada' });
        }
        
        const nuevaSolicitud = await SolicitudAdopcion.create({ 
            adoptanteId, 
            mascotaId 
        });

        const dueñoId = mascota.dueñoId;
        req.io.to(dueñoId).emit('nueva_solicitud', {
            mensaje: `Nueva solicitud de adopción para ${mascota.nombre}`,
            solicitud: nuevaSolicitud,
            mascota: mascota
        });

        res.status(201).json({ mensaje: 'Solicitud creada exitosamente', data: nuevaSolicitud });

    } catch (error) {
        console.error('Error al crear solicitud:', error);
        res.status(500).json({ mensaje: 'Error al crear solicitud', error: error.message });
    }
});

// esta es la ruta para ver u obtener las solicitudes que el dueño ha recibido poe
router.get('/solicitud/duenio', verificarToken, async (req, res) => {
    try {
        if (!req.usuario.esDueño) {
            return res.status(403).json({ mensaje: 'Acceso denegado. Solo los dueños pueden ver sus solicitudes.' });
        }

        const solicitudes = await SolicitudAdopcion.findAll({
            include: [
                {
                    model: Mascota,
                    as: 'mascota',
                    where: { dueñoId: req.usuario.id }, // <-- ¡CORREGIDO!
                    include: [{
                        model: Usuario,
                        as: 'usuario',
                        attributes: ['id_usuario', 'nombre', 'email']
                    }]
                },
                {
                    model: Usuario,
                    as: 'adoptante',
                    attributes: ['id_usuario', 'nombre', 'email']
                }
            ]
        });

        res.status(200).json(solicitudes);
    } catch (error) {
        console.error('Error al obtener las solicitudes del dueño:', error);
        res.status(500).json({ mensaje: 'Error al obtener sus solicitudes', error: error.message });
    }
});

// con este es para obtener las solicitudes que un adoptante ha enviado
router.get('/solicitud/mis-solicitudes', verificarToken, esAdoptante, async (req, res) => {
    try {
        const adoptanteId = req.usuario.id_usuario;

        const solicitudes = await SolicitudAdopcion.findAll({
            where: { adoptanteId },
            include: [{
                model: Mascota,
                as: 'mascota',
                attributes: ['id_mascota', 'nombre', 'especie', 'raza', 'foto', 'dueñoId']
            }]
        });
        res.status(200).json(solicitudes);
    } catch (error) {
        console.error('Error al obtener las solicitudes del adoptante:', error);
        res.status(500).json({ mensaje: 'Error al obtener sus solicitudes', error: error.message });
    }
});

// este es para actualizar el estado de una solicitud, este solo es para el dueño claramente
router.put('/solicitud/:id/respuesta', verificarToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { estado } = req.body;
        const dueñoId = req.usuario.id;

        const solicitud = await SolicitudAdopcion.findByPk(id, { include: [{ model: Mascota, as: 'mascota' }] });

        if (!solicitud || solicitud.mascota.dueñoId !== dueñoId) {
            return res.status(404).json({ mensaje: 'Solicitud no encontrada o no tiene permisos.' });
        }

        if (solicitud.estado !== 'pendiente') {
            return res.status(400).json({ mensaje: 'La solicitud ya ha sido procesada.' });
        }

        await solicitud.update({ estado });

        req.io.to(solicitud.adoptanteId).emit('respuesta_solicitud', {
            mensaje: `Tu solicitud para adoptar a ${solicitud.mascota.nombre} ha sido ${estado}.`,
            estado: estado,
            mascota: solicitud.mascota,
            dueño: req.usuario
        });

        if (estado === 'aceptada') {
            await Mascota.update({ estado: 'adoptado' }, { where: { id_mascota: solicitud.mascotaId } });
        }

        res.status(200).json({ mensaje: `Solicitud ${estado} exitosamente` });
    } catch (error) {
        console.error('Error al actualizar la solicitud:', error);
        res.status(500).json({ mensaje: 'Error al procesar la solicitud', error: error.message });
    }
});

module.exports = router;