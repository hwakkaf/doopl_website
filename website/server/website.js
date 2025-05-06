import { strapi } from '@strapi/client';
import dotenv from 'dotenv';
import path from 'path'

await dotenv.config();

process.env.WEBSITE_STATIC_FOLDER = process.env.WEBSITE_STATIC_FOLDER || '../static/example';
process.env.PORT = parseInt(process.env.PORT || 3333);
process.env.ADDRESS = process.env.ADDRESS || '127.0.0.1';

const { default: baseData } = await import('./lib/cache-base-data.js');
await import('./lib/server-start.js');

//await import('./site/dynamic/pages/faqs/faqs.js');

console.log(path.resolve(process.env.WEBSITE_STATIC_FOLDER || '../static/example'))