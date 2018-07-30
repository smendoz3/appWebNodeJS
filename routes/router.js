var express = require('express');
var router = express.Router();
var User = require('../app/models/user');
var Route = require('../app/models/route');
// GET route for reading data
router.get('/login', function (req, res, next) {
  if (req.session.userId) {
	  res.redirect('/');
  }else{
	  res.render('login');
  }
});

router.get('/register', function (req, res, next) {
  if (req.session.userId) {
	  res.redirect('/');
  }else {
	  res.render('register');
  }
});

router.get('/', function (req, res, next) {
  if (req.session.userId) {
    console.log(req.session);
    User.findById(req.session.userId, function(err, query) {
      //console.log(query);
      res.render('index',{user: query});
    });    
    //query.select('name');
    //console.log(query);
    
  } else {
    res.redirect('/login');
    console.log(req.session);
  }
});

router.get('/routes', function(req, res, next) {
  var uname;
  // var routesArr = [];
  // var latArr = [];
  // var longArr = [];
  User.findById(req.session.userId ,function(err,usr){
    uname = usr.username;
  });
  Route.find({name : uname},function(err,routesq){
    //console.log(routes);
      // for (var i = 0; i < routes.length; i++) {
      //   routesArr[i] = routes[i]._id;
      //   for (var j = 0; j < routes[i].lat.length; j++){
      //     latArr[j] = routes[i].lat[j];
      //   }
      //   for (var k = 0; k < routes[i].long.length; k++){
      //     longArr[k] = routes[k].long[k];
      //   }
      //   //ArregloTitleVid[i] = videos[i].title;
      // }
      res.render('routes',{routes : routesq});
  });
  //res.redirect('/login');
  //console.log(req.session);
});

router.post('/route', function(req, res){
  console.log(req.body);
  var route = new Route(req.body);
  route.save(function(err) {
    console.log(route);
  });

});

//POST route for updating data
router.post('/', function (req, res, next) {
  // confirm that user typed same password twice
  console.log(req.session);
  if (req.body.password !== req.body.passwordConf) {
    var err = new Error('Passwords do not match.');
    err.status = 400;
    res.send("passwords dont match");
    return next(err);
  }

  if (req.body.email &&
    req.body.username &&
    req.body.password &&
    req.body.passwordConf) {

    var userData = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      passwordConf: req.body.passwordConf,
    }

    User.create(userData, function (error, user) {
      if (error) {
        return next(error);
      } else {
        req.session.userId = user._id;
        return res.redirect('/profile');
      }
    });

  } else if (req.body.logemail && req.body.logpassword) {
    User.authenticate(req.body.logemail, req.body.logpassword, function (error, user) {
      if (error || !user) {
        var err = new Error('Wrong email or password.');
        err.status = 401;
        return next(err);
      } else {
        //req.session.valid = true;
        req.session.userId = user._id;
        //return res.redirect('/');
        console.log(req.session.userId);
        var eje = true;
        //console.log(user);
        res.render('index',{user:user, welcome:eje})
      }
    });
  } else {
    var err = new Error('All fields required.');
    err.status = 400;
    return next(err);
  }
})

// GET route after registering
router.get('/profile', function (req, res, next) {
  User.findById(req.session.userId)
    .exec(function (error, user) {
      if (error) {
        return next(error);
      } else {
        if (user === null) {
          var err = new Error('Not authorized! Go back!');
          err.status = 400;
          return next(err);
        } else {
          return res.send('<h1>Name: </h1>' + user.username + '<h2>Mail: </h2>' + user.email + '<br><a type="button" href="/logout">Logout</a>')
        }
      }
    });
});

// GET for logout logout
router.get('/logout', function (req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
});

module.exports = router;
