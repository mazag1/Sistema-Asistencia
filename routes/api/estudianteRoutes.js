import express from 'express';
import upload from '../../config/multer.js';
import estudianteController from '../../controllers/estudianteController.js';

const router = express.Router();

// Ruta para obtener todos los estudiantes
router.get('/', estudianteController.obtenerEstudiantes);

// Ruta para obtener un estudiante por ID
router.get('/:id', estudianteController.obtenerEstudiantePorId);

// Ruta para registrar un nuevo estudiante (con subida de imagen)
router.post('/', upload.single('foto'), estudianteController.registrarEstudiante);

// Ruta para actualizar un estudiante por ID (con subida de imagen opcional)
router.put('/:id', upload.single('foto'), estudianteController.actualizarEstudiante);

// Ruta para eliminar un estudiante por ID
router.delete('/:id', estudianteController.eliminarEstudiante);

export default router;

