// This file connects to your Cloudflare R2 storage
import { S3Client } from '@aws-sdk/client-s3';

// Check if all required environment variables exist
if (!process.env.CLOUDFLARE_R2_ACCESS_KEY_ID) {
  throw new Error('Missing env.CLOUDFLARE_R2_ACCESS_KEY_ID');
}
if (!process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY) {
  throw new Error('Missing env.CLOUDFLARE_R2_SECRET_ACCESS_KEY');
}
if (!process.env.CLOUDFLARE_R2_ENDPOINT) {
  throw new Error('Missing env.CLOUDFLARE_R2_ENDPOINT');
}

// Create the client that talks to Cloudflare R2
export const r2Client = new S3Client({
  region: 'auto', // Cloudflare uses 'auto'
  endpoint: process.env.CLOUDFLARE_R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY,
  },
});

// Your bucket name (the folder where videos are stored)
export const BUCKET_NAME = process.env.CLOUDFLARE_R2_BUCKET_NAME || 'videos';
