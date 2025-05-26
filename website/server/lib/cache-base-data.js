import { strapi } from '@strapi/client';

export const baseData = {
  info: {},
  locales: null,
  defaultLocale: process.env.DEFAULT_LOCALE || 'en',
  defaultDir: process.env.DEFAULT_DIRECTION || 'ltr'
};

function createHierarchy(menus) {
  if (!Array.isArray(menus) || menus.length < 2) return menus;
  let shrinked = new WeakSet()
  while (true) {
    let first;
    for (let idx = 0; idx < menus.length; idx++) if (!shrinked.has(menus[idx])) {first = menus[idx]; break}
    if (!first || Array.isArray(first.children)) break;
    shrinked.add(first);
    if (Array.isArray(first.children)) continue;
    first.children = createHierarchy(menus.filter(item => item.hierarchy.startsWith(`${first.hierarchy}.`))).sort((a,b) => a.ordering - b.ordering);
    menus = menus.filter(item => !item.hierarchy.startsWith(`${first.hierarchy}.`));
  }
  return menus;
}
export async function prepareBaseData() {

  const client = strapi({
    baseURL: process.env.CMS_API_URL,
    auth: process.env.CMS_API_KEY,
  });

  if (process.env.ALLOWED_LOCALES) {
    process.localesArray = baseData.locales = process.env.ALLOWED_LOCALES.split(',');
  }
  else process.localesArray = ['en']  

  let connector
  , settings = {}
  , global = {}
  , vocab = {}
    , menus = {}
    , menubars = {}
    , sitemap = {}
    , locales = {}
  ;

  connector = client.single('setting')
  for (let s of process.localesArray || []) {
    locales[s] = true;
    try {
      settings[s] = (await connector.find({ locale: s })).data;
    } catch { settings[s] = {}; }
  }
  let keys = Object.keys(locales);

  connector = client.single('global');
  for (let s of keys) {
    try {
      global[s] = (await connector.find({ locale: s, populate: '*' })).data;
    } catch(e) { console.log("Error getting data",e); global[s] = {} }

  }

  connector = client.collection('vocabs');
  for (let s of keys) {
    try {
      let res = await connector.find({
        locale: s,
        sort: 'name',
      });
      let voc = {}
      for (let v of res.data) {
        let name = v.name?.replace(/-/g,' ');
        voc[v.name] = v.text;
      }
      vocab[s] = voc;
    } catch(e) { console.log("Error getting data",e); vocab[s] = {} }

  }

  connector = client.collection('menus');
  for (let s of keys) {
    try {
      menus[s] = (await connector.find({
        locale: s,
        fields: ['hierarchy','title', 'url', 'type', 'ordering', 'invisible'],
      })).data;
      let res = {}
      for (let m of createHierarchy(menus[s])) res[m.hierarchy] = m;
      menubars[s] = res;
    } catch(e) { console.log("Error getting data",e); menus[s] = []; menubars[s] = {} }

  }
  connector = client.collection('sitemaps');
  for (let s of keys) {
    try {
      sitemap[s] = (await connector.find({
        locale: s,
      })).data;
    } catch(e) { console.log("Error getting data",e); sitemap[s] = {} }

  }
  
  /*
  connector = client.collection('articles');
  let articles = (await connector.find({
    populate: {
      categories: true,
      authors: true,
      blocks: {
        populate: '*'
      },
    }
  
  }));
  
  articles = articles.data
  */
 for (let l of baseData.locales) {
  baseData.info[l] = {
    settings: settings[l],
    global: global[l],
    vocab: vocab[l],
    menus: menus[l],
    menubars: menubars[l],
    sitemap: sitemap[l],
  }
 }
}

const client = strapi({
  baseURL: process.env.CMS_API_URL,
  auth: process.env.CMS_API_KEY,
});

// let connector = client.collection('articles');
// let articles = (await connector.find({
//   locale: 'en',
//   populate: {
//     categories: true,
//     authors: true,
//     blocks: {
//       populate: '*'
//     },
//   }

// }));

await prepareBaseData()
export default baseData;