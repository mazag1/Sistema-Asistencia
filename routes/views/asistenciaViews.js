import express from 'express';
import { asistenciaController } from '../../controllers/asistenciaController.js';

const router = express.Router();

// Vista de lista de asistencias
router.get('/asistencias', async (req, res) => {
    try {
        const asistencias = await asistenciaController.obtenerListaAsistencias(req, res);
        res.render('asistencias/listar', { asistencias });
    } catch (error) {
        res.status(500).send('Error al cargar la vista de asistencias');
    }
});

// Vista para registrar asistencia
router.get('/asistencias/registrar', (req, res) => {
    res.render('asistencias/registrar');
});

export default router;
