var serverURI = 'http://localhost/NewProject/public/';

var publicNunber = 5;

var publicBroadcastURI = "";

function chunk(arr, size) {
	var newArr = [];
	for (var i = 0; i < arr.length; i += size) {
		newArr.push(arr.slice(i, i + size));
	}
	return newArr;
}

angular.module('starter.controllers', [])

		.controller( 'AppCtrl', function($scope, $ionicModal, $timeout, $translate,$ionicLoading) {

					jQuery.get(serverURI + 'Pages/getAllActive', function(data) {
							$scope.pageList = data;
					});
					
					jQuery.get(serverURI + 'Settings/getAll/', function(data) {
						$scope.settingsList = data;
					});

					var s = encodeURI("localhost.mp4");
					$scope.liveBroadcastURI = s;

					$scope.changeLang = function(lang) {
						$translate.use(lang);
					};

					$scope.currentLang = function() {
						return $translate.use();
					};
					
					$scope.getMunthName = function(data) {
						var objDate = new Date(data);
						var monthNamesEn = ["January", "February", "March", "April", "May", "June",
						                  "July", "August", "September", "October", "November", "December"
						                ];
						var monthNamesAr = ["كانون الثاني", " شباط", "آذار", "نيسان", "أيار", " حزيران",
						                  "تموز", " آب", "أيلول", "تشرين الأول", "تشرين الثاني", "كانون الأول"
						                ];
						if($translate.use() == "en"){
							return monthNamesEn[objDate.getMonth()];
						}else{
							return monthNamesAr[objDate.getMonth()]
						}
					};
					
					$scope.getDay = function(data) {
						var objDate = new Date(data);
						return objDate.getDay();
					};
					
					$scope.getImage = function(url) {
						//var date="5/7/2012";
						var newurl = "img/defult.png"
						return newurl;
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
						$('.menu').css({"backgroundImage": "url(img/bg" + color + ".jpg)"} );
						$('.menu-content').css({"backgroundImage": "url(img/bg" + color + ".jpg)"});
					};
		})

		.controller('mainCtrl', function($scope, $stateParams) {
					jQuery.get(serverURI + 'News/getAllActive/', function(data) {
						$scope.mainSlides = data;
					});
		})

		.controller( 'pageViewCtrl', function($scope, $stateParams) {
					$scope.pageId = $stateParams.pageId;
					$scope.pageName = $stateParams.pageName;
					jQuery.get(serverURI + 'Pages/getPageUsers/'+ $stateParams.pageId, function(data) {
						$scope.usersList = chunk(data, 2);
					});
		})

		.controller('liveBroadcastCtrl', function($scope, $stateParams , $q) {
					
					if($stateParams.userID != 0){ 
						$.get(serverURI + 'Userprofile/getLiveSteam/'+ $stateParams.userID , function(data) {
							$scope.broadcastURI = data.livestream;
						});
					}else{
						$scope.broadcastURI = publicBroadcastURI;
					}
					
					$scope.showLoading();
					var promise = $q(function(resolve, reject) {
						$.get(serverURI + 'Comments/getActiveComments/broadcast/'+ $stateParams.userID , function(data) {
							commentsList = data;
							resolve(data);
						});
					});
					promise.then(function(data) {
						$scope.hideLoading();
						$scope.commentsList = data;
					}, null);
		})
		
		.controller('frequencyCtrl', function($scope, $stateParams , $q) {
					$scope.showLoading();
					var promise = $q(function(resolve, reject) {
						$.get(serverURI + 'Comments/getActiveComments/frequency/0', function(data) {
							commentsList = data;
							resolve(data);
						});
					});
					promise.then(function(data) {
						$scope.hideLoading();
						$scope.commentsList = data;
					}, null);
		})

		.controller('broadcastTableCtrl', function($scope, $stateParams , $q) {
					$scope.showLoading();
					var promise = $q(function(resolve, reject) {	
						$.get(serverURI + 'broadcastTable/get/',function(data) {
							broadcastTable = data;
							resolve(data);
						});
					});
					promise.then(function(data) {
						$scope.hideLoading();
						$scope.broadcastTable = data;
					}, null);
		})

		.controller('newsCtrl',function($scope, $stateParams, $q) {
					$scope.showLoading();
					var publicNews, newsList;
					var promise = $q(function(resolve, reject) {
						var pndone = false;
						var nldone = false;

						$.get(serverURI + 'News/getPublic/' + publicNunber,function(data) {
							publicNews = data;
							pndone = true;
							if(nldone) resolve(" ");
						});

						$.get(serverURI + 'News/getAllActive/', function(data) {
							newsList = data;
							nldone = true;
							if(pndone) resolve(" ");
						});
					});

					promise.then(function(data) {
						$scope.hideLoading();
						$scope.publicNewss = publicNews;
						$scope.newsList = chunk(newsList, 2);
					}, null);
		})

		.controller('newsDetialsCtrl', function($scope, $stateParams , $q) {
					$scope.showLoading();
					var news, commentsList;
					var promise = $q(function(resolve, reject) {
						var pndone = false;
						var nldone = false;
		
						$.get(serverURI + 'News/getByID/' + $stateParams.newsId,function(data) {
							news = data;
							pndone = true;
							if(nldone) resolve(" ");
						});
		
						$.get(serverURI + 'Comments/getActiveComments/news/'+ $stateParams.newsId, function(data) {
							commentsList = data;
							nldone = true;
							if(pndone) resolve(" ");
						});
					});
		
					promise.then(function(data) {
						$scope.hideLoading();
						$scope.news = news[0];
						$scope.commentsList = commentsList;
					}, null);
		})

		.controller('videosCtrl', function($scope, $stateParams , $q) {
					$scope.showLoading();
					var publicVideos, videosList;
					var promise = $q(function(resolve, reject) {
						var pndone = false;
						var nldone = false;
		
						$.get(serverURI + 'Video/getPublic/' + publicNunber,function(data) {
							publicVideos = data;
							pndone = true;
							if(nldone) resolve(" ");
						});
		
						$.get(serverURI + 'Video/getAllActive/', function(data) {
							videosList = data;
							nldone = true;
							if(pndone) resolve(" ");
						});
					});
		
					promise.then(function(data) {
						$scope.hideLoading();
						$scope.publicVideos = publicVideos;
						$scope.videosList = chunk(videosList, 2);
					}, null);
		})

		.controller('videoDetialsCtrl', function($scope, $stateParams, $q) {

					$scope.showLoading();
					var video, commentsList;
					var promise = $q(function(resolve, reject) {
						var pndone = false;
						var nldone = false;
		
						$.get(serverURI + 'Video/getByID/'+ $stateParams.videoId ,function(data) {
							video = data;
							pndone = true;
							if(nldone) resolve(" ");
						});
		
						$.get(serverURI + 'Comments/getActiveComments/video/'+ $stateParams.videoId, function(data) {
							commentsList = data;
							nldone = true;
							if(pndone) resolve(" ");
						});
					});
		
					promise.then(function(data) {
						$scope.hideLoading();
						$scope.video = video[0];
						$scope.commentsList = commentsList;
					}, null);
		})

		.controller('soundsCtrl', function($scope, $stateParams , $q) {
					$scope.showLoading();
					var publicSounds, soundsList;
					var promise = $q(function(resolve, reject) {
						var pndone = false;
						var nldone = false;
		
						$.get(serverURI + 'Audio/getPublic/' + publicNunber,function(data) {
							publicSounds = data;
							pndone = true;
							if(nldone) resolve(" ");
						});
		
						$.get(serverURI + 'Audio/getAllActive/', function(data) {
							soundsList = data;
							nldone = true;
							if(pndone) resolve(" ");
						});
					});
		
					promise.then(function(data) {
						$scope.hideLoading();
						$scope.publicSounds = publicSounds;
						$scope.soundsList = chunk(soundsList, 2);
					}, null);
		})

		.controller('soundDetialsCtrl', function($scope, $stateParams , $q) {
					
					$scope.showLoading();
					var sound, commentsList;
					var promise = $q(function(resolve, reject) {
						var pndone = false;
						var nldone = false;
		
						$.get(serverURI + 'Audio/getByID/' + $stateParams.soundId ,function(data) {
							sound = data;
							pndone = true;
							if(nldone) resolve(" ");
						});
		
						$.get(serverURI + 'Comments/getActiveComments/audio/'+ $stateParams.soundId, function(data) {
							commentsList = data;
							nldone = true;
							if(pndone) resolve(" ");
						});
					});
		
					promise.then(function(data) {
						$scope.hideLoading();
						$scope.sound = sound[0];
						$scope.commentsList = commentsList;
					}, null);
		})

		.controller('picturesCtrl', function($scope, $stateParams , $q) {
					$scope.showLoading();
					var publicPictures, picturesList;
					var promise = $q(function(resolve, reject) {
						var pndone = false;
						var nldone = false;
		
						$.get(serverURI + 'Photo/getPublic/' + publicNunber,function(data) {
							publicPictures = data;
							pndone = true;
							if(nldone) resolve(" ");
						});
		
						$.get(serverURI + 'Photo/getAllActive/', function(data) {
							picturesList = data;
							nldone = true;
							if(pndone) resolve(" ");
						});
					});
		
					promise.then(function(data) {
						$scope.hideLoading();
						$scope.publicPictures = publicPictures;
						$scope.picturesList = chunk(picturesList, 2);
					}, null);
		})

		.controller('pictureDetialsCtrl', function($scope, $stateParams , $q) {
					$scope.showLoading();
					var picture, commentsList;
					var promise = $q(function(resolve, reject) {
						var pndone = false;
						var nldone = false;
		
						$.get(serverURI + 'Photo/getByID/'+ $stateParams.pictureId,function(data) {
							picture = data;
							pndone = true;
							if(nldone) resolve(" ");
						});
		
						$.get(serverURI + 'Comments/getActiveComments/photo/'+ $stateParams.pictureId, function(data) {
							commentsList = data;
							nldone = true;
							if(pndone) resolve(" ");
						});
					});
		
					promise.then(function(data) {
						$scope.hideLoading();
						$scope.picture = picture[0];
						$scope.commentsList = commentsList;
					}, null);
		})

		.controller( 'introVidCtrl', function($scope, $cordovaMedia, $state, $ionicHistory,$ionicPlatform) {

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

					$ionicPlatform.ready(function() {
								readyCalled = true;
								if (ionic.Platform.isAndroid()) {
									// If android device, display GIF Image and
									// play sound clip in background.
									$("#introDiv").html('<img id="introImg" src="intro/intro.gif" style="margin: auto;max-height: 100%;height: 100%;background-color: #48270C;" />');
									try {
										var introAudioSrc = '/android_asset/www/intro/intro.mp2';
										var introAudio = new Media(introAudioSrc, null, null, null);
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
