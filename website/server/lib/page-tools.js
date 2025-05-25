import { strapi } from '@strapi/client';

const cacheAllowed = process?.env?.WEBSITE_ALLOW_CACHE?.toLowerCase() === 'true' || process?.env?.WEBSITE_ALLOW_CACHE?.toLowerCase() === 'on';

const client = strapi({
  baseURL: process.env.CMS_API_URL,
  auth: process.env.CMS_API_KEY,
});

const namedCache = {

};

export const getCache = async (config = [], requestConfig) => {
  let { name, group } = config;
  let refreshTime = Date.now();
  let {refreshRequestTime, lang} = requestConfig;

  if (!cacheAllowed || (!namedCache[name] || !namedCache[name].data) || (refreshRequestTime && refreshRequestTime > namedCache[name].refreshTime)) {
    namedCache[name] = {
      data: await getGroup(group,requestConfig),
      refreshTime,
    }
  }
  return namedCache[name].data;
}

export const getGroup = async (config = [], requestConfig) => {
  let data = {};
  if (Array.isArray(config)) {
    for (let ent of config) {
      ent.locale = requestConfig.lang;
      if (ent && ent.entity) data[ent.entity] = ent.isSingle ? await single(ent) : await collection(ent);
      else console.log(ent, "\n***** Get Group error *****");
    }
    return data;
  }
  else if (config && config.entity) return config.isSingle ? await single(config) : await collection(config)
  else {
    console.log(config, "\n***** Get Group error *****");
    return {};
  }
}

export const collection = async (config = {}) => {
  try {
    let connector = client.collection(config.entity);
    return (await connector.find(config)).data;
  } catch (e) {
    console.log(e, "\n***** Get collection error *****");
    return [];
  }
}

export const single = async (config = {}) => {
  try {
    let connector = client.single(config.entity);
    return (await connector.find(config)).data;
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


