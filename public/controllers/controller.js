var myApp = angular.module('myApp', []);

myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http){
    
    console.log("Hello world from controller");
    
    $http.get().success(function(response){
        
    });

    var refresh = function(){
        $http.get('/identity').success(function(response){
            console.log("I got data I requested");
            $scope.contactlist = response;
            $scope.contact = "";
        });
    }
refresh();
    
    $scope.addContact = function() {
        console.log($scope.contact);
        $http.post('/identity', $scope.contact).success(function(response){
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
    
    //display
    $http.get('/identity/' + $scope.user).success(function(response){
        
    });
    
    $scope.validate = function(){
        try {
            var user_len = $scope.signup.username.length;
        } catch(TypeError){
            var user_len = 0;
        }
        try {
            var pass_len = $scope.signup.password.length;
        } catch(TypeError){
            var pass_len = 0;   
        }
        try {
            var confirm_len = $scope.signup.confirmpwd.length;   
        } catch(TypeError){
            var confirm_len = 0;   
        }
        try {
            var ans_len = $scope.ans.length;   
        } catch(TypeError){
            var ans_len = 0;
        }
        
        var ready = true;
        console.log(ready);
        
        //validate empty fields
        if(user_len == 0 || pass_len == 0 || confirm_len == 0 || ans_len == 0){
            $scope.signup_msg = "Some of your fields are empty. Please try again.";
            ready = false;
        console.log(ready);
        } else if(user_len <= 5 || !/[0-9a-zA-Z]*$/.test($scope.signup.username)){
            $scope.signup_msg = "Your username must be more than 5 characters and must contain only integers, uppercase or lowercase characters";
            ready = false;
        } else if(pass_len <= 5){
            $scope.signup_msg = "Your password must be more than 5 characters";
            ready = false;
        };
        
        //validate passwords
        if($scope.signup.password != $scope.signup.confirmpwd) {
            $scope.signup_msg = "Passwords do not match";
            ready = false;
        console.log(ready);
        };
        
        //validate confirm password
        if($scope.ans != "7"){
            $scope.signup_msg = "The security question's answer is incorrect";
            ready = false;
            console.log(ready);
        };
        
        console.log(ready);
        if(ready){
            window.user = $scope.signup.username;   
        }
        return ready;
    };
    
    $scope.validate_username = function(){
        $http.get('/identity/' + $scope.signup.username).success(function(response){
            if($scope.signup.username == response.username){
                return false;
            } else {
                return true;   
            }
        });   
    }
    
    $scope.go_signup = function(){
        if($scope.validate() && $scope.validate_username()){
            $http.post('/identity', $scope.signup).success(function(response){
                console.log('validation complete');
                //window.location.href = "main.html";
            });
            
        } else if(!$scope.validate_username()){
            $scope.signin_msg = "Username taken. Please pick another one";
        }
    }
    
    $scope.signin = function(){
        if($scope.signin.username.length == 0 || $scope.signin.username.length == 0){
            $scope.signin_msg = "Some of your fields are empty. Please try again.";   
        } else {
            $http.get('/identity/' + $scope.signin.username).success(function(response){
                 
            });
        }
    }

    
}]);