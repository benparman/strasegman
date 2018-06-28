'use strict';

const STATE = {
  userID: 238423, //personal
  // userID: 1227925, //dummy
  access_token: '283e21d3a127a4cb5ca4ad4608272825c5a35332', //personal
  // access_token: '9f88334edeb57cc3c19505578cf5a4a60bc1e890', //dummy
  koms: [],
  starred: [],
};
//----------Listen for get data button click----------//
function getData() {
  $('#getButton').click(function(event){ 
    event.preventDefault();
    getKoms();
    getStarredSegments();
    console.log(STATE);
  });
}
//----------Retrieves Authenticated User's Leading Segments----------//
function getKoms() {
  let pageCounter = 1;
  komAPI();
  function komAPI() {
    let url = `https://www.strava.com/api/v3/athletes/${STATE.userID}/koms?`;
    const settings = {
      url: url,
      data: {
        id: STATE.userID,
        access_token: STATE.access_token,
        per_page: 200,
        page: pageCounter
      },
      success: function(data) {
        data.forEach(element => {
          STATE.koms.push(element);
        });
        pageCounter++;
        if(data.length === 200) {
          komAPI();
        }
      },
      error: function(res) {
        console.log('Error! Status ',res.status);
      }
    };
    $.ajax(settings); 
  }
}
//----------Retrieves Authenticated User's Starred Segments----------//
function getStarredSegments() {
  let pageCounter = 1;
  starredAPI();
  function starredAPI(){
    let url = 'https://www.strava.com/api/v3/segments/starred';
    const settings = {
      url: url,
      data: {
        access_token:STATE.access_token,
        per_page: 200,
        page: pageCounter
      },
      success: function(data) {
        data.forEach(element => {
          STATE.starred.push(element);
        });
        pageCounter++;
        if(data.length === 200) {
          starredAPI();
        }
      },
      error: function(res) {
        console.log('Error! Status ',res.status);
      }
    };
    $.ajax(settings);
  }
}
//----------Sort Array Data----------//
function sortData(array,method) {
  return array.sort(method);
}

function alphabeticalAscend(a,b) {
  if (a.name < b.name)
    return -1;
  if (a.name > b.name)
    return 1;
  return 0;
}

function alphabeticalDescend(a,b) {
  if (a.name > b.name)
    return -1;
  if (a.name < b.name)
    return 1;
  return 0;
}

$(document).ready(getData);