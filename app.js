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
function sortData(array ,method, node, parent) {//    ie: sortData(STATE.koms, alphabeticalAscend)
  // return array.map((item, i) => testSort(item,array[i+1], criteria));
  // return _.sortBy(array, [function(o) { return o.name; }]);
  return array.sort(function(a,b){
    // if (a.segment[criteria] < b.segment[criteria])
    //   return -1;
    // if (a.segment[criteria] > b.segment[criteria])
    //   return 1;
    return alphabeticalAscend(a,b,node,parent);
  });
}
function alphabeticalAscend(a,b,c,parent) {
  // console.log(a,b,c);
  if(parent){
    if (a[parent][c] < b[parent][c])
      return -1;
    if (a[parent][c] > b[parent][c])
      return 1;
  }
  if (a[c] < b[c])
    return -1;
  if (a[c] > b[c])
    return 1;
  // return testSort();
}
function alphabeticalDescend(a,b) {
  if (a.name > b.name)
    return -1;
  if (a.name < b.name)
    return 1;
  return 0;
}
//
function testSort(a,b,c) {
  console.log(b);
  if (a[c] < b[c])
    return -1;
  if (a[c] > b[c])
    return 1;
  return 0;
}

//write function with my own sorting method, or have sorting method for each criteria (ie name);
//array.map() to sort array of objects by object parameter

$(document).ready(getData);