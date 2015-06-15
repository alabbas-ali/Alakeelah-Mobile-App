//var serverURI = 'http://localhost/NewProject/public/';
var serverURI = 'http://alaqila.tv/admin528/public/';

var publicNunber = 5;

var settingsList = "";

function chunk(arr, size) {
	var newArr = [];
	for (var i = 0; i < arr.length; i += size) {
		newArr.push(arr.slice(i, i + size));
	}
	return newArr;
}

function objLog(op) {
	for ( var key in op) {
		console.log("key " + key + " : " + op.key);
	}
}

var cahngColor = function(color) {
	$('.body').css({"backgroundImage" : "url(img/bg" + color + ".png) "});
	
	localStorage.setItem("color", color);
};

angular
		.module('starter.controllers', [])

		.controller(
				'AppCtrl',
				function($scope, $ionicModal, $timeout, $translate,
						$ionicLoading, $sce) {
					
					$scope.showLoading = function() {
						$ionicLoading.show({
							templateUrl : 'templates/loading.html',
							hideOnStateChange : true
						});
					};
					
					$scope.changeLang = function(lang) {
						$translate.use(lang);
						if(lang == "ar"){
							$('.body').addClass("ar");
						}else{
							$('.body').removeClass("ar");
						}
						localStorage.setItem("language", lang);
					};
					
					$scope.showLoading();
					
					jQuery.get(serverURI + 'Settings/getAll/', function(data) {
						settingsList = data[0]
						$scope.settingsList = settingsList;
						localStorage.setItem('settingsList', JSON.stringify(settingsList));
					}).fail(function() {
						try {
							settingsList = JSON.parse(localStorage.settingsList);
							$scope.settingsList = settingsList;
						} catch (ex) {
							//Redirect To Error Page No Connection And No Data 
						}
					});

					jQuery.get(serverURI + 'Pages/getAllActive', function(data) {
						$scope.pageList = data;
						localStorage.setItem('pageList', JSON.stringify(data));
					}).fail(function() {
						try {
							$scope.pageList = JSON.parse(localStorage.pageList);
						} catch (ex) {
							//Redirect To Error Page No Connection And No Data 
						}
					});
					
					$.get(serverURI + 'News/getResentNews/', function(data) {
						$scope.resentNews = data;
						localStorage.setItem('resentNews', JSON.stringify(data));
					}).fail(function() {
						try {
							$scope.resentNews = JSON.parse(localStorage.resentNews);
						} catch (ex) {
							//Redirect To Error Page No Connection And No Data 
						}
					});
					
					if (localStorage.language)
						$scope.changeLang(localStorage.language);
					
					
					if (localStorage.color)
						cahngColor(localStorage.color);
					
					$scope.trustSrc = function(src) {
						return $sce.trustAsResourceUrl(src);
					}

					$scope.currentLang = function() {
						return $translate.use();
					};

					$scope.getMunthName = function(data) {
						var objDate = new Date(data);
						var monthNamesEn = [ "January", "February", "March",
								"April", "May", "June", "July", "August",
								"September", "October", "November", "December" ];
						var monthNamesAr = [ "كانون الثاني", " شباط", "آذار",
								"نيسان", "أيار", " حزيران", "تموز", " آب",
								"أيلول", "تشرين الأول", "تشرين الثاني",
								"كانون الأول" ];
						if ($translate.use() == "en") {
							return monthNamesEn[objDate.getMonth()];
						} else {
							return monthNamesAr[objDate.getMonth()]
						}
					};

					$scope.getDay = function(date) {
						// date = "2015-06-10";
						var objDate = new Date(date);
						// console.log ( date + " day : " + objDate.getUTCDate()
						// );
						return objDate.getUTCDate();
					};

					

					$scope.openOut = function(href) {
						window.open(href, '_system', 'location=yes');
					}

					$scope.hideLoading = function() {
						$ionicLoading.hide();
					};

					$scope.changeBgColor = cahngColor;
					
					

				})

		.controller('mainCtrl', function($scope, $stateParams, $q, $ionicSlideBoxDelegate) {
					
					$scope.showLoading();
					
					var news, vedios, sounds, pictures;
					var promise = $q(function(resolve, reject) {
						var ndone = false;
						var vdone = false;
						var sdone = false;
						var pdone = false;

						$.get(serverURI + 'News/getPublic/' + publicNunber,
								function(data) {
									news = data;
									localStorage.setItem('homeNews', JSON.stringify(data));
									ndone = true;
									if (vdone && sdone && pdone)
										resolve(" ");
						}).fail(function() {
							try {
								news = JSON.parse(localStorage.homeNews);
								ndone = true;
								if (vdone && sdone && pdone)
									resolve(" ");
							} catch (ex) {
								//Redirect To Error Page No Connection And No Data 
								console.log("This is EX in Fitching Home News From Local Storage , No Internet Connection And No News ..");
							}
						});
						
						$.get(serverURI + 'Video/getPublic/' + publicNunber,
								function(data) {
									vedios = data;
									localStorage.setItem('homeVedios', JSON.stringify(data));
									vdone = true;
									if (ndone && sdone && pdone)
										resolve(" ");
						}).fail(function() {
							try {
								vedios = JSON.parse(localStorage.homeVedios);
								vdone = true;
								if (ndone && sdone && pdone)
									resolve(" ");
							} catch (ex) {
								//Redirect To Error Page No Connection And No Data 
								console.log("This is EX in Fitching Home Videos From Local Storage , No Internet Connection And No News ..");
							}
						});
						
						$.get(serverURI + 'Audio/getPublic/' + publicNunber,
								function(data) {
									sounds = data;
									localStorage.setItem('homeSounds', JSON.stringify(data));
									sdone = true;
									if (vdone && ndone && pdone)
										resolve(" ");
						}).fail(function() {
							try {
								sounds = JSON.parse(localStorage.homeSounds);
								sdone = true;
								if (vdone && ndone && pdone)
									resolve(" ");
							} catch (ex) {
								//Redirect To Error Page No Connection And No Data 
								console.log("This is EX in Fitching Home Sounds From Local Storage , No Internet Connection And No News ..");
							}
						});
						
						$.get(serverURI + 'Photo/getPublic/' + publicNunber,
								function(data) {
									pictures = data;
									localStorage.setItem('homePictures', JSON.stringify(data));
									pdone = true;
									if (vdone && ndone && sdone)
										resolve(" ");
						}).fail(function() {
							try {
								pictures = JSON.parse(localStorage.homePictures);
								pdone = true;
								if (vdone && ndone && sdone)
									resolve(" ");
							} catch (ex) {
								//Redirect To Error Page No Connection And No Data 
								console.log("This is EX in Fitching Home Pictures From Local Storage , No Internet Connection And No News ..");
							}
						});
					});

					promise.then(function(data) {
						
						var first, secand;

						if (news.length > 3)
							first = 3;
						else
							first = news.length;
						if (vedios.length > 3)
							secand = 3;
						else
							secand = vedios.length;

						var mainSlider = new Array(first + secand);
						var j = 0;
						if (news[0]) {
							mainSlider[j] = news[0];
							mainSlider[j].type = "news";
							j++;
						}

						if (vedios[0]) {
							mainSlider[j] = vedios[0];
							mainSlider[j].type = "video";
							j++;
						}

						if (news[1]) {
							mainSlider[j] = news[1];
							mainSlider[j].type = "news";
							j++
						}

						if (vedios[1]) {
							mainSlider[j] = vedios[1];
							mainSlider[j].type = "video";
							j++;
						}

						if (news[2]) {
							mainSlider[j] = news[2];
							mainSlider[j].type = "news";
							j++;
						}

						if (vedios[2]) {
							mainSlider[j] = vedios[2];
							mainSlider[j].type = "video";
							j++;
						}
						$scope.mainSlides = mainSlider;
						$scope.videos = vedios;
						$scope.news = news;
						$scope.sounds = sounds;
						$scope.pictures = pictures;
						$ionicSlideBoxDelegate.update();
						$scope.hideLoading();
					}, null);
				})

		.controller(
				'pageViewCtrl',
				function($scope, $stateParams, $q, $ionicSlideBoxDelegate) {
					var pageID  = $stateParams.pageId;
					$scope.showLoading();
					var promise = $q(function(resolve, reject) {
						$.get(serverURI + 'Pages/getPageUsers/'
								+ pageID, function(data) {
							localStorage.setItem('PageUsers' + pageID , JSON.stringify(data));
							resolve(data);
						}).fail(function() {
							try {
								resolve( JSON.parse(localStorage.getItem('PageUsers'+pageID)) );
							} catch (ex) {
								//Redirect To Error Page No Connection And No Data 
							}
						});
					});
					promise.then(function(data) {
						$scope.usersList = chunk(data, 2);
						$scope.pageName = $stateParams.pageName;
						$ionicSlideBoxDelegate.update();
						$scope.hideLoading();
					}, null);
				})

		.controller('pageViewDetialsCtrl',
				function($scope, $stateParams, $q, $ionicSlideBoxDelegate) {
					$scope.userId = $stateParams.userId;
					$scope.showLoading();

					var news, vedios, sounds, pictures, user;
					
					var userID = $stateParams.userId;
					var promise = $q(function(resolve, reject) {
						var ndone = false;
						var vdone = false;
						var sdone = false;
						var pdone = false;
						var udone = false;

						$.get(serverURI + 'Userprofile/getByID/'
								+ userID, function(data) {
							user = data[0];
							localStorage.setItem('user'+ userID, JSON.stringify(data[0]));
							udone = true;
							if (vdone && sdone && pdone && ndone)
								resolve(" ");
						}).fail(function() {
							try {
								user = JSON.parse(localStorage.getItem('user'+ userID));
								udone = true;
								if (vdone && sdone && pdone && ndone)
									resolve(" ");
							} catch (ex) {
								//Redirect To Error Page No Connection And No Data 
								console.log("This is EX in Fitching User From Local Storage , No Internet Connection And No News ..");
							}
						});

						$.get(serverURI + 'News/getByUser/' + userID,
								function(data) {
									news = data;
									localStorage.setItem('userNews'+ userID, JSON.stringify(data));
									ndone = true;
									if (vdone && sdone && pdone && udone)
										resolve(" ");
						}).fail(function() {
							try {
								news = JSON.parse(localStorage.getItem('userNews'+ userID));
								ndone = true;
								if (vdone && sdone && pdone && udone)
									resolve(" ");
							} catch (ex) {
								//Redirect To Error Page No Connection And No Data 
								console.log("This is EX in Fitching User News From Local Storage , No Internet Connection And No News ..");
							}
						});
						
						$.get(serverURI + 'Video/getByUser/' + userID,
								function(data) {
									vedios = data;
									localStorage.setItem('userVedios' + userID, JSON.stringify(data));
									vdone = true;
									if (ndone && sdone && pdone && udone)
										resolve(" ");
						}).fail(function() {
							try {
								vedios = JSON.parse(localStorage.getItem('userVedios' + userID));
								vdone = true;
								if (ndone && sdone && pdone && udone)
									resolve(" ");
							} catch (ex) {
								//Redirect To Error Page No Connection And No Data 
								console.log("This is EX in Fitching User Videos From Local Storage , No Internet Connection And No News ..");
							}
						});
						
						$.get(serverURI + 'Audio/getByUser/' + userID,
								function(data) {
									sounds = data;
									localStorage.setItem('userSounds' + userID, JSON.stringify(data));
									sdone = true;
									if (vdone && ndone && pdone && udone)
										resolve(" ");
						}).fail(function() {
							try {
								sounds = JSON.parse(localStorage.getItem('userSounds' + userID));
								sdone = true;
								if (vdone && ndone && pdone && udone)
									resolve(" ");
							} catch (ex) {
								//Redirect To Error Page No Connection And No Data 
								console.log("This is EX in Fitching User Sounds From Local Storage , No Internet Connection And No News ..");
							}
						});
						
						$.get(serverURI + 'Photo/getByUser/' + userID,
								function(data) {
									pictures = data;
									localStorage.setItem('userPictures' + userID, JSON.stringify(data));
									pdone = true;
									if (vdone && ndone && sdone && udone)
										resolve(" ");
						}).fail(function() {
							try {
								pictures = JSON.parse(localStorage.getItem('userPictures' + userID));
								pdone = true;
								if (vdone && ndone && sdone && udone)
									resolve(" ");
							} catch (ex) {
								//Redirect To Error Page No Connection And No Data 
								console.log("This is EX in Fitching User Pictures From Local Storage , No Internet Connection And No News ..");
							}
						});
						
						
					});

					promise.then(function(data) {
						

						var first, secand;

						if (news.length > 3)
							first = 3;
						else
							first = news.length;
						if (vedios.length > 3)
							secand = 3;
						else
							secand = vedios.length;

						var mainSlider = new Array(first + secand);

						var j = 0;
						if (news[0]) {
							mainSlider[j] = news[0];
							mainSlider[j].type = "news";
							j++;
						}

						if (vedios[0]) {
							mainSlider[j] = vedios[0];
							mainSlider[j].type = "video";
							j++;
						}

						if (news[1]) {
							mainSlider[j] = news[1];
							mainSlider[j].type = "news";
							j++
						}

						if (vedios[1]) {
							mainSlider[j] = vedios[1];
							mainSlider[j].type = "video";
							j++;
						}

						if (news[2]) {
							mainSlider[j] = news[2];
							mainSlider[j].type = "news";
							j++;
						}

						if (vedios[2]) {
							mainSlider[j] = vedios[2];
							mainSlider[j].type = "video";
							j++;
						}

						// objLog(mainSlider);
						$scope.mainSlides = mainSlider;
						$scope.videos = vedios;
						$scope.news = news;
						$scope.sounds = sounds;
						$scope.pictures = pictures;
						$scope.user = user;
						$ionicSlideBoxDelegate.update();
						$scope.hideLoading();
					}, null);
				})

		.controller(
				'liveBroadcastCtrl',
				function($scope, $stateParams, $q, $timeout, $ionicSlideBoxDelegate) {
					$scope.showLoading();
					var commentsList, broadcastURI;
					var promise = $q(function(resolve, reject) {
						var pndone = false;
						var nldone = false;
						$.get(serverURI
								+ 'Comments/getActiveComments/broadcast/'
								+ $stateParams.userID, function(data) {
							commentsList = data;
							pndone = true;
							if (nldone)
								resolve(" ");
						});

						if ($stateParams.userID != 0) {
							$.get(serverURI + 'Userprofile/getByID/'
									+ $stateParams.userID, function(data) {
								broadcastURI = data.livestream;
								nldone = true;
								if (pndone)
									resolve(" ");
							});
						} else {
							broadcastURI = settingsList.livestream;
							// console.log( "asdcasdsad : " +
							// settingsList.livestream);
							nldone = true;
							if (pndone)
								resolve(" ");
						}

					});
					promise.then(function(data) {
						$scope.commentsList = commentsList;
						$scope.broadcastURI = broadcastURI;
						$ionicSlideBoxDelegate.update();
						$timeout(function() {
							videojs("video-livebroadcast");
							$("#video-livebroadcast").css({"display" : "block"});
							$("#video-livebroadcast video").css({"display" : "block"});
						});
						$scope.hideLoading();
					}, null);

					
				})

		.controller(
				'frequencyCtrl',
				function($scope, $stateParams, $q) {
					$scope.showLoading();
					var commentsList;
					var promise = $q(function(resolve, reject) {
						$.get(serverURI
								+ 'Comments/getActiveComments/frequency/0',
								function(data) {
									commentsList = data;
									resolve(data);
								});
					});
					promise.then(function(data) {
						$scope.frequency = settingsList.frequency;
						$scope.commentsList = data;
						$scope.hideLoading();
					}, null);
				})

		.controller('broadcastTableCtrl', function($scope, $stateParams, $q) {
			$scope.showLoading();
			var broadcastTable;
			var promise = $q(function(resolve, reject) {
				$.get(serverURI + 'broadcastTable/get/', function(data) {
					broadcastTable = data;
					resolve(data);
				});
			});
			promise.then(function(data) {
				$scope.broadcastTable = data;
				$scope.hideLoading();
			}, null);
		})

		.controller(
				'newsCtrl',
				function($scope, $stateParams, $q, $ionicSlideBoxDelegate) {
					$scope.showLoading();
					var publicNews, newsList;
					var promise = $q(function(resolve, reject) {
						var pndone = false;
						var nldone = false;

						$.get(serverURI + 'News/getPublic/' + publicNunber,
								function(data) {
									publicNews = data;
									pndone = true;
									if (nldone)
										resolve(" ");
								});

						$.get(serverURI + 'News/getAllActive/', function(data) {
							newsList = data;
							nldone = true;
							if (pndone)
								resolve(" ");
						});
					});

					promise.then(function(data) {
						$scope.publicNewss = publicNews;
						$scope.newsList = chunk(newsList, 2);
						$ionicSlideBoxDelegate.update();
						$scope.hideLoading();
					}, null);
				})

		.controller(
				'newsDetialsCtrl',
				function($scope, $stateParams, $q) {
					$scope.showLoading();
					var news, commentsList;
					var promise = $q(function(resolve, reject) {
						var pndone = false;
						var nldone = false;

						$.get(
								serverURI + 'News/getByID/'
										+ $stateParams.newsId, function(data) {
									news = data;
									pndone = true;
									if (nldone)
										resolve(" ");
								});

						$.get(serverURI + 'Comments/getActiveComments/news/'
								+ $stateParams.newsId, function(data) {
							commentsList = data;
							nldone = true;
							if (pndone)
								resolve(" ");
						});
					});

					promise.then(function(data) {
						$scope.news = news[0];
						$scope.commentsList = commentsList;
						$scope.hideLoading();
					}, null);
				})

		.controller(
				'videosCtrl',
				function($scope, $stateParams, $q, $ionicSlideBoxDelegate) {
					$scope.showLoading();
					var publicVideos, videosList;
					var promise = $q(function(resolve, reject) {
						var pndone = false;
						var nldone = false;

						$.get(serverURI + 'Video/getPublic/' + publicNunber,
								function(data) {
									publicVideos = data;
									pndone = true;
									if (nldone)
										resolve(" ");
								});

						$.get(serverURI + 'Video/getAllActive/',
								function(data) {
									videosList = data;
									nldone = true;
									if (pndone)
										resolve(" ");
								});
					});

					promise.then(function(data) {
						$scope.publicVideos = publicVideos;
						$scope.videosList = chunk(videosList, 2);
						$ionicSlideBoxDelegate.update();
						$scope.hideLoading();
					}, null);
				})

		.controller(
				'videoDetialsCtrl',
				function($scope, $timeout ,$stateParams, $q) {

					$scope.showLoading();
					var video, commentsList;
					var promise = $q(function(resolve, reject) {
						var pndone = false;
						var nldone = false;

						$.get(serverURI + 'Video/getByID/'
								+ $stateParams.videoId, function(data) {
							video = data;
							pndone = true;
							if (nldone)
								resolve(" ");
						});

						$.get(serverURI + 'Comments/getActiveComments/video/'
								+ $stateParams.videoId, function(data) {
							commentsList = data;
							nldone = true;
							if (pndone)
								resolve(" ");
						});
					});

					promise.then(function(data) {
						$scope.video = video[0];
						$scope.commentsList = commentsList;
						$timeout(function() {
							videojs("video-" +  video[0].id );
							$("#video-" +  video[0].id).css({"display" : "block"});
							$("#video-" +  video[0].id +" video").css({"display" : "block"});
						});
						$scope.hideLoading();
					}, null);
				})

		.controller(
				'soundsCtrl',
				function($scope, $stateParams, $q, $ionicSlideBoxDelegate) {
					$scope.showLoading();
					var publicSounds, soundsList;
					var promise = $q(function(resolve, reject) {
						var pndone = false;
						var nldone = false;

						$.get(serverURI + 'Audio/getPublic/' + publicNunber,
								function(data) {
									publicSounds = data;
									pndone = true;
									if (nldone)
										resolve(" ");
								});

						$.get(serverURI + 'Audio/getAllActive/',
								function(data) {
									soundsList = data;
									nldone = true;
									if (pndone)
										resolve(" ");
								});
					});

					promise.then(function(data) {
						$scope.publicSounds = publicSounds;
						$scope.soundsList = chunk(soundsList, 2);
						$ionicSlideBoxDelegate.update();
						$scope.hideLoading();
					}, null);
				})

		.controller(
				'soundDetialsCtrl',
				function($scope, $stateParams, $q) {

					$scope.showLoading();
					var sound, commentsList;
					var promise = $q(function(resolve, reject) {
						var pndone = false;
						var nldone = false;

						$.get(serverURI + 'Audio/getByID/'
								+ $stateParams.soundId, function(data) {
							sound = data;
							pndone = true;
							if (nldone)
								resolve(" ");
						});

						$.get(serverURI + 'Comments/getActiveComments/audio/'
								+ $stateParams.soundId, function(data) {
							commentsList = data;
							nldone = true;
							if (pndone)
								resolve(" ");
						});
					});

					promise.then(function(data) {
						$scope.sound = sound[0];
						$scope.commentsList = commentsList;
						$scope.hideLoading();
					}, null);
				})

		.controller(
				'picturesCtrl',
				function($scope, $stateParams, $q, $ionicSlideBoxDelegate) {
					$scope.showLoading();
					var publicPictures, picturesList;
					var promise = $q(function(resolve, reject) {
						var pndone = false;
						var nldone = false;

						$.get(serverURI + 'Photo/getPublic/' + publicNunber,
								function(data) {
									publicPictures = data;
									pndone = true;
									if (nldone)
										resolve(" ");
								});

						$.get(serverURI + 'Photo/getAllActive/',
								function(data) {
									picturesList = data;
									nldone = true;
									if (pndone)
										resolve(" ");
								});
					});

					promise.then(function(data) {
						$scope.publicPictures = publicPictures;
						$scope.picturesList = chunk(picturesList, 2);
						$ionicSlideBoxDelegate.update();
						$scope.hideLoading();
					}, null);
				})

		.controller(
				'pictureDetialsCtrl',
				function($scope, $stateParams, $q) {
					$scope.showLoading();
					var picture, commentsList;
					var promise = $q(function(resolve, reject) {
						var pndone = false;
						var nldone = false;

						$.get(serverURI + 'Photo/getByID/'
								+ $stateParams.pictureId, function(data) {
							picture = data;
							pndone = true;
							if (nldone)
								resolve(" ");
						});

						$.get(serverURI + 'Comments/getActiveComments/photo/'
								+ $stateParams.pictureId, function(data) {
							commentsList = data;
							nldone = true;
							if (pndone)
								resolve(" ");
						});
					});

					promise.then(function(data) {
						$scope.hideLoading();
						$scope.picture = picture[0];
						$scope.commentsList = commentsList;
						$scope.hideLoading();
					}, null);
				})

		.controller(
				'introVidCtrl',
				function($scope, $cordovaMedia, $state, $ionicHistory) {

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
					}, 3500);
						
					
					ionic.Platform
							.ready(function() {
								readyCalled = true;
								//alert("this is me !!!! ...");
								$("#introDiv")
										.html(
												'<img id="introImg" src="intro/hd.gif" style="margin: auto; max-height: 100%; width: 100%; background-color: #48270C;" />');
								var initIntroSplash = function() {
									try {

										var introAudioSrc = null;
										if (ionic.Platform.isAndroid()) {
											introAudioSrc = '/android_asset/www/intro/intro.mp2';
											var introAudio = $cordovaMedia
													.newMedia(introAudioSrc);
											introAudio.play();
										} else if (ionic.Platform.isIOS()) {
											introAudioSrc = 'intro/intro.mp2';
											var iOSPlayOptions = {
												numberOfLoops : 1,
												playAudioWhenScreenIsLocked : false
											};
											var introAudio = $cordovaMedia
													.newMedia(introAudioSrc);
											introAudio.play(iOSPlayOptions);
										}

									} catch (e) {
										console.log(e);
										alert(e);
									} finally {
										setTimeout(function() {
											$("#introImg").hide();
											endIntro();
										}, 3500);
									}
								};
								initIntroSplash();

							});
				});
