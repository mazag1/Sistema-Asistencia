import express from 'express';
import estudianteController from '../../controllers/estudianteController.js';

const router = express.Router();

// Vista de lista de estudiantes
router.get('/estudiantes', async (req, res) => {
    try {
        res.render('estudiantes/listar',{ dataUrl: '/api/estudiantes' }, (err, contenido) => {
        if (err) {
            console.error('Error al renderizar index.ejs:', err);
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

// Vista para crear un estudiante
router.get('/estudiantes/crear', (req, res) => {
    try {
        res.render('estudiantes/formulario',{ dataUrl: '/api/estudiantes' }, (err, contenido) => {
        if (err) {
            console.error('Error al renderizar index.ejs:', err);
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

// Vista para editar un estudiante
router.get('/estudiantes/editar/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const estudiante = await estudianteController.obtenerEstudiantePorId(id);

        if (!estudiante) {
            return res.status(404).send('Estudiante no encontrado');
        }

        res.render('estudiantes/form', { estudiante }, (err, contenido) => {
            if (err) {
                console.error('Error al renderizar form.ejs:', err);
                return res.status(500).send('Error interno del servidor');
            }
            res.render('layouts/layout', {
                titulo: 'Editar Estudiante',
                contenido
            });
        });
    } catch (error) {
        console.error('Error al obtener estudiante:', error);
        res.status(500).send('Error al cargar la vista de edición');
    }
});

export default router;
