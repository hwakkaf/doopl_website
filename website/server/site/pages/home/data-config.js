export default {
  name: 'pageHome', //ours
  entities: [
    {
      name: 'articles', //ours
      isSingle: false, //ours: true for single types
      // data configuration as in Strapi client
      populate: {
        categories: true,
        authors: true,
        blocks: {
          populate: '*'
        },
      }
    },
    {
      name: 'narratives', //ours
      isSingle: false, //ours: true for single types
      sort: ['ordering', 'accessName'],
      objectify: { //ours, transform data array to object using objectify value as property name for object key source
        field: 'accessName',
        deep: true,
        camelize: true
      },
      // data configuration as in Strapi client
      populate: {
        images: true,
        icon: true,
      }
    }
  ]
}
