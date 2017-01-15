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
  query("SELECT * FROM Students ORDER BY id;", [], (err, result) => {
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


function query(SQL, params, callback) {
  pg.connect(process.env.DATABASE_URL, (err, client, done) => {
    if (err) {
      //connection error
      return callback(err);
    }
    client.query(SQL, params, (err, result) => {
      done();
      if (err) {
        return callback(err);
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



router.post('/addStudent', function (req, res) {
  //in post the parameters are passed in the body
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var email = req.body.email;

  console.log('Post To addStudent');
  console.log(firstName, lastName, email);
  var SQL = "INSERT INTO Students(firstName, lastName, email) VALUES($1, $2, $3)";
  query(SQL, [firstName, lastName, email], (err, result) => {
    if (err) {
      console.log('error', err);
      return res.render('error', {
        error: err,
        message: err.message
      });
    }
    console.log('rendering addStudent')
    console.log("Result: ", result);
    res.render('addStudent', {
      firstName: firstName,
      lastName: lastName,
      email: email
    })

  });
});





// router.get('/',
//   function (req, res, next) {
//     res.render('index', {
//       title: 'Express'
//     });
// });


module.exports = router;