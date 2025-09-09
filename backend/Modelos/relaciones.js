const Usuario = require('./Usuario');
const Mascota = require('./Mascota');
const SolicitudAdopcion = require('./SolicitudAdopcion');

// Un usuario puede tener muchas mascotas (relación "uno a muchos")
Usuario.hasMany(Mascota, {
  foreignKey: 'dueñoId', // La clave foránea en la tabla 'mascotas'
});
Mascota.belongsTo(Usuario, {
  foreignKey: 'dueñoId', // La clave foránea en la tabla 'mascotas'
});

// Un usuario (como adoptante) puede hacer muchas solicitudes de adopción
Usuario.hasMany(SolicitudAdopcion, {
  foreignKey: 'adoptanteId', // La clave foránea en la tabla 'solicitudesAdopcion'
});
SolicitudAdopcion.belongsTo(Usuario, {
  foreignKey: 'adoptanteId', // La clave foránea en la tabla 'solicitudesAdopcion'
});

// Una mascota puede tener muchas solicitudes de adopción
Mascota.hasMany(SolicitudAdopcion, {
  foreignKey: 'mascotaId', // La clave foránea en la tabla 'solicitudesAdopcion'
});
SolicitudAdopcion.belongsTo(Mascota, {
  foreignKey: 'mascotaId', // La clave foránea en la tabla 'solicitudesAdopcion'
});