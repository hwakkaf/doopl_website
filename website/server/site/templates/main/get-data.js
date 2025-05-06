import { collection, single } from '../../../lib/page-tools.js';

let pageData;
let refreshTime;

export default getData = async (refresh) => {
  if ((refresh && refresh > refreshTime) || !pageData) await refreshData();
  return pageData;
}

const refreshData = async () => {
  let articles = await collection('articles', {
    entity: 'articles',
    locale: 'en',
    populate: {
      categories: true,
      authors: true,
      blocks: {
        populate: '*'
      },
    }
  });

  pageData = {
    articles,
  }
  refreshTime = Date.now();
}


