//Kapilan Santhiramohan
//February,25,2019

// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');


/* GET books List page. READ */
router.get('/', (req, res, next) => {

  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {
  res.render('books/details', { title: 'Details', books:"" });
});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {

   //Create a document
   let bookadd = book({
     "Title": req.body.title,
     "Price": req.body.price,
     "Author": req.body.author, 
     "Genre" : req.body.genre
   });

 

   //next use the CREATE of mongoose
   book.create(bookadd, (err, book) => {
        if(err)
        {
          console.log(err);
          res.end(err)
        }
        else
        {
          console.log("success")
          res.redirect('/books');
        }
   });
  //  res.redirect('/books');

});

// GET the Book Details page in order to edit an existing Book
router.get("/edit/:id", (req, res, next) => {
  let id = req.params.id;
  book.findById({ _id: id }, (err, bookobj) => {
    if (err) {
      res.end(err);

      return console.error(err);
    } else {
      res.render("books/details", {title: "Edit Books", books: bookobj
      });
    }
  });
});

// POST - process the information passed from the details form and update the document
router.post('/edit/:id', (req, res, next) => {
  let id = req.params.id;

  let bookedit = book({
    _id: id,
    "Title": req.body.title,
    "Author": req.body.author,
    "Price": req.body.price,
    "Genre": req.body.genre
  });

  book.update({_id:id}, bookedit, (err,book) =>
  {
    if(err)
    {
      console.log(err);
      res.end(err)
    }
 else
 {
    console.log("success")
     res.redirect('/books');
 }
  });
  
  
});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {
  let id = req.params.id;
  book.remove({ _id: id }, (err, book) => 
  {
    if (err) 
    {
      console.log(err);
      res.end(err);
    } else {
      res.redirect("/books");
    }
 
});
})


module.exports = router;
