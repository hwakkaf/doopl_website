import { strapi } from '@strapi/client';


const client = strapi({
  baseURL: process.env.CMS_BASE_URL,
  auth: process.env.CMS_API_KEY,
});

export const collection = async (config = {}) => {
  let data;

  try {
    let connector = client.collection(config.entity);
    return (await connector.find(config)).data;  
  } catch(e) {
    console.log(e,"\n***** Get collection error *****");
    return [];
  }
}

export const single = async (entity, config = {}) => {
  try {
    let connector = client.single(entity);
    return (await connector.find(config)).data;  
  } catch(e) {
    console.log(e,"\n***** Get Single error *****");
    return {};
  }
}


