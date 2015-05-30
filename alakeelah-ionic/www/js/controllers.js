var serverURI = 'http://localhost/NewProject/public/';

angular.module('starter.controllers', [])

		.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
			
			jQuery.get(serverURI+'Pages/getAllActive', function (data) {
				$scope.pageList = data;
            });
			
			var s = encodeURI("localhost.mp4");
			console.log(s);
			
			$scope.liveBroadcastURI = s;
		})
		
		.controller('mainCtrl', function($scope, $stateParams) {
			$scope.mainSlides = [ {title : 'الآن بث مباشر من مجلس داوود العاشور البصرة' , date : '6/7/2014' }, { title : 'الآن بث مباشر من مجلس داوود العاشور البصرة' , date : '6/7/2014' }, { title : 'الآن بث مباشر من مجلس داوود العاشور البصرة' , date : '6/7/2014' } ];
		})
		
		.controller('pageViewCtrl', function($scope, $stateParams) {
			$scope.pageId = $stateParams.pageId;
			$scope.pageName = $stateParams.pageName;
			jQuery.get(serverURI + 'Pages/getPageUsers/' + $stateParams.pageId , function (data) {
				$scope.usersList = data;
            });			
		})
		
		.controller('liveBroadcastCtrl', function($scope, $stateParams) {
			$scope.broadcastURI = $stateParams.broadcastURI;
			console.log( '$stateParams.broadcastURI : = ' + $stateParams.broadcastURI);
			$scope.commentsList = [ {name : 'حسن من العراق' , content:"اتلنايبسلنتايبن انيللانايس ناتياتنلي ناليسناليس نايسنتلي نايسلليذ", date :"2015/03/01", time :"11:30 PM" },
			                    {name : 'حسن من العراق' , content:"اتلنايبسلنتايبن انيللانايس ناتياتنلي ناليسناليس نايسنتلي نايسلليذ", date :"2015/03/01", time :"11:30 PM" },
								{name : 'حسن من العراق' , content:"اتلنايبسلنتايبن انيللانايس ناتياتنلي ناليسناليس نايسنتلي نايسلليذ", date :"2015/03/01", time :"11:30 PM" } ];
		})
		
		.controller('frequencyCtrl', function($scope, $stateParams) {
			$scope.mainSlides = [ {title : 'الآن بث مباشر من مجلس داوود العاشور البصرة' , date : '6/7/2014' }, { title : 'الآن بث مباشر من مجلس داوود العاشور البصرة' , date : '6/7/2014' }, { title : 'الآن بث مباشر من مجلس داوود العاشور البصرة' , date : '6/7/2014' } ];
		})
		.controller('broadcastTableCtrl', function($scope, $stateParams) {
			$scope.mainSlides = [ {title : 'الآن بث مباشر من مجلس داوود العاشور البصرة' , date : '6/7/2014' }, { title : 'الآن بث مباشر من مجلس داوود العاشور البصرة' , date : '6/7/2014' }, { title : 'الآن بث مباشر من مجلس داوود العاشور البصرة' , date : '6/7/2014' } ];
		})
		.controller('newsCtrl', function($scope, $stateParams) {
			$scope.mainSlides = [ {title : 'الآن بث مباشر من مجلس داوود العاشور البصرة' , date : '6/7/2014' }, { title : 'الآن بث مباشر من مجلس داوود العاشور البصرة' , date : '6/7/2014' }, { title : 'الآن بث مباشر من مجلس داوود العاشور البصرة' , date : '6/7/2014' } ];
		})
		.controller('videosCtrl', function($scope, $stateParams) {
			$scope.mainSlides = [ {title : 'الآن بث مباشر من مجلس داوود العاشور البصرة' , date : '6/7/2014' }, { title : 'الآن بث مباشر من مجلس داوود العاشور البصرة' , date : '6/7/2014' }, { title : 'الآن بث مباشر من مجلس داوود العاشور البصرة' , date : '6/7/2014' } ];
		})
		.controller('soundsCtrl', function($scope, $stateParams) {
			$scope.mainSlides = [ {title : 'الآن بث مباشر من مجلس داوود العاشور البصرة' , date : '6/7/2014' }, { title : 'الآن بث مباشر من مجلس داوود العاشور البصرة' , date : '6/7/2014' }, { title : 'الآن بث مباشر من مجلس داوود العاشور البصرة' , date : '6/7/2014' } ];
		})
		.controller('picturesCtrl', function($scope, $stateParams) {
			$scope.mainSlides = [ {title : 'الآن بث مباشر من مجلس داوود العاشور البصرة' , date : '6/7/2014' }, { title : 'الآن بث مباشر من مجلس داوود العاشور البصرة' , date : '6/7/2014' }, { title : 'الآن بث مباشر من مجلس داوود العاشور البصرة' , date : '6/7/2014' } ];
		})
		.controller('introVidCtrl',
				function($scope, $cordovaMedia, $state, $ionicHistory,$ionicPlatform) {

					var endIntro = function() {
						$ionicHistory.nextViewOptions({
							disableAnimate : true,
							disableBack : true
						});
						$state.go("app.main");
					};

					var readyCalled = false;

					setTimeout(function() {
						if (!readyCalled) {
							endIntro();
						}
					}, 5000);

					var initVideoIntro = function() {
						try {
							$("#introDiv").html('<video id="introVid" style="margin: auto;max-height: 100%;height: 100%;background-color: #48270C;"></video>');
							var introVidTag = document
									.getElementById("introVid");
							introVidTag.src = "intro/intro.m4v";
							introVidTag.addEventListener("ended", function() {
								endIntro();
							}, false);
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
									$("#introDiv").html('<img id="introImg" src="intro/intro.gif" style="margin: auto;max-height: 100%;height: 100%;background-color: #48270C;" />');
									try {
										var introAudioSrc = '/android_asset/www/intro/intro.mp2';
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
				});

