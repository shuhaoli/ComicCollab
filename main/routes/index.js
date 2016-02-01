var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/main', function(req, res) {
  res.render('main', { title: 'Comic Book website' });
});

/* GET Create Profile page. */
router.get('/createprofile', function(req, res) {
  res.render('createprofile', { title: 'Create your profile' });
});

///* GET Default Home page. */
//router.get('/home', function(req, res) {
//  res.render('home', { title: 'Comic Books Home Page' });
//});

/* POST to UserList Page */
router.post('/createprofile', function(req, res) {

  // Set our internal DB variable
  var db = req.db;

  // Get our form values. These rely on the "name" attributes
  var userName = req.body.username;
  var password = req.body.password;
  var confirmPassword;

  if (!password == confirmPassword){
    res.send("Passwords do not match");
  }
  else {
    // Set our collection
    var collection = db.get('usercollection');
    // Submit to the DB
    collection.insert({
          "username": userName,
          "password": password
        }, function (err, doc) {
          if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
          }
          else {
            // And forward to home page
            res.redirect("home");
          }

        }
    );
  }
});

module.exports = router;
