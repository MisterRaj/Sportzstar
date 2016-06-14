var myApp = angular.module('Articles', ['ngTable']);
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
        var uploadUrl = "article/image.php";
        fileUpload.uploadFileToUrl(file, uploadUrl, $scope.article);
    };
    
}]);


myApp.service("nameService", ['$http', function($http, $filter){
  
  function filterData(data, filter){
    return $filter('filter')(data, filter)
  }
  
  function orderData(data, params){
    return params.sorting() ? $filter('orderBy')(data, params.orderBy()) : filteredData;
  }
  
  function sliceData(data, params){
    return data.slice((params.page() - 1) * params.count(), params.page() * params.count())
  }
  
  function transformData(data,filter,params){
    return sliceData( orderData( filterData(data,filter), params ), params);
  }
  
  var service = {
    cachedData:[],
    getData:function($defer, params, filter){
      if(service.cachedData.length>0){
        console.log("using cached data")
        var filteredData = filterData(service.cachedData,filter);
        transformedData = sliceData(orderData(filteredData,params),params);
        params.total(filteredData.length)
        $defer.resolve(transformedData);
      }
      else{
        console.log("fetching data")
        $http.get("data.json").success(function(resp)
        {
            console.log("Inside ftetching data");
            angular.copy(resp,service.cachedData)
            params.total(resp.length)
            var filteredData = $filter('filter')(resp, filter);
            transformedData = transformData(resp,filter,params) 
            $defer.resolve(transformedData);
        });
      }
    }
  };
  return service;  
}]);

myApp.controller('listArticle', ['$scope', function($scope, ngTableParams, nameService, $filter) {
    var data = nameService.data;

    $scope.tableParams = new ngTableParams(
        {
            page: 1,            // show first page
            count: 10,           // count per page
            sorting: {name:'asc'}
        },
        {
            total: 0, // length of data
            getData: function($defer, params) {
              nameService.getData($defer,params,$scope.filter);
        }
        });

    $scope.$watch("filter.$", function () {
        $scope.tableParams.reload();
    });
    
}]);

myApp.controller('MainCtrl', ['$scope', '$http','ngTableParams' ,
    function ($scope, $http, ngTableParams) {
    var tableData = []
    //Table configuration
    $scope.tableParams = new ngTableParams({
        page: 1,
        count: 6
    },{
        total:tableData.length,
        //Returns the data for rendering
        getData : function($defer,params){
            $http.get('data.json').then(function(response) {
                tableData = response.data.person;
                $defer.resolve(tableData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                params.total(tableData.length);
            });
        }
    });
}]);
