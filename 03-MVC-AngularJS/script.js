
let movieList = angular.module('movieList', ["ngStorage", "ngRoute"]);


movieList.config( function($routeProvider, $locationProvider){
  $routeProvider
  .when("/", {
    template:"Los detalles van aca."
  })
  .when("/detail", {
    templateUrl: 'detail.html',
    controller: "detailCtrl"
  })
  .when("/edit", {
    templateUrl: 'edit.html',
    controller: 'detailCtrl'
  })
  .when("/test", {
    template: "Anda bo"
  });

  $locationProvider.html5Mode(true);

});

movieList.service('detailService', function(){
  let movie;

  let setMovie = function(movie){
    this.movie = movie;
  }

  let getMovie = function(){
    return this.movie
  }

  return{
    setMovie: setMovie,
    getMovie: getMovie
  };
});

movieList.controller('listCtrl',
  ['$scope', '$rootScope', '$location', '$localStorage', 'detailService',
  function($scope, $rootScope, $location, $localStorage, detailService){
  
  $location.path("/");

  $scope.$storage = $localStorage.$default({
    records : [
    {
      name : "Dr. Strangelove",
      year : 1964,
      duration :93
    },
    {
      name : "The godfather",
      year : 1972,
      duration :177
    },
    {
      name : "Pulp fiction",
      year : 1994,
      duration :154
    }
  ]});


  $scope.addMovie = function(){
    $scope.$storage.records.push({
      name: $scope.name,
      year: $scope.year,
      duration: $scope.duration
    });
  };

  $scope.removeMovie = function(index){
    $scope.$storage.records.splice(index, 1);
  };

  $scope.detailMovie = function(movie){
    detailService.setMovie(movie);
    $rootScope.$broadcast('nuevoDetalle');
  };


}]);

movieList.controller('detailCtrl', ['$scope', 'detailService', function($scope, detailService){
  
  let movie = detailService.getMovie();
  $scope.name = movie.name;
  $scope.year = movie.year;
  $scope.duration = movie.duration;
  
  $scope.$on('nuevoDetalle', function(){
    movie = detailService.getMovie();
    $scope.name = movie.name;
    $scope.year = movie.year;
    $scope.duration = movie.duration;
  });

  $scope.editMovie = function(){
  let detailed = detailService.getMovie();
  let index = $scope.$storage.records.indexOf(detailed);

  if ($scope.newName) {$scope.$storage.records[index].name = $scope.newName;}
  if ($scope.newYear) {$scope.$storage.records[index].year = $scope.newYear;}
  if ($scope.newDuration) {$scope.$storage.records[index].duration = $scope.newDuration;}
         
  }
  
}]);


