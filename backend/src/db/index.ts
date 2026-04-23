import { Pool } from 'pg';

//just read straight from env - root .env gets loaded by docker-compose
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'brimble',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'derapassword',
  max: 20,     //connection pool size - might need to bump this later
});

// Test connection on startup
pool.on('connect', () => {
  console.log('Connected to Postgres');
});

pool.on('error', (err) => {
  console.error('Unexpected Postgres error:', err);
  process.exit(-1); //if DB dies, just crash - docker will restart us
});

export default pool;