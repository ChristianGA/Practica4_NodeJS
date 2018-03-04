'use strict';

const mongoose = require('mongoose');
const db = mongoose.connection;

mongoose.Promise = global.Promise;

db.on('error', function (err) {
  console.error('Error de conexión:', err);
  process.exit(1);
});

db.once('open', function () {
  console.info('Conectado a MongoDB.');
});

mongoose.connect('mongodb://localhost/nodepop');

module.exports = db;