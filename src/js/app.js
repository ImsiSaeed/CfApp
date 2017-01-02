var app = angular.module('cf', [
	'ngRoute',
	'ngMaterial',
]);

app.controller('CFController', function ($scope, $rootScope, $mdSidenav, $location) {
	var cf = this;

	$rootScope.title = "CF";

	cf.menu = function () {
		$mdSidenav('sideNav').toggle();
	}

	cf.goTo = function (page) {
		$location.path(page);
	}
});

app.controller('MedicinesController', function ($mdDialog) {
	var meds = this;

	meds.notUseful = function () {
		console.log('You said it\'s not useful');
		$mdDialog.hide();
	};

	meds.useful = function () {
		console.log('You said it\'s useful');
		$mdDialog.hide();
	};

	meds.showModalOne = function (ev) {
		meds.dialogContent = "HEYYY!!!!!";
		showDialog(ev);
	}

	meds.showModalTwo = function (ev) {
		meds.dialogContent = "THERE!!!!!";
		showDialog(ev);
	}

	meds.getContent = function () {
		return meds.dialogContent;
	}

	function showDialog(ev, content) {
		$mdDialog.show({
			controller: 'MedicinesController as meds',
			templateUrl: './src/dialogs/main.html',
			targetEvent: ev,
			clickOutsideToClose: true,
		})
		.then(null, function() {
			console.log('You cancelled the dialog.');
		});	
	}
})

app.config([
			 '$mdThemingProvider',
	function ($mdThemingProvider) {
		$mdThemingProvider
			.theme('default')
			.primaryPalette('teal')
			.accentPalette('cyan')
			.warnPalette('orange')
			.backgroundPalette('grey');
	}
]);