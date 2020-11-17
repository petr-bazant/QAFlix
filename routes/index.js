const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/applications', (req, res, next) => {
  res.render('applications');
});

router.get('/login', (req, res, next) => {
  res.render('login');
});

module.exports = router;
