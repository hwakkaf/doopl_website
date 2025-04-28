import { strapi } from '@strapi/client';
import dotenv from 'dotenv';

dotenv.config();


const client = strapi({
  baseURL: process.env.CMS_BASE_URL,
  auth: process.env.CMS_API_KEY,
});

const result = await client.fetch('faqs', { method: 'GET' });
console.log(await result.json())