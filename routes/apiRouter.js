import express from 'express';
import estudianteRoutes from './api/estudianteRoutes.js';
import asistenciaRoutes from './api/asistenciaRoutes.js';
import uploadRoutes from './api/upload.js';

const router = express.Router();

router.use('/estudiantes',estudianteRoutes);
router.use('/asistencias',asistenciaRoutes);
router.use('/upload',uploadRoutes);

export default router;

