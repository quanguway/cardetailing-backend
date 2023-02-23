import config from './connect.database';

export default require('knex')(config);