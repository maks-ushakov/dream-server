const DreamModel = require('../models').Dream;

class Dream {
  constructor(data) {
    this.models = {
      'dream': new DreamModel(data),
    }
  }

  getAll(callback) {
    this.models.dream.getAll(callback);
  }

  create () {
    this.models.dream.create();
  }
}


module.exports = Dream