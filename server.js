var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('identity', ['identity']);
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

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

/*
//create service
app.factory('myService', function(){
    var savedData = {}
    function set(data){
        savedData = data;   
    }
    function get(){
        return savedData    
    }
    return {
        set: set,
        get: get
    }
    
});
*/

/*
app.get('/identity', function(req, res){
    console.log("I recieved a GET request");

    db.identity.find(function(err, docs){
        console.log(docs);
        res.json(docs);
    });
});
*/
    
app.post('/identity/:username', function(req, res){
    var username = req.params.username;
    db.identity.findAndModify({
        query: {username: username}, 
        update: {$push: {contacts: req.body}}
    }, function(err, doc){
        res.json(doc);
    });
    console.log("Username" + req.params.username);
    console.log("Body to post" + req.body);
    
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

app.put('/identity/:id', function(req, res){
    var id = req.params.id;
    console.log(req.body.name);
    db.identity.findAndModify({query: {_id: mongojs.ObjectId(id)},
    update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
    new: true}, function(err, doc){
        res.json(doc);
    });
});


app.listen(3000);
console.log("Server running");