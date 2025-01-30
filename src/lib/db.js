import { Pool } from 'pg';
import { env } from './env';

let pool;

if (!pool) {
  pool = new Pool({
    connectionString: env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });
}

export { pool }; 