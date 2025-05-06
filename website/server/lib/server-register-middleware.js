import fileServer from '@fastify/static';
import formbody from '@fastify/formbody';
import helmet from '@fastify/helmet';
import cookie from '@fastify/cookie';
import compress from '@fastify/compress';
import path from 'path';
import fs from 'fs';

const serverMiddleware = (server) => {
  let websiteFolder = path.resolve(process.env.WEBSITE_STATIC_FOLDER);
	if (!fs.existsSync(websiteFolder)) {
		console.log("<FATAL ERROR> Website folder not found...", process.env.WEBSITE_STATIC_FOLDER);
	}

  server.register(formbody)
  server.register(cookie)
  server.register(helmet, { hidePoweredBy: { setTo: 'PHP 4.2.0' }, contentSecurityPolicy: false })
  server.register(compress, { global: true })

  // serving static files
  server.register(fileServer, {
    root: path.join(websiteFolder, 'pages'),
    // prefix: '/public', // optional: default '/',
    precompress: 'br',
    threshold: 1024,
    forceable: true, // sendFile can force sending excluded files by explicitely passing force=true parameter
    //excludes: ['/**/*.html'], // do not serve unless force = true parameter is passed explicitely by sendFile
    index: false, //when true it will try to serve index.html, default: false
  })

  server.register(fileServer, {
    root: path.join(websiteFolder, 'media/images'),
    prefix: '/images', // optional: default '/',
    precompress: false,
    threshold: 1024,
    forceable: true, // sendFile can force sending excluded files by explicitely passing force=true parameter
    //excludes: ['/**/*.html'], // do not serve unless force = true parameter is passed explicitely by sendFile
    index: false, //when true it will try to serve index.html, default: false
    decorateReply: false,
  });

  server.register(fileServer, {
    root: path.join(websiteFolder, 'media/videos'),
    prefix: '/videos', // optional: default '/',
    precompress: false,
    threshold: 1024,
    forceable: true, // sendFile can force sending excluded files by explicitely passing force=true parameter
    //excludes: ['/**/*.html'], // do not serve unless force = true parameter is passed explicitely by sendFile
    index: false, //when true it will try to serve index.html, default: false
    decorateReply: false,
  });

  server.register(fileServer, {
    root: path.join(websiteFolder, 'docs'),
    prefix: '/docs', // optional: default '/',
    precompress: false,
    threshold: 1024,
    forceable: true, // sendFile can force sending excluded files by explicitely passing force=true parameter
    excludes: ['/**/*.html'], // do not serve unless force = true parameter is passed explicitely by sendFile
    index: false, //when true it will try to serve index.html, default: false
    decorateReply: false,
  });

  server.register(fileServer, {
    root: path.join(websiteFolder, 'docs/pdf'),
    prefix: '/pdf', // optional: default '/',
    precompress: false,
    threshold: 1024,
    forceable: true, // sendFile can force sending excluded files by explicitely passing force=true parameter
    excludes: ['/**/*.html'], // do not serve unless force = true parameter is passed explicitely by sendFile
    index: false, //when true it will try to serve index.html, default: false
    decorateReply: false,
  });
  server.register(fileServer, {
    root: path.join(websiteFolder, 'assets'),
    prefix: '/assets', // optional: default '/',
    // precompress: config.precomressAssets,
    threshold: 1024,
    //forceable: true, // sendFile can force sending excluded files by explicitely passing force=true parameter
    //excludes: ['/**/*.html'], // do not serve unless force = true parameter is passed explicitely by sendFile
    index: false, //when true it will try to serve index.html, default: false
    decorateReply: false,
  });
  return server;
}

export default serverMiddleware;