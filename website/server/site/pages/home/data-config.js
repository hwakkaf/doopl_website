export default {
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
