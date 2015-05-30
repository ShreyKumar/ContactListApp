var myApp = angular.module('myApp', []);

myApp.controller('AppCtrl', ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http){
    
    console.log("Hello world from controller");

    
    $scope.load_user = function(){
        if(window.location.pathname == '/main.html'){
            console.log("Hello world!");
            $scope.user = localStorage.getItem("user");
        }
    }
    
    var refresh = function(){
        console.log($scope.user);
        $http.get('/identity/' + $scope.user).success(function(response){
            $scope.contactlist = response.contacts;
        });
    }
    $scope.load_user();
    refresh();
    
    $scope.addContact = function() {
        console.log($scope.contact);
        $http.post('/identity/' + $scope.user, $scope.contact).success(function(response){
           console.log(response);
            refresh();
        });
    };
    
    $scope.remove = function(id){
        console.log(id);
        $http.delete("/identity/" + id).success(function(response){
            refresh();
        });
    }
    
$scope.edit = function(id) {
  console.log(id);
  $http.get('/identity/' + id).success(function(response) {
    $scope.contact = response;
  });
}; 
    
    $scope.update = function(){
        console.log($scope.contact._id);
        $http.put('/identity/' + $scope.contact._id, $scope.contact).success(function(response){
            refresh();
        });
    }
    
    $scope.deselect = function(){
        $scope.contact = "";
    };
    
    $scope.reset_signup = function(){
        $scope.signup = undefined;
        $scope.signup_confirmpwd = undefined;
        $scope.ans = undefined;
    }
    
    $scope.go_signup = function(){
        //check for completed fields
        var isEmpty = $scope.signup === undefined || $scope.signup.username === undefined || $scope.signup.password === undefined || $scope.signup_confirmpwd === undefined || $scope.ans === undefined;
        if(isEmpty){
            $scope.signup_msg = "Please fill in all fields";
            $scope.reset_signup();
        } else if($scope.signup.username.length < 5 || $scope.signup.password.length < 5){
            $scope.signup_msg = "Username and password both have to be 5 characters or more";
            $scope.reset_signup();
        } else if(!/^[a-zA-Z0-9äöüÄÖÜ]*$/.test($scope.signup.username)){
            $scope.signup_msg = "Username must only contain uppercase, lowercase or integers";
            $scope.reset_signup();
        } else if($scope.signup.password != $scope.signup_confirmpwd){
            $scope.signup_msg = "Passwords do not match. Please try again.";
            $scope.reset_signup();
        } else if($scope.ans != '7'){
            $scope.signup_msg = "5 + 2 isn't " + $scope.ans;
            $scope.reset_signup();
        } else {
            $http.get('/identity/' + $scope.signup.username).success(function(response){
                if($scope.signup.username == response.username){
                    $scope.signup_msg = "Username taken. Please pick another";
                    $scope.reset_signup();
                } else {
                    console.log("Authentication complete");
                    localStorage.setItem("user", response.username);
                    window.location.href = "main.html";
                }
            });   
        }
    }

    $scope.go_signin = function(){
        if($scope.signin === undefined || $scope.signin.username === undefined || $scope.signin.password === undefined){
            $scope.signin_msg = "Some of your fields are empty. Please try again.";
            $scope.signin = undefined;
            console.log($scope.signin);
        } else {
            $http.get('/identity/' + $scope.signin.username).success(function(response){
                console.log(response === null);
                if(response === null){
                    $scope.signin_msg = "Username or Password not found.";
                    $scope.signin = undefined;
                    console.log($scope.signin);
                } else {
                    console.log("Authentication complete");
                    localStorage.setItem("user", response.username);
                    window.location.href = "main.html";
                }
            });
        }
    }
    

    
}]);