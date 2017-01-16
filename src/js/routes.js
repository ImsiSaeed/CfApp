angular.module('cf').config([
			 '$routeProvider',
	function ($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: './src/pages/home.html',
			})

			.when('/nutrition', {
				templateUrl: './src/pages/nutrition.html',
			})

			.when('/fitness', {
				templateUrl: './src/pages/fitness.html',
			})

			.when('/appointments', {
				templateUrl: './src/pages/appointments.html',
				controller: 'AppointmentController as aptmt'
			})

			.when('/community', {
				templateUrl: './src/pages/community.html',
			})
			
			.when('/404', {
				templateUrl: './src/pages/errors/404.html',
			})

			.otherwise('404');
	}
]);