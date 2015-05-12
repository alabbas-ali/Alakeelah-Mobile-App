angular
		.module('starter.controllers', [])

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

		.controller(
				'introVidCtrl',
				function($scope, $cordovaMedia, $state, $ionicHistory) {

					ionic.Platform
							.ready(function() {

								var endIntro = function() {
									$ionicHistory.nextViewOptions({
										disableAnimate: true,
										disableBack : true
									});
									$state.transitionTo("app.main");
								};

								try {

									var introAudioSrc;
									if (ionic.Platform.isAndroid()) {
										introAudioSrc = '/android_asset/www/intro/intro.mp2';
									} else {
										introAudioSrc = 'intro/intro.mp2';
									}

									var introAudio = new Media(introAudioSrc,
											null, null, null);
									introAudio.play();

								} catch (e) {
									console.log(e);
								} finally {
									setTimeout(function() {
										endIntro();
									}, 9000);
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
