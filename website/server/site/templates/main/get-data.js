import { getCache } from '../../../lib/page-tools.js';

const pageDataConfig = {
  name: 'templateMain',
  group: [
    {
      entity: 'articles',
      isSingle: false,
      locale: 'en',
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
export default getCache.bind(pageDataConfig);
