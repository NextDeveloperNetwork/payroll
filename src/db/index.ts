import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';
import * as schema from './schema';

const { Pool } = pg;

const rawUrl = process.env.DATABASE_URL || '';
const cleanConnectionString = rawUrl.replace(/\?schema=.*$/, '');

export const pool = new Pool({
  connectionString: cleanConnectionString,
});

export const db = drizzle(pool, { schema });

