//import statement
var express = require('express');

//router: get an instance of the router;
var router = express.Router();

/*
  var btn = document.getElementById('myBtn');
  btn.addEventListener('click', function(){
    alert('You Clicked!');
  });
*/

/* GET home page. */

function indexListener(req, res) {
  res.render('index');
}


router.get('/', indexListener);

/* GET addStudent page. */
router.get('/addStudent', function (req, res) {
  //in HTTP GET the parameters are passed in the query;
  // var firstName = req.query.firstName;
  // var lastName = req.query.lastName;
  // var email = req.query.email;

  res.render('addStudent', {title:'Add Student'});
});

var students = [];
router.post('/addStudent', function (req, res) {
  //in post the parameters are passed in the body
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var email = req.body.email;

  students.push({
    firstName: firstName,
    lastName: lastName,
    email: email
  });

  res.render('addStudent', {
    firstName: firstName,
    lastName: lastName,
    email: email
  });
});


router.get('/students', function(req, res){
  res.render('students', {students:students});
})


// router.get('/',
//   function (req, res, next) {
//     res.render('index', {
//       title: 'Express'
//     });
// });


module.exports = router;