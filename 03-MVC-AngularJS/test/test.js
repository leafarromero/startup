describe('list', function () {

	beforeEach(module('movieList'));

	let $controller;

	beforeEach(inject(function(_$controller_){
		$controller = _$controller_;
	}));

	describe('suite para controlador de lista', function(){
		
		let $scope, controller;

		beforeEach(function(){
			$scope = {};
			controller = $controller('listCtrl', {$scope : $scope}); 
		});

		it('agregar y remover de la lista', function(){
			
			$scope.name = 'asd';
			$scope.year = '1999';
			$scope.duration = '555';
			$scope.addMovie();
			expect($scope.$storage.records.length).toEqual(4);
			$scope.removeMovie(3);
			expect($scope.$storage.records.length).toEqual(3);
		});

		it('detallar película', inject(function(detailService){

			let movie = {
				name : 'Pulp Fiction',
				year : '1994',
				duration : '154'
			};

			$scope.detailMovie(movie);

			expect(detailService.getMovie()).toBe(movie);

		}));

	});

	describe('suite para controlador de detalles', function(){

		let $rootScope, $scope, controller;

		let movie = {
				name : 'Pulp Fiction',
				year : '1994',
				duration : '154'
			};

		beforeEach(inject(function(detailService, _$rootScope_){

			$rootScope = _$rootScope_;
			$scope = $rootScope.$new();

			$scope.$storage = {records: [movie]}

			detailService.setMovie(movie);
			
			controller = $controller('detailCtrl', {$scope : $scope}); 
		}));

		it('editar peliculas', inject(function(detailService){

			$scope.newName = 'Tiempos violentos';
			$scope.newYear = 'Mil novecientos noventa y cuatro';
			$scope.newDuration = '2hs 34min';

			$scope.editMovie();

			let newMovie = {
				name : $scope.newName,
				year : $scope.newYear,
				duration : $scope.newDuration
			};

			expect(detailService.getMovie()).toEqual(newMovie);
		}));

	});

});