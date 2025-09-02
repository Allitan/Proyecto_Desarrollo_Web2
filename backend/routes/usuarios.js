const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Usuario = require('../Modelos/Usuario');
const { where } = require('sequelize');
const jwt = require('jsonwebtoken');

router.post('/registro', async (req, res) => {
    try{
        const { nombre, email, contraseña, esAdoptante, esDueño }= req.body;

        const usuarioExistente = await Usuario.findOne({ where: {email}});
         if(usuarioExistente){
            return res.status(409).json({ mensaje:'El email ya esta registrado'});
         }

        const salt = await bcrypt.genSalt(10);
        const contraseñaEncriptada = await bcrypt.hash(contraseña, salt);

        const nuevoUsuario = await Usuario.create({
            nombre,
            email,
            contraseña: contraseñaEncriptada,
            esAdoptante,
            esDueño
        });

        res.status(201).json({ mensaje: 'Usuario registrado exitosamente', data: nuevoUsuario})
    }catch(error){
       res.status(500).json({ mensaje: 'Error al registrar el usuario', error: error.message }); 
    }
});

router.post('/login', async (req, res) =>{
    try{
        const { email, contraseña} = req.body;

        const usuario = await Usuario.findOne({where: {email}});

        if(!usuario){
            return res.status(404).json({mensaje: 'Email o contraseña incorrectos'})
        }

        const contraseñaValida = await bcrypt.compare(contraseña, usuario.contraseña);

        if(!contraseñaValida){
            return res.status(401).json({mensaje: 'Email o contraseña incorrectos'});
        }

        const payload ={
            id: usuario.id_usuario,
            esAdoptante: usuario.esAdoptante,
            esDueño: usuario.esDueño
        }

        const token = jwt.sign(payload, 'TU_SECETO_SUPER_SEGURO', {expiresIn: '1h'});

    
        res.status(200).json({mensaje: 'Inicio de sesion exitoso', token: token, data: usuario});
    }catch(error){
        res.status(500).json({mensaje: 'Error en el inicio de sesion', error: error.message})
    }
});

module.exports=router;

