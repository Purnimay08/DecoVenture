import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  
  schema: './config/schema.js',
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://accounts:npg_VPsqJ3ga9oQi@ep-purple-mode-a5iaxo7c-pooler.us-east-2.aws.neon.tech/ai-room-redesign?sslmode=require',
  },
});
