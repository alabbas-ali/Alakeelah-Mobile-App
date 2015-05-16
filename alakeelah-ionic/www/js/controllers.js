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
				function($scope, $cordovaMedia, $state, $ionicHistory,
						$ionicPlatform) {

					var endIntro = function() {
						$ionicHistory.nextViewOptions({
							disableAnimate : true,
							disableBack : true
						});
						$state.transitionTo("app.main");
					};

					var readyCalled = false;

					setTimeout(function() {
						if (!readyCalled) {
							endIntro();
						}
					}, 5000);

					var initVideoIntro = function() {
						try {
							$("#introDiv")
									.html(
											'<video id="introVid" style="width: 100%; height: 100%;"></video>');
							var introVidTag = document
									.getElementById("introVid");
							introVidTag.src = "intro/intro.m4v";
							introVidTag.addEventListener("ended", function() {
								endIntro();
							});
							introVidTag.play();
						} catch (e) {
							console.log(e);
							endIntro();
						}
					};

					// ********************************
					// Uncomment this ready block for browser and IOS Simulator
					// tests. Note: delete www/intro folder on deployment
					$(document).ready(function() {
						initVideoIntro();
						readyCalled = true;
					});
					// ********************************

					$ionicPlatform
							.ready(function() {
								readyCalled = true;
								if (ionic.Platform.isAndroid()) {
									// If android device, display GIF Image and
									// play sound clip in background.
									$("#introDiv")
											.html(
													'<img id="introImg" src="intro/intro.gif" style="width: 100%; height: 100%;" />');
									try {
										var introAudioSrc;
										if (ionic.Platform.isAndroid()) {
											introAudioSrc = '/android_asset/www/intro/intro.mp2';
										} else {
											introAudioSrc = 'intro/intro.mp2';
										}

										var introAudio = new Media(
												introAudioSrc, null, null, null);
										introAudio.play();

									} catch (e) {
										console.log(e);
									} finally {
										setTimeout(function() {
											endIntro();
										}, 9000);
									}
								} else {
									// If not android, play video intro
									initVideoIntro();
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
