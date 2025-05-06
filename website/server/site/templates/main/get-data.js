import { getCache } from '../../../lib/page-tools.js';
export default (requestConfig) => getCache(pageDataConfig, requestConfig);

// data configuration as in Strapi client
const pageDataConfig = {
  name: 'templateMain', //ours
  group: [
    {
      entity: 'articles', //ours
      isSingle: false, //ours: true for single types
      // data configuration as in Strapi client
      populate: {
        categories: true,
        authors: true,
        blocks: {
          populate: '*'
        },
      }
    }
  ]
}
