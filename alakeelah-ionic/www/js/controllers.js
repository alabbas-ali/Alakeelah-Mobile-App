angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
	$scope.pageList = [ {
		id : 1,
		name : 'page1'
	}, {
		id : 2,
		name : 'page2'
	} ];
	// Form data for the login modal
	$scope.loginData = {};

	// Create the login modal that we will use later
	$ionicModal.fromTemplateUrl('templates/login.html', {
		scope : $scope
	}).then(function(modal) {
		$scope.modal = modal;
	});

	// Triggered in the login modal to close it
	$scope.closeLogin = function() {
		$scope.modal.hide();
	};

	// Open the login modal
	$scope.login = function() {
		$scope.modal.show();
	};

	// Perform the login action when the user submits the login form
	$scope.doLogin = function() {
		console.log('Doing login', $scope.loginData);

		// Simulate a login delay. Remove this and replace with your login
		// code if using a login system
		$timeout(function() {
			$scope.closeLogin();
		}, 1000);
	};
})

.controller('pageViewCtrl', function($scope, $stateParams) {
	$scope.pageId = $stateParams.pageId;
	$scope.pageName = 'Page' + $stateParams.pageId;
})

.controller('mainCtrl', function($scope, $stateParams) {
	$scope.mainSlides=[{title: 'slide1'}, {title: 'slide2'}, {title: 'slide3'}];
});
