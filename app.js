'use strict';

const STATE = {
  userID: 238423,
  access_token: '283e21d3a127a4cb5ca4ad4608272825c5a35332',
};
//----------Retrieves Authenticated User's KOM's----------//
function getKoms() {
  let url = `https://www.strava.com/api/v3/athletes/${STATE.userID}/koms?`;
  const settings = {
    url: url,
    data: {
      id: STATE.userID,
      access_token: STATE.access_token,
      per_page: 200,
      page: 1
    },
    success: function(data) {
      console.log('Successfully retrieved authenticated user\'s KOM\'s', data);
    },
    error: function() {
      console.log('error');
    }
  };
  $.ajax(settings);
}

$(document).ready(getKoms);