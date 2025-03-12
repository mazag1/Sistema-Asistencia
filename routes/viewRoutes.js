import express from 'express';
import estudianteViews from './views/estudianteViews.js';
import asistenciaViews from './views/asistenciaViews.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', (err, contenido) => {
        if (err) {
            console.error('Error al renderizar index.ejs:', err);
            return res.status(500).send('Error interno del servidor');
        }
        res.render('layouts/layout', {
            titulo: 'Inicio',
            contenido 
        });
    });
})

router.use('/estudiantes', estudianteViews);
router.use(asistenciaViews);

export default router;

