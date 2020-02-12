const express = require('express')
const router = express.Router()

const Park = require('../models/park.model')
const Coaster = require('../models/coaster.model')


router.get('/', (req, res, next) => {
  Coaster.find()
    .populate('park_id')
    .then(allCoasters => res.render('coasters/coasters-index', { coasters: allCoasters }))
    .catch(err => next(new Error(err)))
})

router.get('/new', (req, res, next) => {
  Park.find()
    .then(allTheParks => res.render('coasters/new-coaster', { parks: allTheParks }))
    .catch(err => next(new Error(err)))
})

router.post('/new', (req, res, next) => {
  const { name, description, inversions, length, park } = req.body

  Coaster.create({ name, description, inversions, length, park_id: park })
    .then(() => res.redirect('/coasters'))
    .catch(err => next(new Error(err)))
})


router.get('/edit', (req, res, next) => {

  const coasterPromise = Coaster.findById(req.query.id)
  const parksPromise = Park.find()

  Promise.all([coasterPromise, parksPromise])
    .then(results => res.render('coasters/edit-coaster', { coaster: results[0], parks: results[1] }))
    .catch(err => next(new Error(err)))
})

router.post('/edit', (req, res, next) => {
  const { name, description, inversions, length, park } = req.body

  Coaster.findByIdAndUpdate(req.query.id, { name, description, inversions, length, park_id: park })
    .then(() => res.redirect(`/coasters/${req.query.id}`))
    .catch(err => next(new Error(err)))
})


router.get('/delete', (req, res, next) => {
  Coaster.findByIdAndDelete(req.query.id)
    .then(() => res.redirect('/coasters'))
    .catch(err => next(new Error(err)))
})


router.get('/:id', (req, res, next) => {
  Coaster.findById(req.params.id)
    .populate('park_id')
    .then(theCoaster => res.render('coasters/coaster-details', { coaster: theCoaster }))
    .catch(err => next(new Error(err)))
})

module.exports = router