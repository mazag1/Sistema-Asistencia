import express from 'express';
import estudianteController from '../../controllers/estudianteController.js';

const router = express.Router();

// Ruta para obtener todos los estudiantes
router.get('/', estudianteController.obtenerEstudiantes);

// Ruta para obtener un estudiante por ID
router.get('/:id', estudianteController.obtenerEstudiantePorId);

// Ruta para registrar un nuevo estudiante
router.post('/', estudianteController.registrarEstudiante);

// Ruta para actualizar un estudiante por ID
router.put('/:id', estudianteController.actualizarEstudiante);

// Ruta para eliminar un estudiante por ID
router.delete('/:id', estudianteController.eliminarEstudiante);

export default router;
