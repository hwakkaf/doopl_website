'use strict';

/**
 * menu-bar service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::menu-bar.menu-bar');
