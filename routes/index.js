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
// 
var pg = require('pg');
//postgress://localhost:5432/students
router.get('/', function (req, res) {
  query("SELECT * FROM Students ORDER BY id;", (err, result) => {
    if (err) {
      return res.render('error', {
        error: err,
        message: err.message
      });
    }
    res.render('students', {
      students: result.rows,
      title: 'Students'
    });
  });
});


function query(SQL, callback) {
  pg.connect(process.env.DATABASE_URL || 'postgres://pnntgfdiggtbbe:e70020503957d0b52dbe89dee72ec8d051bde2fd70b00ab8ff9e5be7d1b6182b@ec2-204-236-218-242.compute-1.amazonaws.com:5432/d6m7cdkhg6kihd', (err, client, done) => {
    if (err) {
      callback(err);
    }
    client.query(SQL, (err, result) => {
      done();
      if (err) {
        callback(err);
      }
      callback(err, result);
    });
  })
}
/* GET addStudent page. */
router.get('/addStudent', function (req, res) {
  //in HTTP GET the parameters are passed in the query;
  // var firstName = req.query.firstName;
  // var lastName = req.query.lastName;
  // var email = req.query.email;

  res.render('addStudent', {
    title: 'Add Student'
  });
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


router.get('/students', function (req, res) {
  res.render('students', {
    students: students
  });
})


// router.get('/',
//   function (req, res, next) {
//     res.render('index', {
//       title: 'Express'
//     });
// });


module.exports = router;