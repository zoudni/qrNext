export const env = {
  DATABASE_URL: process.env.DATABASE_URL as string,
  CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY as string,
  // Add other env variables
}

// Validate env variables
if (!env.DATABASE_URL) {
  throw new Error('DATABASE_URL is required');
} 