import { Router } from 'express';
import upload from '../../config/multer.js';

const router = Router();

// Ruta para subir imágenes
router.post('/subir-imagen', upload.single('foto'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No se subió ninguna imagen' });
    }
    res.json({ message: 'Imagen subida con éxito', file: req.file.filename });
});

export default router;
