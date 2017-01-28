var app = angular.module('cp', [
	'ngRoute',
	'ngMaterial',
	'ngMessages'
]);

app.run([
			 '$http',
	function ($http) {
		$http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
	}
]);

app.controller('AddKIController', function ($mdDialog, $http, $mdToast) {
	var ak = this;
	ak.isLoading = false;

	ak.ki = {};

	ak.save = function () {
		ak.isLoading = true;
		$http.post('./server.php?t=ak', ak.ki).then(function (data) {
			ak.isLoading = false;
			if (angular.isDefined(data)) {
				$mdToast.show(
					$mdToast.simple()
						.hideDelay(3000)
						.textContent(data.data.response)
				);

				if (data.data.status == 200) {
					$mdDialog.hide();
				}
			} else {
				console.log("The server did not respond at all");
			}
		})
	}

	ak.reset = function () {
		ak.ki = {};
	}

	ak.cancel = function () {
		$mdDialog.hide();
	}
})

app.controller('CPController', function ($scope, $rootScope, $mdSidenav, $location, $mdDialog) {
	var cp = this;

	$rootScope.title = "CP";

	cp.showADDKIDialog = function (ev) {
		$mdDialog.show(
			{
				templateUrl: './src/dialogs/addki.html',
				controller: 'AddKIController as ak',
				clickOutsideToClose: false,
				targetEvent: ev
			}
		);
	}

	cp.showRMVKIDialog = function (ev) {
		$mdDialog.show(
			{
				templateUrl: './src/dialogs/addki.html',
				controller: 'AddKIController as ak',
				clickOutsideToClose: false,
				targetEvent: ev
			}
		);
	}

	cp.showLSTKIDialog = function (ev) {
		$mdDialog.show(
			{
				templateUrl: './src/dialogs/addki.html',
				controller: 'AddKIController as ak',
				clickOutsideToClose: false,
				targetEvent: ev
			}
		);
	}

	cp.hlr = [];
	cp.hlr.push(
		{
			name: "KI Management",
			buttons: [
				{
					name: "ADD KI",
					class: "md-primary",
					click: 'showADDKIDialog'
				},
				{
					name: "RMV KI",
					class: "md-primary",
					click: 'showRMVKIDialog'
				},
				{
					name: "LST KI",
					class: "md-primary",
					click: 'showLSTKIDialog'
				}
			]
		}
	);

	cp.menu = function () {
		$mdSidenav('sideNav').toggle();
	}

	cp.goTo = function (page) {
		$location.path(page);
		$mdSidenav('sideNav').toggle();
	}

});

app.config([
			 '$mdThemingProvider',
	function ($mdThemingProvider) {
	$mdThemingProvider
		.theme('default')
		.primaryPalette('blue')
		.accentPalette('pink')
		.warnPalette('orange')
		.backgroundPalette('grey');
	}
]);