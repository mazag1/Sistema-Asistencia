import { crudUtils } from '../database/dbUtils.js';

export const asistenciaService = {
    async registrarAsistencia(dni, nombre, apellido, grado, seccion) {
        // Verificar si el usuario ya registró asistencia hoy
        const fechaHoy = new Date().toISOString().split('T')[0];

        const asistenciaExistente = await crudUtils.select('asistencias', {
            dni,
            fecha_solo_dia: fechaHoy
        });

        if (asistenciaExistente.length > 0) {
            throw new Error('Ya se encuentra registrado hoy.');
        }

        // Insertar nuevo registro
        return await crudUtils.insert('asistencias', {
            dni,
            nombre,
            apellido,
            grado,
            seccion
        });
    },

    async obtenerAsistencias() {
        return await crudUtils.select('asistencias');
    }
};