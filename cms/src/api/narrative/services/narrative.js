'use strict';

/**
 * narrative service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::narrative.narrative');
