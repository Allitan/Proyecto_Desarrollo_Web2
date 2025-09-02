const express = require('express');
const router = express.Router();
const Mascota = require('../Modelos/Mascota');
const Usuario = require('../Modelos/Usuario');
const verificarToken = require('../middleware/auth');

const esDueño = (req, res, next) => {
    if(req.usuario && req.usuario.esDueño){
        next();
    }else{
        res.status(403).json({mensaje: 'Acceso denegado. No tiene permisos para esta accion'});
    }

};

// Obtener todas las mascotas
router.get('/mascota', async (req, res) => {
    try {
        const mascotas = await Mascota.findAll({ include: [{ model: Usuario, as: 'dueño' }] });
        res.status(200).json(mascotas);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener mascotas', error: error.message });
    }
});

// Crear una nueva mascota
router.post('/mascota', verificarToken, esDueño, async (req, res) => {
    try {
        const nuevaMascota = await Mascota.create({ ...req.body, dueñoId: req.usuario.id });
        res.status(201).json({ mensaje: 'Mascota publicada exitosamente', data: nuevaMascota });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear mascota', error: error.message });
    }
});

// Buscar mascotas por especie, raza, etc.
router.get('/mascota/buscar', async (req, res) => {
    try {
        const { especie, raza, estado } = req.query;
        const condiciones = {};

        if (especie) {
            condiciones.especie = especie;
        }
        if (raza) {
            condiciones.raza = raza;
        }
        if (estado) {
            condiciones.estado = estado;
        }

        const mascotas = await Mascota.findAll({
            where: condiciones,
            include: [{ model: Usuario, as: 'dueño' }]
        });

        if (mascotas.length > 0) {
            res.status(200).json(mascotas);
        } else {
            res.status(404).json({ mensaje: 'No se encontraron mascotas que coincidan con la búsqueda.' });
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al buscar mascotas', error: error.message });
    }
});

// Actualizar una mascota
router.put('/mascota/:id', verificarToken, esDueño, async (req, res) => {
    try {
        const [filasActualizadas] = await Mascota.update(req.body, { where: { id_mascota: req.params.id, dueñoId: req.usuario.id } });
        if (filasActualizadas > 0) {
            res.status(200).json({ mensaje: 'Mascota actualizada exitosamente' });
        } else {
            res.status(404).json({ mensaje: 'Mascota no encontrada o no tiene permisos para actualizarla.' });
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar mascota', error: error.message });
    }
});

// Eliminar una mascota
router.delete('/mascota/:id', verificarToken, esDueño, async (req, res) => {
    try {
        const filasEliminadas = await Mascota.destroy({ where: { id_mascota: req.params.id, dueñoId: req.usuario.id } });
        if (filasEliminadas > 0) {
            res.status(200).json({ mensaje: 'Mascota eliminada exitosamente' });
        } else {
            res.status(404).json({ mensaje: 'Mascota no encontrada o no tiene permisos para eliminarla.' });
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar mascota', error: error.message });
    }
});

module.exports = router;