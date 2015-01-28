'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BotSchema = new Schema({
  name: String,
  info: String,
  active: Boolean,
  ppublic: Boolean,
  key: String,
  secret: String,
  funds: [{
    dob:{type:Date,default:Date.now},
    usd: Number,
    btc: Number
  }],
  rights: [{
    info:Number,
    trade:Number,
    withdraw:Number
  }],
  transaction_count: Number,
  open_orders: Number,
  server_time: Number
});

module.exports = mongoose.model('Bot', BotSchema);
