import { createConnection } from "mysql2/promise";

export const database = async () => {
    try {
        const conex = await createConnection({
            host: "localhost",
            user: "root",
            database: "db_system"
        });
        console.log("Conexión exitosa");
        return conex;
    } catch (error) {
        throw error;
    }
};

export const PORT = process.env.PORT || 4000;


export const SessionConfig={
    secret: 'mi_secreto',
    resave: false,
    saveUninitialized: true,
    cookie: { 
        secure: false, // true solo si usas HTTPS
        httpOnly: true, // evita acceso a cookie desde JavaScript del cliente
        // sameSite: 'lax' // permite envío de cookies en navegadores modernos
    }
}