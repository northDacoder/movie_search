
var app = angular.module("movieApp", ['ui.bootstrap', 'ngResource']);

app.factory('rotten_tomatoes', function($resource){

	return {
		fetchMovie: function(query, nummovies, callback){
			var search_query = query;
			var search_limit = nummovies-1;


			var api = $resource('http://api.rottentomatoes.com/api/public/v1.0/movies.json?apikey=:key&q=:movie_title&page_limit=:limit&callback=JSON_CALLBACK', {
				key: 'dpjxf3xsjbpj5wpmduveeseb',
				limit: 10
			}, {
				fetch:{method:'JSONP'}
			});

			api.fetch({movie_title: search_query, limit: search_limit}, function(response){

				callback(response);

			});
		}
	}

});

app.controller('movieController', function($scope, rotten_tomatoes){

	$scope.title = "";

	$scope.search = function() {
		var query = $scope.title;
		var nummovies = $scope.limit;

		rotten_tomatoes.fetchMovie(query, nummovies, function(data){

			var result = data.movies;
			$scope.result = result;

		});
	}
});
