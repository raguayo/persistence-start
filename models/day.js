/* eslint-disable camelcase */
var Sequelize = require('sequelize');
var db = require('./_db');
var Hotel = require('./hotel.js');
var Restaurant = require('./restaurant.js');
var Activity = require('./activity.js');

var Day = db.define('day', {
  number: Sequelize.INTEGER,
});

module.exports = Day
