const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ mensaje: 'Acceso denegado. No se proporcionó un token' });
    }

    try {
        const verificado = jwt.verify(token, 'TU_SECETO_SUPER_SEGURO');
        req.usuario = verificado; // ✅ Asigna directamente el objeto decodificado
        next();
    } catch (error) {
        res.status(400).json({ mensaje: 'Token inválido' });
    }
};

const esAdoptante = (req, res, next) => {
    if (req.usuario && req.usuario.esAdoptante) {
        next();
    } else {
        res.status(403).json({ mensaje: 'Acceso denegado. No tiene permiso para esta acción.' });
    }
};

const esDueño = (req, res, next) => {
    if (req.usuario && req.usuario.esDueño) {
        next();
    } else {
        res.status(403).json({ mensaje: 'Acceso denegado. No tiene permiso para esta acción.' });
    }
};

module.exports = { verificarToken, esAdoptante, esDueño };