import multer from 'multer';
import path from 'path';

// Configurar multer para guardar imágenes en `public/uploads`
const storage = multer.diskStorage({
    destination: './public/uploads',
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Renombrar archivo con timestamp
    }
});

const upload = multer({ storage });

export default upload;
