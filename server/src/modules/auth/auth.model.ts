import { pool } from "../../configs/database.config.js";
import { IUser } from "./auth.types.js";

export const findUserByUsername = async (username: string): Promise<IUser | null> => {
    const result = await pool.query(
        `SELECT * FROM users WHERE username = $1`,
        [username]
    );
    return result.rows[0] || null;
};

export const createUser = async (
    employeeId: number,
    username: string,
    hash: string
): Promise<IUser> => {
    const result = await pool.query(
        `INSERT INTO users (employee_id, username, password_hash)
     VALUES ($1, $2, $3)
     RETURNING *`,
        [employeeId, username, hash]
    );
    return result.rows[0];
};