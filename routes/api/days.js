var Promise = require('bluebird');
var router = require('express').Router();
var Hotel = require('../../models/hotel');
var Restaurant = require('../../models/restaurant');
var Activity = require('../../models/activity');
var Day = require('../../models/day');

router.get('/', function(req, res, next) {
  Day.findAll({})
  .then(days => {
    console.log('DAYS: ', days);
  })
  .catch(next);
});

router.get('/:id', function(req, res, next) {
  Day.findById({
    where: {id: req.params.id}
  })
  .then(days => {
    console.log('DAYS: ', days);
  })
  .catch(next);
});

router.delete('/:id', function(req, res, next) {
  Day.destroy({
    where: {id: req.params.id}
  })
  .then(days => {
    res.send.status(204);
  })
  .catch(next);
});

router.post('/', function(req, res, next) {
  Day.create({
  })
  .then(day => {
    res.send.status(204);
  })
  .catch(next);
});

router.post('/:id/restaurants', function(req, res, next) {
  Day.findById({
    where: {id: req.params.id}
  })
  .then(days => {
    res.json().status(200);
  })
  .catch(next);
});

router.delete('/:id/restaurants/:restaurantId', function(req, res, next) {
  Day.findById({
    where: {id: req.params.id}
  })
  .then(days => {
    res.json().status(200);
  })
  .catch(next);
});

router.post('/:id/activities', function(req, res, next) {
  Day.findById({
    where: {id: req.params.id}
  })
  .then(days => {
    res.json().status(200);
  })
  .catch(next);
});

router.delete('/:id/activities/:activityId', function(req, res, next) {
  Day.findById({
    where: {id: req.params.id}
  })
  .then(days => {
    res.json().status(200);
  })
  .catch(next);
});

router.post('/:id/hotels', function(req, res, next) {
  Day.findById({
    where: {id: req.params.id}
  })
  .then(days => {
    res.json().status(200);
  })
  .catch(next);
});

router.delete('/:id/hotels/:hotelId', function(req, res, next) {
  Day.findById({
    where: {id: req.params.id}
  })
  .then(days => {
    res.json().status(200);
  })
  .catch(next);
});

module.exports = router;
