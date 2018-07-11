'use strict';

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const { DATABASE_URL, PORT } = require('./config'); //for runServer function
const { Segment } = require('./models');

const app = express();

app.use(morgan('common'));
app.use(express.json());

//Get Segments
app.get('/segments', (req, res) => {
  Segment
    .find()
    .then(segments => {
      console.log(segments);
      res.json(segments.map(segments => segments.serialize()));
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'There was an error with your request' });
    });
});

//Get Segment by ID
app.get('/segments/:id', (req, res) => {
  Segment
    .findById(req.params.id)
    .then(segments => res.json(segments.serialize()))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'There was an error with your request' });
    });
});

//----------WIP Below
app.post('/segments', (req, res) => {
  const requiredFields = ['name', 'id', 'city', 'state', 'country', 'starred', 'average_grade'];
  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  }
  Segment
    .create({
      name: req.body.name,
      id: req.body.id,
      city: req.body.city,
      state: req.body.state,
      country: req.body.country,
      starred: req.body.starred,
      average_grade: req.body.average_grade
    })
    .then(Segment => res.status(201).json(Segment.serialize()))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Something went wrong' });
    });
});

app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});