'use strict';

var _ = require('lodash');
var Bot = require('./bot.model');

// Get list of bots
exports.index = function(req, res) {
  Bot.find(function (err, bots) {
    if(err) { return handleError(res, err); }
    return res.json(200, bots);
  });
};

// Get a single bot
exports.show = function(req, res) {
  Bot.findById(req.params.id, function (err, bot) {
    if(err) { return handleError(res, err); }
    if(!bot) { return res.send(404); }
    return res.json(bot);
  });
};

// Creates a new bot in the DB.
exports.create = function(req, res) {
  Bot.create(req.body, function(err, bot) {
    if(err) { return handleError(res, err); }
    return res.json(201, bot);
  });
};

// Updates an existing bot in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Bot.findById(req.params.id, function (err, bot) {
    if (err) { return handleError(res, err); }
    if(!bot) { return res.send(404); }
    var updated = _.merge(bot, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, bot);
    });
  });
};

// Deletes a bot from the DB.
exports.destroy = function(req, res) {
  Bot.findById(req.params.id, function (err, bot) {
    if(err) { return handleError(res, err); }
    if(!bot) { return res.send(404); }
    bot.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
