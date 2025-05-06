import { strapi } from '@strapi/client';

const cacheAllowed = process?.env?.WEBSITE_ALLOW_CACHE?.toLowerCase() === 'true' || process?.env?.WEBSITE_ALLOW_CACHE?.toLowerCase() === 'on';

const client = strapi({
  baseURL: process.env.CMS_BASE_URL,
  auth: process.env.CMS_API_KEY,
});

const namedCache = {

}

export const getCache = async (config = [], refreshRequestTime) => {
  let { name, group } = config;
  let refreshTime = Date.now();

  if (!cacheAllowed || (!namedCache[name] || !namedCache[name].data) || (refreshRequestTime && refreshRequestTime > namedCache[name].refreshTime)) {
    namedCache[name] = {
      data: await getGroup(group),
      refreshTime,
    }
    return namedCache[name].data;
  }
}

export const getGroup = async (config = []) => {
  let data = {};
  if (!Array.isArray(config)) {
    for (let ent of config) {
      if (ent && ent.entity) data[ent.entity] = ent.isSingle ? single(ent) : collection(ent);
      else console.log(ent, "\n***** Get Group error *****");
    }
    return data;
  }
  else if (config && config.entity) return config.isSingle ? single(config) : collection(config)
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


