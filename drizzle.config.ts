import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

const rawUrl = process.env.DATABASE_URL || '';
const cleanUrl = rawUrl.replace(/\?schema=.*$/, '');

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: cleanUrl,
  },
});

