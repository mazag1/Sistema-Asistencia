import express from 'express';
import estudianteRoutes from './api/estudianteRoutes.js';
import asistenciaRoutes from './api/asistenciaRoutes.js';

const router = express.Router();

router.use('estudiantes',estudianteRoutes);
router.use('asistencias',asistenciaRoutes);

export default router;

