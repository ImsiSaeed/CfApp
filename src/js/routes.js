angular.module('cp').config([
			 '$routeProvider',
	function ($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: './src/pages/home.html',
			})
			.when('/hlr', {
				templateUrl: './src/pages/hlr.html',
			})
			// .when('/sps',{
			// 	templateUrl: './src.pages/sps.html'
			// })
			// .when('/msc',{
			// 	templateUrl: './src.pages/msc.html'
			// })
			.when('/404', {
				templateUrl: './src/pages/404.html',
			})
			.otherwise('404');
	}
]);