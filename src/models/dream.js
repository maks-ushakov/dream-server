const db = require('../db');
class Dream {
  constructor (data) {
    this.data = data;
  }


// read the sqlite3 module docs and try to add your own! https://www.npmjs.com/package/sqlite3
  getAll(callback) {
    db.all('SELECT * from Dreams', callback)
  }
  
  create() {
    if (!!this.data) {
      var insert = db.prepare("INSERT INTO Dreams VALUES (?)");
      insert.run(this.data);
      insert.finalize();
    }
  }
}


module.exports = Dream;