import { asistenciaService } from '../services/asistenciaService.js';

export const asistenciaController = {
    async registrarAsistencias(req, res) {
        try {
            const { dni, nombre, apellido, grado, seccion } = req.body;
            await asistenciaService.registrarAsistencia(dni, nombre, apellido, grado, seccion);
            res.json({ success: true, message: 'Asistencia registrada con éxito' });
        } catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    },

    async obtenerListaAsistencias(req, res) {
        try {
            const asistencias = await asistenciaService.obtenerAsistencias();
            res.render('asistencia', { asistencias });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Error al obtener asistencias' });
        }
    }
};
