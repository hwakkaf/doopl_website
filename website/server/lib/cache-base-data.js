import { strapi } from '@strapi/client';

export const baseData = {
  settings: {},
  vocab: {},
  menus: {},
  sitemap: {},
  locales: {},
  locale: process.env.DEFAULT_LOCALE || 'en',
  dir: process.env.DEFAULT_DIRECTION || 'ltr'
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
export async function asyncprepareBaseData() {

  const client = strapi({
    baseURL: process.env.CMS_BASE_URL,
    auth: process.env.CMS_API_KEY,
  });

  if (process.env.ALLOWED_LOCALES) {
    process.localesArray = process.env.ALLOWED_LOCALES.split(',');
  }
  else process.localesArray = ['en']  

  let connector
    , settings = {}
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
    } catch { }
  }
  let keys = Object.keys(locales);

  connector = client.collection('vocabs');
  for (let s of keys) {
    try {
      let res = await connector.find({
        locale: s,
        sort: 'name',
      });
      let voc = {}
      for (let v of res.data) voc[v.name] = v.text;
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
      menubars[s] = createHierarchy(menus[s])
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
  baseData.settings = settings;
  baseData.vocab = vocab;
  baseData.menus = menus;
  baseData.menubars = menubars;
  baseData.sitemap = sitemap;
  baseData.locales = locales;
  baseData.locale = process.env.DEFAULT_LOCALE || 'en',
  baseData.dir = process.env.DEFAULT_DIRECTION || 'ltr'
}

await asyncprepareBaseData()
export default baseData;