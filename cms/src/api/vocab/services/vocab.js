'use strict';

/**
 * vocab service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::vocab.vocab');
