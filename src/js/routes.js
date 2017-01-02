angular.module('cf').config([
			 '$routeProvider',
	function ($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: './src/pages/home.html',
			})
			.when('/medicines', {
				templateUrl: './src/pages/medicines.html',
				controller: 'MedicinesController as meds'
			})

			.when('/nutrition', {
				templateUrl: './src/pages/nutrition.html',
			})

			.when('/404', {
				templateUrl: './src/pages/errors/404.html',
			})

			.otherwise('404');
	}
]);