'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const segmentSchema = mongoose.Schema({
  name: String,
  id: Number,
  segment: {
    city: String,
    state: String,
    starred: Boolean
  }
});