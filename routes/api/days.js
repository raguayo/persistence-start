var Promise = require('bluebird');
var router = require('express').Router();
var Hotel = require('../../models/hotel');
var Restaurant = require('../../models/restaurant');
var Activity = require('../../models/activity');
var Day = require('../../models/day');

router.get('/', function(req, res, next) {
  Day.findAll({ include: [ {all: true} ]})
  .then(days => {
    console.log('You got all the days!');
    res.redirect('/')
  })
  .catch(next);
});

router.get('/:id', function(req, res, next) {
  // console.log("req.params.id", req.params.id)
  Day.findById(req.params.id)
  .then(day => {
    console.log('You got a day');
    res.send(day)
  })
  .catch(next);
});

router.delete('/:id', function(req, res, next) {
  Day.destroy({
    where: {id: req.params.id}
  })
  .then(day => {
    console.log('You deleted a day');
    res.sendStatus(204);
  })
  .catch(next);
});

router.post('/', function(req, res, next) {
  Day.create(req.body)
  .then(day => {
    console.log('You created a day');
    res.send(day);
  })
  .catch(next);
});

router.post('/:id/restaurants/:restaurantId', function(req, res, next) {
  console.log("restaurants dayId:", req.params.id)
  Day.findOrCreate({
    where: {
      id: req.params.id
    }
  })
  .spread((day, createdBool) => {
    console.log("createdBool", createdBool)
    return day.addRestaurant(req.body.restaurantId)
  })
  .then(day => {
    res.json(day).status(200);
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

router.post('/:id/activities/:activityId', function(req, res, next) {
  Day.findById(req.params.id)
  .then(day => {
    // console.log(req.body)
    return day.addActivity(req.body.activityId)
  })
  .then(day => {
    res.json(day).status(200);
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

router.post('/:id/hotel', function(req, res, next) {
  console.log("req.body:",req.body)
  console.log("req.params:",req.params)
  Day.create({number: req.params.id, hotelId: req.body.hotelId})
  .then(day => {
    res.json(day).status(200);
  })
  // return Day.update({
  //   where: {
  //     id: req.params.id,
  //     hotelId: req.body.hotelId
  //   }
  // })
  // .spread((numUpdated, days) => {
  //   res.json(days).status(200);
  // })
  .catch(next);
});

router.delete('/:id/hotel/:hotelId', function(req, res, next) {
  Day.findById({
    where: {id: req.params.id}
  })
  .then(days => {
    res.json().status(200);
  })
  .catch(next);
});

module.exports = router;
