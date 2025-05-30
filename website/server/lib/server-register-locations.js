import baseData from './cache-base-data.js';
import { dynamicHandlerFactory, staticHandlerFactory, offlineHandlerFactory, cmsHandler } from './server-url-handlers.js';

const registerLocations = async (server) => {
  try {
    //1. NotFound Handler
    server.setNotFoundHandler((request, reply) => {
      reply.header('content-type', 'text/html').send('<img style="margin: 0 auto" src="/assets/images/404.png">')
    });

    server.post('/internal/hooks/cms-data-changed', cmsHandler);

    if ((baseData.info.en.settings.siteStatus || '').toLowerCase() == 'offline') {
      server.get('/**', await offlineHandlerFactory());
      console.log("Offline Server", port, address);
    }
    else {
      if (Array.isArray(baseData.info.en.sitemap) && baseData.info.en.sitemap.length) {
        for (let location of baseData.info.en.sitemap) {
          if (!location.url) continue;

          if (!location.url.startsWith('/')) location.url = '/' + location.url;
          console.log("Register location", location.url);

          server.get(`${location.url}`, location.access == 'static'? await staticHandlerFactory(location) : await dynamicHandlerFactory(location));

        }
      }
      else {
        console.log("***** WARNING: Empty or invalid sitemap [srl-01-001]")
      }
    }
  } catch (e) {
    console.log("***** WARNING: Defining entrypoints [srl-01-002]", e)
  }
return server;
}

export default registerLocations