import { database } from '../config.js'

// INICIO DE SESIÓN
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

export const RegisterUser = async(req,res)=>{
    const {username, password} = req.body
    try {
        const conex= await database()

        const [userExist] = await conex.execute('SELECT id FROM users WHERE username = ?',[username])
        if(userExist.length>0){
            return res.status(400).json({ message: 'El nombre de usuario ya está en uso' });
        }

        const [consulta] = await conex.execute('INSERT INTO users (username, password) VALUES (?,?)',[username, password])

        return res.status(201).json({ message: 'Usuario registrado exitosamente' });

    } catch (err) {
        console.error('Error al conectar a la base de datos:', err);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
    
}
// CREAR UNA SESIÓN
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

// CERRAR SESIÓN
export const Logout = async(req,res)=>{

        req.session.destroy(err => {
            if (err) {
                return res.status(500).json({ message: 'Error al cerrar la sesión' });
            }
            res.clearCookie('connect.sid'); // Nombre de cookie por defecto para express-session
            return res.json({ message: 'Sesión cerrada exitosamente' });
        });
}

