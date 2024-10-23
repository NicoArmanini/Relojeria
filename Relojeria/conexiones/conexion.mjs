import pg from "pg";

const pool = new pg.Pool({
    host: 'localhost',
    port: 5432,
    user: 'root',
    password: 'pass',
    database: 'goodtime'
})

export default pool     