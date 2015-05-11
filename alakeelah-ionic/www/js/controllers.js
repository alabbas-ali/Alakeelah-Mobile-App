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

.controller('introVidCtrl', function($scope) {
	
	$scope.intro = true;
	var videoUrl;

	if (ionic.Platform.isAndroid()) {
		videoUrl = "android.resource://com.alakeela/raw/intro";
	} else {
		videoUrl = "vid/intro.m4v";
	}

	var videoTag = document.getElementById("intro_video");
	videoTag.src = videoUrl;
	videoTag.onended = function() {
		$("#videoDiv").hide();
		$("#contentDiv").show();
	}
	videoTag.play();

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
