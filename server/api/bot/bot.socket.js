/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Bot = require('./bot.model');

exports.register = function(socket) {
  Bot.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Bot.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('bot:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('bot:remove', doc);
}