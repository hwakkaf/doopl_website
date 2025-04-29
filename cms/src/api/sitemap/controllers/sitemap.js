'use strict';

/**
 * sitemap controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::sitemap.sitemap');
