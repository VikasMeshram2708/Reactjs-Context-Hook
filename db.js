const monk = require('monk');

const db = monk(process.env.MONGO_URI);

if(db === undefined) {
  console.log('Failed to Connect with DB...');
} else {
  console.log('Connected to Db Successfully...');
}

module.exports = db;