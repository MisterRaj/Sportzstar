var myApp = angular.module('Articles', ['ngTable']);
/************************ Article list ***********************************/
myApp.controller('listArticle', ['$scope','$filter','ngTableParams','nameService',function($scope, $filter, ngTableParams, nameService) {

    var data = nameService.data;
    
    $scope.tableParams = new ngTableParams(
    {
        page: 1,// show first page
        count: 5,// count per page
        sorting: {name:'asc'}
    },
    {
        total: 0, // length of data
        getData: function($defer, params) {
          nameService.getData($defer,params,$scope.filter);
        },
        counts: [],
        paginationMaxBlocks: 13,

    });

    $scope.$watch("filter.$", function () {
        $scope.tableParams.reload();
    });
    
}]);
myApp.service("nameService", function($http, $filter){
  
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
        var filteredData = filterData(service.cachedData,filter);
        transformedData = sliceData(orderData(filteredData,params),params);
        params.total(filteredData.length);
        $defer.resolve(transformedData);
      }
      else{
        $http.get("article/fetch-list.php")
        .success(function(resp)
        {
            angular.copy(resp,service.cachedData);
            params.total(resp.length);
            var filteredData = $filter('filter')(resp, filter);
            transformedData = transformData(resp,filter,params);
            $defer.resolve(transformedData);
        });
      }
    }
  };
  return service;  
});
/************************ Article list ***********************************/

/************************ Article Insert *********************************/
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
        .success(function(response){
            /*if(response.success){
              FlashService.Error(response.message);
            }*/
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
        var uploadUrl = "article/add-article.php";
        fileUpload.uploadFileToUrl(file, uploadUrl, $scope.article);
    };
    
}]);
/************************ Article Insert *********************************/
/************************ Article Edit ***********************************/
myApp.service('editArt', ['$http', function ($http) {
    this.getData = function(url, id){
        return $http.post(url, id, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(response){
          console.log(response);
        });
    }
}]);


myApp.controller('editArticle', ['$scope', '$http','$routeParams', 'editArt',function($scope,$http, $routeParams, editArt){
    $scope.article = {};
    $scope.statusList = [{title: 'New', id: 1, role: "Author"},{title: 'Approved', id: 2, role: "Admin"},{title: 'Rejected', id: 3, role: "Admin"}];
    $scope.categories = [{title: 'Cricket',id: 1},{title: 'Football',id: 2 },{title: 'Tennis',id: 3},{title: 'Golf',id: 4,}];

    var id = $routeParams.id;
    article = "";
    //$scope.article = editArt.getData('article/get-article.php',{id: id});
    $http.post('article/get-article.php',{id: id})
    .then(function(response){
        $scope.article = response.data[0];
        console.log(response.data);
      });
}]);

/************************ Article Edit ***********************************/