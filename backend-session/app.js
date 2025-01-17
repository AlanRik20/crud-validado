
import cors from 'cors';
import express from 'express';
import session from 'express-session';
import morgan from 'morgan';
import path from 'path';

import { PORT, SessionConfig } from './config.js';

import router from './routes/user.routes.js'

const app = express();

const __dirname = path.resolve();

// Middlewares 
app.use(cors({ // Permitir solicitudes desde el front-end
    origin: [
        'http://localhost:5500',
        'http://localhost:3000',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true // Habilitar envío de cookies
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(SessionConfig));

app.use(router)

// Ruta para manejar el inicio de sesión
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}/`));
