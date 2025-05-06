import path from 'path';
import fs from 'fs';
import baseData from './cache-base-data.js';
import {prepareBaseData} from './cache-base-data.js';
import { renderToNodeStream, renderToString } from '@popeindustries/lit-html-server';
import { getCache, getExported } from '../lib/page-tools.js';

let refreshRequestTime = 0;

const baseDataModels = {
  vocab: true,
  menu: true,
  sitemap: true,
  global: true,
  setting: true,
}

export const dynamicHandlerFactory = async (location) => {
  let template;
  try {
    let tmpl = location.template
    template =
      !tmpl
        ? `../site/templates/main/main.js`
        : tmpl == 'page' || tmpl.startsWith('-')
          ? `../site/pages/${location.page}/${location.page}.js`
          : `../site/templates/${tmpl}/${tmpl}.js`
      ;
      template = (await import(template)).default;
      if (template instanceof Function) {
        return async (request, reply) => {
          return reply.status(200).type('text/html').send(
            await renderToNodeStream(await template(
              {
                query: request.query,
                params: request.params,
                location,
                ...(baseData.info[request.lang || baseData.defaultLocale]),
                lang: request.lang || baseData.defaultLocale,
                dir: request.dir || baseData.defaultDir,
                templateData: {},
                page: (await import(`../site/pages/${location.page}/${location.page}.js`)).default,
                pageData: await getCache((await import(`../site/pages/${location.page}/data-config.js`)).default, {refreshRequestTime, lang: request.lang || baseData.defaultLocale}),
                user: {
                }
              }
            ))
          );
        }
      }
      else {
        return async (request, reply) => reply.status(200).type('text/html').send(template);
      }      

  } catch (e) {
    console.log("Required page is dynamic with no template", location, e);
    return async (request, reply) => reply.status(200).type('text/html').send("Required page is dynamic with no template");
  }
};

export const staticHandlerFactory = async (location, websiteFolder) => async (request, reply) => {
  reply.sendFile(path.join(websiteFolder, `pages/${location.page || '/index'}.html`), true)
};

export const offlineHandlerFactory = async () => {
  let offlineTemplate;
  try {
    let page = await import(`../site/pages-special/${baseData.info.en.settings.offlinePage}.js`);
    offlineTemplate = await renderToNodeStream(page());
  }
  catch (e) {
    offlineTemplate = `
    <!DOCTYPE html>
    <html dir="ltr">

    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="shortcut icon" type="image/jpg" href="/resources/images/favicon.ico"/>
    </head>

    <body>
      <h1>We're sorry</h1>
      <h2>This website is on maintenance for now</h2>
    </body>
    </html>
    `
      ;
  }

  return (request, reply) => {
    reply.status(200).type('text/html').send(offlineTemplate)
    return;
  }
}

export const cmsHandler = async (request, reply) => {
  reply.status(200).type('text/html').send('OK')
  let {body} = request;
  let {model} = body;

  if (model) {
    if (baseDataModels[model]) {
      //rebuild baseData
      await prepareBaseData()
    }
    else {
      // cache is obolete, all pages should refresh
      console.log("ON CMS DATA CHANGE");
      refreshRequestTime = Date.now();
    }
  }
  
}
