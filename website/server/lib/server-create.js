import fs from 'fs';
import fastify from 'fastify';

const siteSettings = {
  logger: process.env.LOGGER,
  http2: !!process.env.SSL && !!process.env.HTTP2,
  https: !!process.env.SSL? {
    allowHTTP1: true,
    key: fs.readFileSync(process.env.SSL_KEY),
    cert: fs.readFileSync(process.env.SSL_CERT)
  } : null,
  trustProxy: false,
  ignoreTrailingSlash: true,
  bodyLimit: parseInt(process.env.BODY_LIMIT)

};

console.log('Site settings', siteSettings)
export default () => fastify(siteSettings);