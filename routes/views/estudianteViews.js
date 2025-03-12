import express from 'express';
import estudianteController from '../../controllers/estudianteController.js';

const router = express.Router();

// Vista de lista de estudiantes
router.get('/', async (req, res) => {
    try {
        res.render('estudiantes/listar', { dataUrl: '/api/estudiantes' }, (err, contenido) => {
            if (err) {
                console.error('Error al renderizar listar.ejs:', err);
                return res.status(500).send('Error interno del servidor');
            }
            res.render('layouts/layout', {
                titulo: 'Estudiantes',
                contenido
            });
        });
    } catch (error) {
        res.status(500).send('Error al cargar la vista de estudiantes');
    }
});

// 🆕 Vista para crear un estudiante
router.get('/crear', async (req, res) => {
    try {
        // Renderizar el formulario y pasarlo como contenido
        res.render('estudiantes/formulario', { estudiante: null }, (err, contenido) => {
            if (err) {
                console.error('Error al renderizar formulario.ejs:', err);
                return res.status(500).send('Error interno del servidor');
            }

            // Luego, renderizar el layout con el contenido del formulario
            res.render('layouts/layout', {
                titulo: 'Crear Estudiante',
                contenido,  // Aquí pasamos el contenido del formulario
            });
        });
    } catch (error) {
        console.error('Error al obtener estudiante:', error);
        res.status(500).send('Error al cargar la vista de edición');
    }
});

// Vista para editar un estudiante
router.get('/editar/:id', async (req, res) => {
    try {
        const { id } = req.params;  // Obtener el ID desde la URL
        const estudiante = await estudianteController.obtenerEstudiantePorId(id);

        if (!estudiante) {
            return res.status(404).send('Estudiante no encontrado');
        }

        // Renderizar el formulario y pasarlo como contenido
        res.render('estudiantes/formulario', { estudiante }, (err, contenido) => {
            if (err) {
                console.error('Error al renderizar formulario.ejs:', err);
                return res.status(500).send('Error interno del servidor');
            }

            // Luego, renderizar el layout con el contenido del formulario
            res.render('layouts/layout', {
                titulo: 'Editar Estudiante',
                contenido,  // Aquí pasamos el contenido del formulario
            });
        });
    } catch (error) {
        console.error('Error al obtener estudiante:', error);
        res.status(500).send('Error al cargar la vista de edición');
    }
});


export default router;
