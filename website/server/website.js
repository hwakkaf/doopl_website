import { strapi } from '@strapi/client';
import dotenv from 'dotenv';

await dotenv.config();

// const { default: baseData } = await import('./lib/cache-base-data.js');
await import('./lib/site-server.js');

await import('./site/dynamic/pages/faqs/faqs.js');