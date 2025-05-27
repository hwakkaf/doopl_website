import { strapi } from '@strapi/client';
import helpers from './helpers.js';

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
    , links = {}
    , languages = {}
    , cities = {}
  ;


  connector = client.single('setting')
  for (let s of process.localesArray || []) {
    locales[s] = true;
    try {
      settings[s] = (await connector.find({
        locale: s,
        populate: {fallbackIcon: true}
      })).data;
      settings[s].fallbackIcon.url = `${process.env.CMS_BASE_URL}${settings[s].fallbackIcon.url}`
    } catch { settings[s] = {}; }
  }
  let keys = Object.keys(locales);

  connector = client.single('global');
  for (let s of keys) {
    try {
      global[s] = (await connector.find({ locale: s, populate: '*' })).data;
      global[s].logo.url = `${process.env.CMS_BASE_URL}${global[s].logo.url}`
    } catch(e) { console.log(e,"Error getting [global], language: ",s); global[s] = {} }

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
        voc[helpers.toCamelCase(v.name)] = helpers.toTextCase(v.text || v.name);
      }
      vocab[s] = voc;
    } catch(e) { console.log(e,"Error getting [vocabs], language: ",s); vocab[s] = {} }

  }

  connector = client.collection('marketing-links');
  for (let s of keys) {
    try {
      let res = await connector.find({
        locale: s,
        populate: {icon: true}
      });
      let localedLinks = {}
      for (let v of res.data) {
        let name = v.group.toLowerCase();
        if (v.icon) v.icon.url = `${process.env.CMS_BASE_URL}${v.icon.url}`
        if (!localedLinks[name]) localedLinks[name] = [v];
        else  localedLinks[name].push(v);
      }
      for (let l in localedLinks) localedLinks[l].sort((a,b) => a.ordering-b.ordering);
      links[s] = localedLinks;
    } catch(e) { console.log(e,"Error getting [links], language: ",s); vocab[s] = {} }
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
    } catch(e) { console.log(e,"Error getting [menus], language: ",s); menus[s] = []; menubars[s] = {} }

  }

  connector = client.collection('sitemaps');
  for (let s of keys) {
    try {
      sitemap[s] = (await connector.find({
        locale: s,
      })).data;
    } catch(e) { console.log(e,"Error getting [sitemap], language: ",s); sitemap[s] = {} }

  }
  
  connector = client.collection('languages');
  for (let s of keys) {
    try {
      languages[s] = (await connector.find({
        locale: s,
        sort: ['ordering', 'name'],
        populate: {icon: true}
      })).data;
      for (let l of languages[s]) l.displayName = `${l.name} (${l.code})`
    } catch(e) { console.log(e,"Error getting [languages], language: ",s); languages[s] = {} }

  }

  connector = client.collection('country-cities');
  for (let s of keys) {
    try {
      cities[s] = (await connector.find({
        locale: s,
        sort: ['ordering', 'city', 'country'],
        populate: {icon: true}
      })).data;

      for (let l of cities[s]) l.displayName = l.city? `${l.city}, ${l.country}` : l.country
    } catch(e) { console.log(e,"Error getting [cities], language: ",s); cities[s] = {} }

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
    links: links[l],
    languages: languages[l],
    cities: cities[l],
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