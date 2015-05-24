var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('contactlist', ['contactlist']);
var bodyParser = require('body-parser');
var passport = require('passport'), FacebookStrategy = require('passport-facebook').Strategy;

/******************** FACEBOOK OAUTH ***********************/
passport.use(new FacebookStrategy({
    clientID: "776709159110384",
    clientSecret: "007b3e789ba0bb10580b36bbb92ac4eb",
    callbackURL: "main.html"
}, function(accessToken, refreshToken, profile, done) {
    User.findOrCreate(function(err, user) {
      if (err) { return done(err); }
      done(null, user);
    });
  }
));
/***************END FACEBOOK OAUTH ******************/

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/contactlist', function(req, res){
    console.log("I recieved a GET request");

    db.contactlist.find(function(err, docs){
        console.log(docs);
        res.json(docs);
    });
});
    
app.post('/contactlist', function(req, res){
    console.log(req.body);
    db.contactlist.insert(req.body, function(err, doc){
        res.json(doc);
    });
});

app.delete("/contactlist/:id", function(req, res){
    var id = req.params.id; 
    console.log(id);
    db.contactlist.remove({_id: mongojs.ObjectId(id)}, function(err, doc){
        res.json(doc);
    });
});

app.get('/contactlist/:id', function(req, res){
    var id = req.params.id;
    console.log(id);
    db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function(err, doc){
        res.json(doc);
    });
});

app.put('/contactlist/:id', function(req, res){
    var id = req.params.id;
    console.log(req.body.name);
    db.contactlist.findAndModify({query: {_id: mongojs.ObjectId(id)},
    update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
    new: true}, function(err, doc){
        res.json(doc);
    });
});


app.listen(3000);
console.log("Server running");