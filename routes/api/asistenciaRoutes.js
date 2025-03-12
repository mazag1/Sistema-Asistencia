import express from 'express';
import { asistenciaController } from '../../controllers/asistenciaController.js';

const router = express.Router();

router.post('/registrar', asistenciaController.registrarAsistencias);
router.get('/listar', asistenciaController.obtenerListaAsistencias);

export default router;
