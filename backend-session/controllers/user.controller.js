import { database } from '../db/database.js'


export const loginVerify = async (req, res) => {
    const { username, password } = req.body;

    try {
        const conex = await database();

        // Consulta para buscar el usuario con el username y password proporcionados
        const [rows] = await conex.execute('SELECT id, username FROM users WHERE username = ? AND password = ?', [username, password]);

        if (rows.length > 0) {
            const user = rows[0];

            // Guardar información del usuario en la sesión
            req.session.userId = user.id;
            req.session.username = user.username;

            return res.json({
                message: 'Inicio de sesión exitoso',
                user: { id: user.id, username: user.username }
            });
        } else {
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }
    } catch (error) {
        console.error('Error en el inicio de sesión:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const CreateSession = async (req, res) => {
    try {
        
        if (req.session.userId) {
            return res.json({
                loggedIn: true,
                user: { id: req.session.userId, username: req.session.username }
            });
        } else {
            return res.status(401).json({ loggedIn: false, message: 'No hay sesión activa' });
        }

    } catch {

    }
}

// app.get('/session', (req, res) => {
// });

// // Ruta para cerrar la sesión
// app.post('/logout', (req, res) => {
//     console.log(req.session)
//     req.session.destroy(err => {
//         if (err) {
//             return res.status(500).json({ message: 'Error al cerrar la sesión' });
//         }
//         res.clearCookie('connect.sid'); // Nombre de cookie por defecto para express-session
//         return res.json({ message: 'Sesión cerrada exitosamente' });
//     });
// });
