var myApp = angular.module('addArticles', []);
myApp.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            
            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);

myApp.service('fileUpload', ['$http', function ($http) {
    this.uploadFileToUrl = function(file, uploadUrl, data){
        var fd = new FormData();
        fd.append('file', file);
        console.log("Data" + JSON.stringify(data));
        for(var key in data)
        	fd.append(key, data[key]);
				
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(){
        })
        .error(function(){
        });
    }
}]);

myApp.controller('createArticle', ['$scope', 'fileUpload', function($scope, fileUpload){
    $scope.article = {};
    $scope.pattern = "/^ \w+( +\w+)*$";
    $scope.statusList = [{title: 'New', id: 1, role: "Author"},{title: 'Approved', id: 2, role: "Admin"},{title: 'Rejected', id: 3, role: "Admin"}];
	$scope.categories = [{title: 'Cricket',id: 1},{title: 'Football',id: 2 },{title: 'Tennis',id: 3},{title: 'Golf',id: 4,}];
    $scope.uploadFile = function(){
        var file = $scope.myFile;
        console.log('file is ' );
        console.dir(file);
        console.log($scope.article);
        var uploadUrl = "/sports/angular-seed/app/article/image.php";
        fileUpload.uploadFileToUrl(file, uploadUrl, $scope.article);
    };
    
}]);