'use strict';
/* global $ tripModule attractionsModule hotels restaurants activities */

/**
 * This module fills the `select` tags with `option`s.
 * It runs immediately upon document ready (not called by other modules).
 * Each `option` displays the name of an attraction and is has a value of
 * that attraction's id. Selecting an option looks up the attraction by id,
 * then tells the trip module to add the attraction.
 */

let hotels = [];
let restaurants = [];
let activities = [];
let enhanced = {}

$(function(){

  // jQuery selects
  var $optionsPanel = $('#options-panel');
  var $hotelSelect = $optionsPanel.find('#hotel-choices');
  var $restaurantSelect = $optionsPanel.find('#restaurant-choices');
  var $activitySelect = $optionsPanel.find('#activity-choices');

  $.get('/api/hotels')
  .then(retrievedHotels => {
    retrievedHotels.forEach(function(hotel) {
      var $option = $('<option></option>') // makes a new option tag
        .text(hotel.name)
        .val(hotel.id);
      $hotelSelect.append($option); // add the option to the specific select
    })
    hotels = retrievedHotels
  })
  .catch(function(err) {
    console.error.bind(console);
  });

  $.get('/api/restaurants')
  .then(retrievedRestaurants => {
    retrievedRestaurants.forEach(function(restaurant) {
      var $option = $('<option></option>') // makes a new option tag
        .text(restaurant.name)
        .val(restaurant.id);
      $restaurantSelect.append($option); // add the option to the specific select
    })
    restaurants = retrievedRestaurants
  })
  .catch(function(err) {
    console.error.bind(console);
  });

  $.get('/api/activities')
  .then(retrievedActivities => {
    retrievedActivities.forEach(function(activity) {
      var $option = $('<option></option>') // makes a new option tag
        .text(activity.name)
        .val(activity.id);
      $activitySelect.append($option); // add the option to the specific select
    })
    activities = retrievedActivities
  })
  .catch(function(err) {
    console.error.bind(console);
  });


  // what to do when the `+` button next to a `select` is clicked
  $optionsPanel.on('click', 'button[data-action="add"]', function () {
    var $select = $(this).siblings('select');

    // application state
    enhanced = {
      hotels: hotels.map(attractionModule.create),
      restaurants: restaurants.map(attractionModule.create),
      activities: activities.map(attractionModule.create),
    };

    var type = $select.data('type'); // from HTML data-type attribute
    var id = $select.find(':selected').val();
    // get associated attraction and add it to the current day in the trip
    console.log("type & id", type, id)
    var attraction = attractionsModule.getByTypeAndId(type, id);
    tripModule.addToCurrent(attraction);
  })
 })
