var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('mongodb://ShreyKumar:8809asAS@ds034208.mongolab.com:34208/identity', ['identity']);
var bodyParser = require('body-parser');
//var passport = require('passport'), FacebookStrategy = require('passport-facebook').Strategy;

/******************** FACEBOOK OAUTH ***********************/
/*
passport.use(new FacebookStrategy({
    clientID: "776709159110384",
    clientSecret: "007b3e789ba0bb10580b36bbb92ac4eb",
    callbackURL: "/auth/facebook/callback"
}, function(accessToken, refreshToken, profile, done) {
    // Set the provider data and include tokens
    var providerData = profile._json;
    providerData.accessToken = accessToken;
    providerData.refreshToken = refreshToken;

    // Create the user OAuth profile
    var providerUserProfile = {
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        displayName: profile.displayName,
        email: profile.emails[0].value,
        username: profile.username,
        provider: 'facebook',
        providerIdentifierField: 'id',
        providerData: providerData
    };

    // Save the user OAuth profile
    users.saveOAuthUserProfile(req, providerUserProfile, done);
  }
));

app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/main.html',
                                      failureRedirect: '/index.html' }));
*/
/***************END FACEBOOK OAUTH ******************/
/* COMING SOON IN NEXT VERSION*/
/*
var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = 'mongodb://ShreyKumar:8809asAS@ds034208.mongolab.com:34208/identity';
// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server");

  db.close();
});
*/

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
    
app.post('/identity/:username', function(req, res){
    var username = req.params.username;
    console.log(req);
    db.identity.findAndModify({
        query: {username: username}, 
        update: {$push: {contacts: req.body}}
    }, function(err, doc){
        res.json(doc);
    });
    console.log("Username" + req.params.username);
    console.log("Body to post" + req.body);
    
});
app.post('/identity/:username/:password', function(req, res){
    db.identity.insert({
        username : req.params.username,
        password : req.params.password,
        contacts : []
    }, function(err, res){
        console.log(res);
    });
});

app.post("/identity/:user/:name/:email/:number", function(req, res){
    var user = req.params.user;
    var name = req.params.name;
    var email = req.params.email;
    var number = req.params.number;
    var contacts = req.body;
    
    var poped = []
    for(var i = 0; i < contacts.length; i++){
        if(contacts[i].name != name && contacts[i].email != email && contacts[i].number != number){
            console.log(i);
            poped.push(contacts[i]);
        }
    }
    console.log(poped);
    
    db.identity.findAndModify({
        query: {username: user},
        update: {$set: {contacts: poped}}
    }, function(err, doc){
        res.json(doc); 
    });
    
});

app.delete("/identity/:id", function(req, res){
    var id = req.params.id; 
    console.log(id);
    db.identity.remove({_id: mongojs.ObjectId(id)}, function(err, doc){
        res.json(doc);
    });
});

app.get('/identity/:username', function(req, res){
    var user = req.params.username;
    console.log('Username' + req.params.username);
    db.identity.findOne({username: user}, function(err, doc){
        console.log(doc);
        res.json(doc);  
    });
    
});

app.get('/identity/:id', function(req, res){
    var id = req.params.id;
    console.log(id);
    db.identity.findOne({_id: mongojs.ObjectId(id)}, function(err, doc){
        res.json(doc);
    });
});

app.put('/identity/:username/:name/:email/:number', function(req, res){
    var contactlist = req.body[0];
    var new_contact = req.body[1];
    console.log(req.body[1]);
    for(var i = 0; i < contactlist.length; i++){
        if(contactlist[i].name == req.params.name && contactlist[i].email == req.params.email && contactlist[i].number == req.params.number){
            contactlist[i].name = new_contact.name;
            contactlist[i].number = new_contact.number;
            contactlist[i].email = new_contact.email;
        }
    }
    console.log(contactlist);
    db.identity.findAndModify({
        query: {username: req.params.username},
        update: {$set: {contacts: contactlist}}
    }, function(err, doc){
        console.log('success');
        res.json(doc);
    });
});


app.listen(process.env.PORT || 3000);
console.log("Server running");