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

app.controller('AppointmentController', function ($mdDialog, AppointmentsService) {
	var ctrl = this;

	function load() {	
		AppointmentsService.whenReady(function () {
			ctrl.appoinments = AppointmentsService.getAllAppointments();
		})
	}

	load();

	ctrl.delete = function (appointment) {
		AppointmentsService.deleteAppointment(appointment);
		load();
	}

	ctrl.new = function (ev) {
		$mdDialog.show({
			controller: 'appointmentModalController as ctrl',
			templateUrl: './src/pages/appointmentDialog.html',
			targetEvent: ev,
			clickOutsideToClose : true
		}).then(function(data) {
			AppointmentsService.saveAppointment(data);
        }, function() {
			console.log('Cancelled!');
        });
	}
});

app.controller('appointmentModalController', function ($scope, $mdDialog) {
	var ctrl = this;
	
	ctrl.appointment= {};

	$scope.cancel = function () {
		$mdDialog.cancel();
	}

	$scope.save = function () {
		$mdDialog.hide(ctrl.appointment);
	}
});

app.config(function ($mdThemingProvider, $mdDateLocaleProvider) {
		$mdThemingProvider
			.theme('default')
			.primaryPalette('purple')
			.accentPalette('pink')
			.warnPalette('orange')
			.backgroundPalette('grey');

		$mdDateLocaleProvider.formatDate = function(date) {
			date = date ? date : new Date();

			var day = date.getDate();
			var monthIndex = date.getMonth();
			var year = date.getFullYear();

			return day + '/' + (monthIndex + 1) + '/' + year;
		};
	}
);

app.service('AppointmentsService', function ($http, $filter) {
	var appointments = undefined;
	var waiting = [];

	$http.get('./src/data/appointments.json').then(function (data) {
		if (angular.isDefined(data)) {
			appointments = data.data;
			startQueue();
		}
	});

	function startQueue() {
		angular.forEach(waiting, function (func) {
			func();
		})
	}

	return {
		whenReady: function (callback) {
			if (!angular.isDefined(appointments)) {
				waiting.push(callback);
			} else {
				callback();
			}
		},

		getAllAppointments: function () {
			return appointments;
		},

		getAppointment: function (doc) {
			return $filter('filter')(appointments, {doc : doc}, true)[0];
		},

		deleteAppointment: function (appointment) {
			appointments.splice(appointments.indexOf(appointment), 1);
		},

		saveAppointment: function (appointment) {
			var existingAppointment = appointments.indexOf(appointment);
			if (existingAppointment != -1) {
				appointments[existingAppointment] = appointment;
			} else {
				appointments.push(appointment);
			}
		}
	}
});

app.service('UsersService', function ($http, $filter) {
	var appointments = undefined;
	var waiting = [];

	$http.get('./src/data/users.json').then(function (data) {
		if (angular.isDefined(data)) {
			appointments = data.data;
			startQueue();
		}
	});

	function startQueue() {
		angular.forEach(waiting, function (func) {
			func();
		})
	}

	return {
		whenReady: function (callback) {
			if (!angular.isDefined(appointments)) {
				waiting.push(callback);
			} else {
				callback();
			}
		},

		authenticate: function (user) {
			return appointments;
		},
	}
})