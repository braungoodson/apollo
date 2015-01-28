'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BotSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Bot', BotSchema);