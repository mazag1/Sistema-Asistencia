import express from 'express';  // Framework web
import dotenv from 'dotenv';    // Variables de entorno
import cors from 'cors';    // Cross-Origin Resource Sharing
import morgan from 'morgan';    // Logger
import path from 'path';    // CommonJS
import { fileURLToPath } from 'url'; // ES Modules
import apiRouter from './routes/apiRouter.js'; // Rutas de API
import viewRoutes from './routes/viewRoutes.js'; // Rutas de vistas

dotenv.config();

// Configurar __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Configurar EJS como motor de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public'))); // Archivos estáticos
app.use('/node_modules', express.static(__dirname + '/node_modules'));


// Rutas de API (solo datos JSON)
app.use('/api/', apiRouter);

// Rutas de vistas (EJS)
app.use('/', viewRoutes);

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en: http://localhost:${PORT}`);
});
