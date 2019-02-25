//Kapilan Santhiramohan
//February,25,2019

// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the game model
let book = require('../models/books');

/* GET home page. wildcard */
router.get('/', (req, res, next) => {
  res.render('content/index', {
    title: 'Home',
    books: ''
   });
});
/* Get Add / Edit Form  */

//router.get('/add', function(req, res, next) {
 // res.render('books/details', { books: "", title: 'Edit' })

//})
module.exports = router;

