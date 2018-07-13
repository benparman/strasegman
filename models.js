'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const SegmentSchema = mongoose.Schema({
  activity_type: String,
  city: String,
  country: String,
  id: {type: Number, required: true},
  name: String,
  state: String,
});

/*
{
  "id": 41334443504,
  "resource_state": 2,
  "name": "New Trail 2016",
  "activity": {
      "id": 1649828862,
      "resource_state": 1
  },
  "athlete": {
      "id": 238423,
      "resource_state": 1
  },
  "elapsed_time": 271,
  "moving_time": 271,
  "start_date": "2018-06-20T00:00:02Z",
  "start_date_local": "2018-06-19T18:00:02Z",
  "distance": 1363,
  "start_index": 2,
  "end_index": 273,
  "average_cadence": 92,
  "device_watts": true,
  "average_watts": 327.1,
  "average_heartrate": 167.5,
  "max_heartrate": 173,
  "segment": {
      "id": 12368798,
      "resource_state": 2,
      "name": "New Trail 2016",
      "activity_type": "Ride",
      "distance": 1464.8,
      "average_grade": 4.3,
      "maximum_grade": 21.9,
      "elevation_high": 2608.9,
      "elevation_low": 2546.1,
      "start_latlng": [
          41.254392,
          -105.422445
      ],
      "end_latlng": [
          41.25168,
          -105.433009
      ],
      "start_latitude": 41.254392,
      "start_longitude": -105.422445,
      "end_latitude": 41.25168,
      "end_longitude": -105.433009,
      "climb_category": 0,
      "city": "Laramie",
      "state": "Wyoming",
      "country": "United States",
      "private": false,
      "hazardous": false,
      "starred": false
  }
*/
const Segment = mongoose.model('Segment', SegmentSchema);
module.exports = { Segment };