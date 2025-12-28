import { Pool } from "pg";

export const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: 5432,
    max: 10,                        // max number of clients in the pool
    idleTimeoutMillis: 30000,       // close idle clients after 30 seconds
    //connectionTimeoutMillis: 2000,  // close clients after 2 seconds if not used
});