var myApp = angular.module('Registration',['ngRoute']);
/************************ Add User ***********************************/
myApp.controller('addUser', ['$scope','$http', function($scope, $http){
    $scope.registration = {};
    $scope.errorList = {};
    $scope.validate = function(){
      var reg = $scope.registration;
      delete reg.cpassword;
      $http.post("user/add-user.php",reg).success(function(resp)
      {
          
      });

      /*if($scope.registration.password !== $scope.registration.cpassword){
        $scope.errorList = {password: "Passwords are not matching"};
      }*/
      console.log("Password"+$scope.registration.password);
      console.log("Confirm Password"+$scope.registration.cpassword);
    };

}]);
/************************ Add User *********************************/