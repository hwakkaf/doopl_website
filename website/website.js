import { strapi } from '@strapi/client';
import dotenv from 'dotenv';

await dotenv.config();

const { default: baseData } = await import('./lib/cache-base-data.js');

console.log(baseData)
