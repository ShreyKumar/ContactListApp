var myApp = angular.module('myApp', []);

myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http){
    
    console.log("Hello world from controller");
    

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
    
    $scope.validate = function(){
        try {
            var user_len = $scope.signup_username.length;
        } catch(TypeError){
            var user_len = 0;
        }
        try {
            var pass_len = $scope.signup_password.length;
        } catch(TypeError){
            var pass_len = 0;   
        }
        try {
            var confirm_len = $scope.signup_confirmpwd.length;   
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
        
        if($scope.signup_password != $scope.signup_confirmpwd) {
            $scope.signup_msg = "Passwords do not match";
            ready = false;
        };
        
        if($scope.ans != "7"){
            $scope.signup_msg = "Do you even math? The security question's answer is incorrect";
            ready = false;
        };
        
        return ready;
    };
    
    $scope.signup = function(){
        if($scope.validate()){
            
        }
    }

    
}]);