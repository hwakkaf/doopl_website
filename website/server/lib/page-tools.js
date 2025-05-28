import { strapi } from '@strapi/client';
import helpers from './helpers.js';

const cacheAllowed = process?.env?.WEBSITE_ALLOW_CACHE?.toLowerCase() === 'true' || process?.env?.WEBSITE_ALLOW_CACHE?.toLowerCase() === 'on';

const client = strapi({
  baseURL: process.env.CMS_API_URL,
  auth: process.env.CMS_API_KEY,
});

const namedCache = {

};

export const getCache = async (config = {}, requestConfig) => {
  let { name } = config;
  if (!name || !config.entities) {
    console.log(config, "\n***** Get Cache error ***** Data config is null or empty");
    return {};

  }
  let refreshTime = Date.now();
  let {refreshRequestTime, lang} = requestConfig;
  if(!lang) requestConfig.lang = lang = 'en';
  let nc;
  if (!namedCache[lang]) nc = namedCache[lang] = {};
  else nc = namedCache[lang];

  if (!cacheAllowed || (!nc[name] || !nc[name].data) || (refreshRequestTime && refreshRequestTime > nc[name].refreshTime)) {
    nc[name] = {
      data: await getGroup(config,requestConfig),
      refreshTime,
    }
  }
  return nc[name].data;
}

export const getGroup = async (config = {}, requestConfig) => {
  let { entities } = config;

  let data = {};
  if(!entities || (Array.isArray(entities) && !entities.length)) {
    console.log(config, "\n***** Get Group error ***** Entities array is null or empty");
    return {};
  }
  if (!Array.isArray(entities)) entities = [entities];
  for (let entity of entities) {
    entity.locale = requestConfig.lang;
    if (entity && entity.name) {
      if (entity.isSingle) data[entity.name] = await single(entity);
      else {
        let { field, deep} = entity.objectify??{};
        if (field) {
          // converting data array to key/value object with field value as the key for each data item,
          // with the possibility to create deep nested object if field is dot seperated name
          let result = {}
            , last
            , nested
            , transform
            ;
          deep = deep || deep === undefined;
          transform = deep? f => helpers.toCamelCase(f).split('.') : f => [helpers.toCamelCase(f)];
          for (let d of await collection(entity)) {
            let accessName = transform(d[field] || 'wrongAccessField');
            last = accessName[accessName.length-1];
            nested = result;
            if (accessName.length > 1) {
              for (let l of accessName.slice(0,accessName.length-1)) {
                if (!nested[l]) nested = nested[l] = {};
              }
            }
            else nested = result;
            // insert data into nested object
            // sometimes same accessname may not be unique in database, its values should be cached as array
            if (!nested[last]) nested[last] = d;
            else if (Array.isArray(nested[last])) nested[last].push(d);
            else nested[last] = [nested[last],d];
          }
          data[entity.name] = result;
        }
        else data[entity.name] = await collection(entity);
      }
    }
    else console.log(entity, "\n***** Get Group error ***** Entity is either null or has no name attached");
  }
  return data;
}

export const collection = async (entity = {}) => {
  try {
    let connector = client.collection(entity.name);
    return (await connector.find(entity)).data;
  } catch (e) {
    console.log(e, "\n***** Get collection error *****");
    return [];
  }
}

export const single = async (entity = {}) => {
  try {
    let connector = client.single(entity.name);
    return (await connector.find(entity)).data;
  } catch (e) {
    console.log(e, "\n***** Get Single error *****");
    return {};
  }
}

export const getExported = async (filePath, name = 'default', type = Function) => {
  let exported;
  try {
    exported = (await import(filePath))[name];
  } catch(e) {
    exported = type === Function? _=>'' : new type();
  }
  return exported
}


