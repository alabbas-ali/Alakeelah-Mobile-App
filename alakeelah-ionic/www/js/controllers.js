angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

	$scope.pageList = [ {
		id : 1,
		name : 'page1'
	}, {
		id : 2,
		name : 'page2'
	} ];

})

.controller('pageViewCtrl', function($scope, $stateParams) {
	$scope.pageId = $stateParams.pageId;
	$scope.pageName = 'Page' + $stateParams.pageId;
})

.controller('introVidCtrl', function($scope, $cordovaMedia) {

	ionic.Platform.ready(function() {

		var endIntro = function() {
			$("#introDiv").hide();
			$("#content-wrapper").show();
		};

		try {

			var introAudioSrc;
			if (ionic.Platform.isAndroid()) {
				introAudioSrc = '/android_asset/www/intro/intro.mp2';
			} else {
				introAudioSrc = 'intro/intro.mp2';
			}

			var introAudio = new Media(introAudioSrc, null, null, null);
			introAudio.play();

			setTimeout(function() {
				endIntro();
			}, 10000);

		} catch (e) {
			console.log(e);
			endIntro();
		}
	});

})

.controller('mainCtrl', function($scope, $stateParams) {
	$scope.mainSlides = [ {
		title : 'slide1'
	}, {
		title : 'slide2'
	}, {
		title : 'slide3'
	} ];
});
