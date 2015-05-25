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
        
        if(user_len == 0 || pass_len == 0 || confirm_len == 0 || ans_len == 0){
            $scope.signup_msg = "Some of your fields are empty. Please try again.";
            ready = false;
        };
        
        if($scope.signup.password != $scope.signup.confirmpwd) {
            $scope.signup_msg = "Passwords do not match";
            ready = false;
        };
        
        if($scope.ans != "7"){
            $scope.signup_msg = "The security question's answer is incorrect";
            ready = false;
        };
        
        if(ready){
            $scope.user = $scope.signup.username;   
        }
        return ready;
    };
    
    $scope.go_signup = function(){
        if($scope.validate()){
            $http.post('/identity', $scope.signup).success(function(response){
                window.location.href = "main.html";
            });
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