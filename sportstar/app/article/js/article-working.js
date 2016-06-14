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