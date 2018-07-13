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
      activity_type: req.body.activity_type,
      city: req.body.city,
      country: req.body.country,
      id: req.body.id,
      name: req.body.name,
      state: req.body.state
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

// app.use('*', function (req, res) {
//   res.status(404).json({ message: 'Not Found' });
// });

// // closeServer needs access to a server object, but that only
// // gets created when `runServer` runs, so we declare `server` here
// // and then assign a value to it in run

// let server;

// // // this function connects to our database, then starts the server
// function runServer(databaseUrl, port = PORT) {
//   return new Promise((resolve, reject) => {
//     mongoose.connect(databaseUrl, err => {
//       if (err) {
//         return reject(err);
//       }
//       server = app.listen(port, () => {
//         console.log(`Your app is listening on port ${port}`);
//         resolve();
//       })
//         .on('error', err => {
//           mongoose.disconnect();
//           reject(err);
//         });
//     });
//   });
// }

// // this function closes the server, and returns a promise.we'll
// // use it in our integration tests later.
// function closeServer() {
//   return mongoose.disconnect().then(() => {
//     return new Promise((resolve, reject) => {
//       console.log('Closing server');
//       server.close(err => {
//         if (err) {
//           return reject(err);
//         }
//         resolve();
//       });
//     });
//   });
// }

// // if server.js is called directly (aka, with `node server.js`), this block
// // runs.but we also export the runServer command so other code (for instance, test code) can start the server as needed.
// if (require.main === module) {
//   runServer(DATABASE_URL).catch(err => console.error(err));
// }

// module.exports = { runServer, app, closeServer };