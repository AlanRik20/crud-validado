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