'use strict';

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const { DATABASE_URL, PORT } = require('./config'); //for runServer function
const { Segments } = require('./models');

const app = express();

app.use(morgan('common'));
app.use(express.json());

//Get Segments
app.get('/segments', (req, res) => {
  Segments
    .find()
    .then(segments => {
      res.json(segments.map(segments => segments.serialize()));
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'There was an error with your request' });
    });
});

//Get Segment by ID
app.get('/segments/:id', (req, res) => {
  Segments
    .findById(req.params.id)
    .then(segments => res.json(segments.serialize()))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'There was an error with your request' });
    });
});