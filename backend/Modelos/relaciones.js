const Usuario = require('./Usuario');
const Mascota = require('./Mascota');
const SolicitudAdopcion = require('./SolicitudAdopcion');

// Un usuario puede tener muchas mascotas (relación "uno a muchos")
Usuario.hasMany(Mascota, {
  foreignKey: 'dueñoId',
});
Mascota.belongsTo(Usuario, {
  foreignKey: 'dueñoId',
});

// Un usuario (como adoptante) puede hacer muchas solicitudes de adopción
Usuario.hasMany(SolicitudAdopcion, {
  foreignKey: 'adoptanteId',
});
SolicitudAdopcion.belongsTo(Usuario, {
  foreignKey: 'adoptanteId', 
  as: 'adoptante'
});

// Una mascota puede tener muchas solicitudes de adopción
Mascota.hasMany(SolicitudAdopcion, {
  foreignKey: 'mascotaId',
});
SolicitudAdopcion.belongsTo(Mascota, {
  foreignKey: 'mascotaId',
  as: 'mascota'
});