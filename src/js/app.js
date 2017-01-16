var app = angular.module('cp', [
	'ngRoute',
	'ngMaterial',
	'ngMessages'
]);

app.controller('AddKIController', function ($mdDialog) {
	var ak = this;

	ak.ki = {};

	ak.save = function () {
		console.log(ak.ki);
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
				clickOutsideToClose: true,
				targetEvent: ev
			}
		);
	}

	cp.showRMVKIDialog = function (ev) {
		$mdDialog.show(
			{
				templateUrl: './src/dialogs/addki.html',
				controller: 'AddKIController as ak',
				clickOutsideToClose: true,
				targetEvent: ev
			}
		);
	}

	cp.showLSTKIDialog = function (ev) {
		$mdDialog.show(
			{
				templateUrl: './src/dialogs/addki.html',
				controller: 'AddKIController as ak',
				clickOutsideToClose: true,
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