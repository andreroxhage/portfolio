import { neon } from '@neondatabase/serverless';

if (!process.env.DATABASE_URL) {
  throw new Error('Missing env.DATABASE_URL');
}

const sql = neon(process.env.DATABASE_URL);

export { sql };
