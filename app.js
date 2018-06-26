'use strict';

const STATE = {
  userID: 238423,
  // access_token: '283e21d3a127a4cb5ca4ad4608272825c5a35332', <--over rate limit
  access_token: '9f88334edeb57cc3c19505578cf5a4a60bc1e890',
  KOMS: [],
  pagenum: 1,
  lastPush: 1,
  starred: []
};

//----------Retrieves Authenticated User's Starred Segments----------//
function getStarred() {
  let url = 'https://www.strava.com/api/v3/segments/starred';
  const settings = {
    url: url,
    data: {
      access_token:STATE.access_token,
      per_page: 5,
      page: STATE.pagenum
    },
    success: function(data) {
      STATE.starred.push(data);
      console.log(data);
    },
    error: function() {
      console.log('there was a problem with your request');
    }
  };
  $.ajax(settings);
}


//----------Call API's----------//
function getData() {
  // getKoms();
  getStarred();
}

//----------Retrieves Authenticated User's KOM's----------//
function getKoms() {
  let url = `https://www.strava.com/api/v3/athletes/${STATE.userID}/koms?`;
  const settings = {
    url: url,
    data: {
      id: STATE.userID,
      access_token: STATE.access_token,
      per_page: 50,
      page: STATE.pagenum
    },
    success: function(data) {
      STATE.KOMS.push(data);
      if (!(data.length === 0)) {
        STATE.fetch = true;
      }
      console.log('Successfully retrieved authenticated user\'s KOM\'s', data);
      STATE.lastPush = data.length;
      STATE.pagenum ++;
      STATE.KOMS.push(data);
      return data;
    },
    error: function() {
      console.log('error');
    }
  };
  $.ajax(settings);
}

$(document).ready(getData);