const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Bathroom = require('../../models/Bathroom');
const validateBathroomInput = require('../../validation/bathrooms');

router.get('/', (req, res) => {
    Bathroom.find()
        .sort({ date: -1 })
        .then(bathrooms => res.json(bathrooms))
        .catch(err => res.status(404).json({ norestroomsfound: 'No restrooms found' }));
});

router.get('/user/:user_id', (req, res) => {
    Bathroom.find({user: req.params.user_id})
        .then(bathrooms => res.json(bathrooms))
        .catch(err =>
            res.status(404).json({ notbathroomsfound: 'No bathrooms found from that user' }
        )
    );
});

router.get('/:id', (req, res) => {
    Bathroom.findById(req.params.id)
        .then(bathroom => res.json(bathroom))
        .catch(err =>
            res.status(404).json({ nobathroomfound: 'No bathroom found with that ID' })
        );
});

router.post('/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      const { errors, isValid } = validateBathroomInput(req.body);
  
      if (!isValid) {
        return res.status(400).json(errors);
      }
  
      const newBathroom = new Bathroom({
        location: req.body.location,
        title: req.body.title,
        description: req.body.description,
        rating: req.body.rating,
        user: req.user.id
      });
  
      newBathroom.save().then(bathroom => res.json(bathroom));
    }
  );

module.exports = router;