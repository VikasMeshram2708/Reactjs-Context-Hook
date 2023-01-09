const monk = require('monk');

const db = monk('localhost/messageBoard');

if(db === undefined) {
  console.log('Failed to Connect with DB...');
} else {
  console.log('Connected to Db Successfully...');
}

module.exports = db;