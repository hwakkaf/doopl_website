import { getData, baseData, gqlClient } from '../../../lib/page-tools.js';
import gqlSatatement from './faqs-data.js'

console.log(baseData);
getData(gqlSatatement).then(result => console.log(result));