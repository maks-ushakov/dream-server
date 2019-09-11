const AdminModel = require('../models').Dream;

class Admin {
  constructor(data) {
    this.models = {
      'admin': new AdminModel(data),
    }
  }

  getAll(callback) {
    this.models.admin.getAllFull(callback);
  }

  create () {
    this.models.admin.create();
  }

  remove (id) {
    this.models.admin.remove(id);
  }

  drop () {
    this.models.admin.drop();
  }
}


module.exports = Admin