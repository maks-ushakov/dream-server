const db = require('../db');
class Dream {
  constructor (data) {
    this.data = data;
  }


// read the sqlite3 module docs and try to add your own! https://www.npmjs.com/package/sqlite3
  getAll(callback) {
    db.all('SELECT dream from Dreams', callback)
  }

  getAllFull(callback) {
    db.all('SELECT * from Dreams', callback)
  }
  
  create() {
    if (!!this.data) {
      var insert = db.prepare("INSERT INTO Dreams (dream) VALUES (?)");
      insert.run(this.data);
      insert.finalize();
    }
  }
  remove(id) {
    db.run('DELETE FROM Dreams WHERE id=' + id);
  }

  drop() {
    db.run('DROP TABLE Dreams');
  }
}


module.exports = Dream;