var serverURI = 'http://localhost/NewProject/public/';

// menu
// menu-content

var publicNunber = 5;
function chunk(arr, size) {
	var newArr = [];
	for (var i = 0; i < arr.length; i += size) {
		newArr.push(arr.slice(i, i + size));
	}
	return newArr;
}

angular
		.module('starter.controllers', [])

		.controller(
				'AppCtrl',
				function($scope, $ionicModal, $timeout, $translate,
						$ionicLoading) {
					jQuery.get(serverURI + 'Pages/getAllActive',
							function(data) {
								$scope.pageList = data;
								// console.log( 'data' + $scope.pageList);
							});

					var s = encodeURI("localhost.mp4");
					$scope.liveBroadcastURI = s;

					$scope.changeLang = function(lang) {
						$translate.use(lang);
					};

					$scope.currentLang = function() {
						return $translate.use();
					};

					$scope.showLoading = function() {
						$ionicLoading.show({
							templateUrl : '/templates/loading.html',
							hideOnStateChange : true
						});
					};
					$scope.hideLoading = function() {
						$ionicLoading.hide();
					};

					$scope.changeBgColor = function(color) {
						alert('changing color to: ' + color);
					};

				})

		.controller('mainCtrl', function($scope, $stateParams) {
			jQuery.get(serverURI + 'News/getAllActive/', function(data) {
				$scope.mainSlides = data;
			});
		})

		.controller(
				'pageViewCtrl',
				function($scope, $stateParams) {
					$scope.pageId = $stateParams.pageId;
					$scope.pageName = $stateParams.pageName;
					jQuery.get(serverURI + 'Pages/getPageUsers/'
							+ $stateParams.pageId, function(data) {
						$scope.usersList = chunk(data, 2);
					});
				})

		.controller(
				'liveBroadcastCtrl',
				function($scope, $stateParams) {
					$scope.broadcastURI = $stateParams.broadcastURI;
					console.log('$stateParams.broadcastURI : = '
							+ $stateParams.broadcastURI);
					$scope.commentsList = [
							{
								name : 'حسن من العراق',
								content : "اتلنايبسلنتايبن انيللانايس ناتياتنلي ناليسناليس نايسنتلي نايسلليذ",
								date : "2015/03/01",
								time : "11:30 PM"
							},
							{
								name : 'حسن من العراق',
								content : "اتلنايبسلنتايبن انيللانايس ناتياتنلي ناليسناليس نايسنتلي نايسلليذ",
								date : "2015/03/01",
								time : "11:30 PM"
							},
							{
								name : 'حسن من العراق',
								content : "اتلنايبسلنتايبن انيللانايس ناتياتنلي ناليسناليس نايسنتلي نايسلليذ",
								date : "2015/03/01",
								time : "11:30 PM"
							} ];
				})

		.controller('frequencyCtrl', function($scope, $stateParams) {

		})

		.controller('broadcastTableCtrl', function($scope, $stateParams) {

		})

		.controller(
				'newsCtrl',
				function($scope, $stateParams, $q) {

					// An example illustrates how to update $scope values after
					// ajax returns
					// here is the old value of the $scope.testMsg
					$scope.testMsg = "Hello world news";
					// now we construct promise object, please note that $q was
					// injected as controller's parameter
					// resolve is the function that will be passed to
					// promise.then(). you can use whatever parameters you want.
					var promise = $q(function(resolve, reject) {
						$scope.showLoading();
						// the actual ajax call
						$.get("http://www.google.com", function(data, status) {
							// now we send the new value to the resolve function
							resolve('ajax loaded successfully');
							$scope.hideLoading();
						});
					});

					promise.then(function(msg) {
						// when value comes from ajax call, we update the
						// $scope.testMsg value.
						$scope.testMsg = msg;
					}, null);

					// ////////////////end of example

					var p = $q(function(resolve, reject) {
						var pn;
						var nl;

						$.get(serverURI + 'News/getPublic/' + publicNunber,
								function(data) {
									pn = data;
									// $scope.publicNewss = data;
								});

						$.get(serverURI + 'News/getAllActive/', function(data) {
							nl = chunk(data, 2);
							// $scope.newsList = chunk(data, 2);
						});

						resolve(pn, nl);

					});

					p.then(function(pn, nl) {
						$scope.publicNewss = pn;
						$scope.newsList = nl;
					}, null);

				})

		.controller(
				'newsDetialsCtrl',
				function($scope, $stateParams) {
					jQuery.get(serverURI + 'News/getByID/'
							+ $stateParams.newsId, function(data) {
						$scope.news = data[0];
					});
					$scope.commentsList = [
							{
								name : 'حسن من العراق',
								content : "اتلنايبسلنتايبن انيللانايس ناتياتنلي ناليسناليس نايسنتلي نايسلليذ",
								date : "2015/03/01",
								time : "11:30 PM"
							},
							{
								name : 'حسن من العراق',
								content : "اتلنايبسلنتايبن انيللانايس ناتياتنلي ناليسناليس نايسنتلي نايسلليذ",
								date : "2015/03/01",
								time : "11:30 PM"
							},
							{
								name : 'حسن من العراق',
								content : "اتلنايبسلنتايبن انيللانايس ناتياتنلي ناليسناليس نايسنتلي نايسلليذ",
								date : "2015/03/01",
								time : "11:30 PM"
							} ];
				})

		.controller(
				'videosCtrl',
				function($scope, $stateParams) {

					jQuery.get(serverURI + 'Video/getPublic/' + publicNunber,
							function(data) {
								$scope.publicVideos = data;
							});

					jQuery.get(serverURI + 'Video/getAllActive/',
							function(data) {
								$scope.videosList = chunk(data, 2);
							});
				})

		.controller(
				'videoDetialsCtrl',
				function($scope, $stateParams) {
					jQuery.get(serverURI + 'Video/getByID/'
							+ $stateParams.videoId, function(data) {
						$scope.video = data[0];
						console.log('data' + data[0].title);
					});
					$scope.commentsList = [
							{
								name : 'حسن من العراق',
								content : "اتلنايبسلنتايبن انيللانايس ناتياتنلي ناليسناليس نايسنتلي نايسلليذ",
								date : "2015/03/01",
								time : "11:30 PM"
							},
							{
								name : 'حسن من العراق',
								content : "اتلنايبسلنتايبن انيللانايس ناتياتنلي ناليسناليس نايسنتلي نايسلليذ",
								date : "2015/03/01",
								time : "11:30 PM"
							},
							{
								name : 'حسن من العراق',
								content : "اتلنايبسلنتايبن انيللانايس ناتياتنلي ناليسناليس نايسنتلي نايسلليذ",
								date : "2015/03/01",
								time : "11:30 PM"
							} ];
				})

		.controller(
				'soundsCtrl',
				function($scope, $stateParams) {

					jQuery.get(serverURI + 'Audio/getPublic/' + publicNunber,
							function(data) {
								$scope.publicSounds = data;
							});

					jQuery.get(serverURI + 'Audio/getAllActive/',
							function(data) {
								$scope.soundsList = chunk(data, 2);
							});
				})

		.controller(
				'soundDetialsCtrl',
				function($scope, $stateParams) {
					jQuery.get(serverURI + 'Audio/getByID/'
							+ $stateParams.soundId, function(data) {
						$scope.sound = data[0];
					});
					$scope.commentsList = [
							{
								name : 'حسن من العراق',
								content : "اتلنايبسلنتايبن انيللانايس ناتياتنلي ناليسناليس نايسنتلي نايسلليذ",
								date : "2015/03/01",
								time : "11:30 PM"
							},
							{
								name : 'حسن من العراق',
								content : "اتلنايبسلنتايبن انيللانايس ناتياتنلي ناليسناليس نايسنتلي نايسلليذ",
								date : "2015/03/01",
								time : "11:30 PM"
							},
							{
								name : 'حسن من العراق',
								content : "اتلنايبسلنتايبن انيللانايس ناتياتنلي ناليسناليس نايسنتلي نايسلليذ",
								date : "2015/03/01",
								time : "11:30 PM"
							} ];
				})

		.controller(
				'picturesCtrl',
				function($scope, $stateParams) {

					jQuery.get(serverURI + 'Photo/getPublic/' + publicNunber,
							function(data) {
								$scope.publicPictures = data;
							});

					jQuery.get(serverURI + 'Photo/getAllActive/',
							function(data) {
								$scope.picturesList = chunk(data, 2);
							});
				})

		.controller(
				'pictureDetialsCtrl',
				function($scope, $stateParams) {
					jQuery.get(serverURI + 'Photo/getByID/'
							+ $stateParams.pictureId, function(data) {
						$scope.picture = data[0];
						// console.log( 'data' + data[0].title );
					});
					$scope.commentsList = [
							{
								name : 'حسن من العراق',
								content : "اتلنايبسلنتايبن انيللانايس ناتياتنلي ناليسناليس نايسنتلي نايسلليذ",
								date : "2015/03/01",
								time : "11:30 PM"
							},
							{
								name : 'حسن من العراق',
								content : "اتلنايبسلنتايبن انيللانايس ناتياتنلي ناليسناليس نايسنتلي نايسلليذ",
								date : "2015/03/01",
								time : "11:30 PM"
							},
							{
								name : 'حسن من العراق',
								content : "اتلنايبسلنتايبن انيللانايس ناتياتنلي ناليسناليس نايسنتلي نايسلليذ",
								date : "2015/03/01",
								time : "11:30 PM"
							} ];
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
							$("#introDiv")
									.html(
											'<video id="introVid" style="margin: auto;max-height: 100%;height: 100%;background-color: #48270C;"></video>');
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
									$("#introDiv")
											.html(
													'<img id="introImg" src="intro/intro.gif" style="margin: auto;max-height: 100%;height: 100%;background-color: #48270C;" />');
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
