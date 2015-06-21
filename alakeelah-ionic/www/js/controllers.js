//var serverURI = 'http://localhost/NewProject/public/';
var serverURI = 'http://alaqila.tv/admin528/public/';

var publicNunber = 5;

var settingsList = "";

function chunk(arr, size) {
	var newArr = [];
	if(arr != null)
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
	$('.body').css({
		"backgroundImage" : "url(img/bg" + color + ".png) "
	});
	localStorage.setItem("color", color);
};

angular
		.module('starter.controllers', [])

		.controller(
				'AppCtrl',
				function($scope, $ionicModal, $translate, $ionicLoading, $sce , $cordovaSocialSharing , $timeout) {

					$scope.showLoading = function() {
						$ionicLoading.show({
							templateUrl : 'templates/loading.html',
							hideOnStateChange : true
						});
					};
					
					$scope.hideLoading = function() {
						$timeout( function(){ $ionicLoading.hide(); }, 1000);
					};
					
					$scope.changeLang = function(lang) {
						$translate.use(lang);
						if (lang == "ar") {
							$('.body').addClass("ar");
						} else {
							$('.body').removeClass("ar");
						}
						localStorage.setItem("language", lang);
					};

					$scope.showLoading();
						
					$scope.comment = {
							'type_id' : '',
							'type' : '',
							'username' : '',
						    'title' : '',
						    'content' : '',
						    'checkbox' : '',
					};
					
					$scope.commentfunc = function(form , form_name) {
						    $ionicLoading.show({ template: $translate('submiting_msg') , duration: 1500});
						    if(form.$valid) {
						    	$scope.comment.type_id = $('#' + form_name + ' input[name=type_id]').val();
						    	$scope.comment.type =  $('#'+ form_name + ' input[name=type]').val();
						        $.post( serverURI + 'Comment/add/', $scope.comment ).
						        success(function(data, status, headers, config) {
						        	$ionicLoading.hide();
						        	$ionicLoading.show({ template: $translate('submitingdone_msg')  , duration: 3000});
						        }).error(function(data, status) {
						        	$ionicLoading.hide();
						        	$ionicLoading.show({ template: $translate('submitingerror_msg')  , duration: 3000});
						        });
						    }
					}
					
					jQuery.get(serverURI + 'Settings/getAll/',
							function(data) {
								settingsList = data[0]
								$scope.settingsList = settingsList;
								localStorage.setItem('settingsList', JSON
										.stringify(settingsList));
							}).fail(
							function() {
								try {
									settingsList = JSON
											.parse(localStorage.settingsList);
									$scope.settingsList = settingsList;
								} catch (ex) {
									// Redirect To Error Page No Connection And
									// No Data
								}
							});
					
					$scope.shareAnywhere = function( massage , image ) {
						if(!settingsList.shareURL || settingsList.shareURL === "") settingsList.shareURL = "http://alaqila.tv"
							$cordovaSocialSharing.share( massage , $translate('appname_msg'), image , settingsList.shareURL );
				    }

					jQuery.get(serverURI + 'Pages/getAllActive',
							function(data) {
								$scope.pageList = data;
								localStorage.setItem('pageList', JSON
										.stringify(data));
							}).fail(
							function() {
								try {
									$scope.pageList = JSON
											.parse(localStorage.pageList);
								} catch (ex) {
									// Redirect To Error Page No Connection And
									// No Data
								}
							});

					$.get(serverURI + 'News/getResentNews/',
							function(data) {
								$scope.resentNews = data;
								localStorage.setItem('resentNews', JSON
										.stringify(data));
							}).fail(
							function() {
								try {
									$scope.resentNews = JSON
											.parse(localStorage.resentNews);
								} catch (ex) {
									// Redirect To Error Page No Connection And
									// No Data
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
						var objDate = new Date(date);
						return objDate.getUTCDate();
					};

					$scope.openOut = function(href) {
						window.open(href, '_system', 'location=yes');
					}
					
					$scope.changeBgColor = cahngColor;
		})

		.controller(
				'mainCtrl',
				function($scope, $stateParams, $q,$state, $ionicSlideBoxDelegate) {

					$scope.showLoading();

					var news, vedios, sounds, pictures;
					var promise = $q(function(resolve, reject) {
						var ndone = false;
						var vdone = false;
						var sdone = false;
						var pdone = false;

						$.get(serverURI + 'News/getHomePublic/' + publicNunber,
										function(data) {
											news = data;
											localStorage.setItem('homeNews',JSON.stringify(data));
											ndone = true;
											if (vdone && sdone && pdone)
												resolve(" ");
										})
								.fail(function() {
											try {
												news = JSON.parse(localStorage.homeNews);
												ndone = true;
												if (vdone && sdone && pdone)
													resolve(" ");
											} catch (ex) {
												// Redirect To Error Page No
												// Connection And No Data
												$scope.hideLoading();
												$state.go("app.error");
												console.log("This is EX in Fitching Home News From Local Storage , No Internet Connection And No News ..");
											}
										});

						$.get(serverURI + 'Video/getHomePublic/' + publicNunber,
										function(data) {
											vedios = data;
											localStorage.setItem('homeVedios',JSON.stringify(data));
											vdone = true;
											if (ndone && sdone && pdone)
												resolve(" ");
										})
								.fail(function() {
											try {
												vedios = JSON.parse(localStorage.homeVedios);
												vdone = true;
												if (ndone && sdone && pdone)
													resolve(" ");
											} catch (ex) {
												// Redirect To Error Page No
												// Connection And No Data
												$scope.hideLoading();
												$state.go("app.error");
												console.log("This is EX in Fitching Home Videos From Local Storage , No Internet Connection And No News ..");
											}
										});

						$.get(serverURI + 'Audio/getHomePublic/' + publicNunber,
										function(data) {
											sounds = data;
											localStorage.setItem('homeSounds',
													JSON.stringify(data));
											sdone = true;
											if (vdone && ndone && pdone)
												resolve(" ");
										})
								.fail(function() {
											try {
												sounds = JSON.parse(localStorage.homeSounds);
												sdone = true;
												if (vdone && ndone && pdone)
													resolve(" ");
											} catch (ex) {
												// Redirect To Error Page No
												// Connection And No Data
												$scope.hideLoading();
												$state.go("app.error");
												console.log("This is EX in Fitching Home Sounds From Local Storage , No Internet Connection And No News ..");
											}
										});

						$.get(serverURI + 'Photo/getHomePublic/' + publicNunber,
										function(data) {
											pictures = data;
											localStorage.setItem('homePictures', JSON.stringify(data));
											pdone = true;
											if (vdone && ndone && sdone)
												resolve(" ");
										})
								.fail(function() {
											try {
												pictures = JSON.parse(localStorage.homePictures);
												pdone = true;
												if (vdone && ndone && sdone)
													resolve(" ");
											} catch (ex) {
												// Redirect To Error Page No
												// Connection And No Data
												$scope.hideLoading();
												$state.go("app.error");
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
				function($scope, $stateParams, $q,$state, $ionicSlideBoxDelegate) {
					var pageID = $stateParams.pageId;
					$scope.showLoading();
					var promise = $q(function(resolve, reject) {
						$.get(serverURI + 'Pages/getPageUsers/' + pageID,
								function(data) {
									localStorage.setItem('PageUsers' + pageID, JSON.stringify(data));
									resolve(data);
								}).fail(function() {
											try {
												resolve(JSON.parse(localStorage.getItem('PageUsers'+ pageID)));
											} catch (ex) {
												// Redirect To Error Page No
												// Connection And No Data
												$scope.hideLoading();
												$state.go("app.error");
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

		.controller(
				'pageViewDetialsCtrl',
				function($scope, $stateParams, $q,$state, $ionicSlideBoxDelegate) {
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
												+ userID,
										function(data) {
											user = data[0];
											localStorage.setItem('user'
													+ userID, JSON
													.stringify(data[0]));
											udone = true;
											if (vdone && sdone && pdone
													&& ndone)
												resolve(" ");
										})
								.fail(function() {
											try {
												user = JSON.parse(localStorage.getItem('user'+ userID));
												udone = true;
												if (vdone && sdone && pdone && ndone)
													resolve(" ");
											} catch (ex) {
												// Redirect To Error Page No
												// Connection And No Data
												$scope.hideLoading();
												$state.go("app.error");
												console.log("This is EX in Fitching User From Local Storage , No Internet Connection And No News ..");
											}
										});

						$.get(serverURI + 'News/getByUser/' + userID,
										function(data) {
											news = data;
											localStorage.setItem('userNews'
													+ userID, JSON
													.stringify(data));
											ndone = true;
											if (vdone && sdone && pdone
													&& udone)
												resolve(" ");
										})
								.fail(
										function() {
											try {
												news = JSON.parse(localStorage.getItem('userNews' + userID));
												ndone = true;
												if (vdone && sdone && pdone && udone)
													resolve(" ");
											} catch (ex) {
												// Redirect To Error Page No
												// Connection And No Data
												$scope.hideLoading();
												$state.go("app.error");
												console.log("This is EX in Fitching User News From Local Storage , No Internet Connection And No News ..");
											}
										});

						$.get(serverURI + 'Video/getByUser/' + userID,
										function(data) {
											vedios = data;
											localStorage.setItem('userVedios'
													+ userID, JSON
													.stringify(data));
											vdone = true;
											if (ndone && sdone && pdone
													&& udone)
												resolve(" ");
							}).fail(function() {
											try {
												vedios = JSON.parse(localStorage.getItem('userVedios'+ userID));
												vdone = true;
												if (ndone && sdone && pdone
														&& udone)
													resolve(" ");
											} catch (ex) {
												// Redirect To Error Page No
												// Connection And No Data
												$scope.hideLoading();
												$state.go("app.error");
												console.log("This is EX in Fitching User Videos From Local Storage , No Internet Connection And No News ..");
											}
										});

						$.get(serverURI + 'Audio/getByUser/' + userID,
										function(data) {
											sounds = data;
											localStorage.setItem('userSounds'
													+ userID, JSON
													.stringify(data));
											sdone = true;
											if (vdone && ndone && pdone
													&& udone)
												resolve(" ");
							}).fail(function() {
											try {
												sounds = JSON.parse(localStorage.getItem('userSounds'+ userID));
												sdone = true;
												if (vdone && ndone && pdone
														&& udone)
													resolve(" ");
											} catch (ex) {
												// Redirect To Error Page No
												// Connection And No Data
												$scope.hideLoading();
												$state.go("app.error");
												console.log("This is EX in Fitching User Sounds From Local Storage , No Internet Connection And No News ..");
											}
							});

						$.get(serverURI + 'Photo/getByUser/' + userID,
										function(data) {
											pictures = data;
											localStorage.setItem('userPictures'
													+ userID, JSON
													.stringify(data));
											pdone = true;
											if (vdone && ndone && sdone
													&& udone)
												resolve(" ");
										})
								.fail(
										function() {
											try {
												pictures = JSON
														.parse(localStorage
																.getItem('userPictures'
																		+ userID));
												pdone = true;
												if (vdone && ndone && sdone
														&& udone)
													resolve(" ");
											} catch (ex) {
												// Redirect To Error Page No
												// Connection And No Data
												$scope.hideLoading();
												$state.go("app.error");
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
				function($scope, $stateParams, $q, $sce,$state, $ionicSlideBoxDelegate) {
					$scope.showLoading();
					var commentsList, broadcastURI;
					var promise = $q(function(resolve, reject) {
						var pndone = false;
						var nldone = false;
						$.get(serverURI + 'Comments/getActiveComments/broadcast/'
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
					promise
							.then(
									function(data) {
										$scope.commentsList = commentsList;
										$scope.broadcastURI = broadcastURI;
										$scope.userID = $stateParams.userID;
										$scope.theme = "lib/videogular-themes-default/videogular.css";
										$scope.poster = "/img/defult.png";
										$scope.sources = [{
													src : $sce
															.trustAsResourceUrl(broadcastURI),
													type : "video/mp4"
												},
												{
													src : $sce
															.trustAsResourceUrl(broadcastURI),
													type : "video/m4a"
												},
												{
													src : $sce
															.trustAsResourceUrl(broadcastURI),
													type : "video/webm"
												},
												{
													src : $sce
															.trustAsResourceUrl(broadcastURI),
													type : "video/ogg"
												} ];
										$ionicSlideBoxDelegate.update();
										$scope.hideLoading();
									}, null);
				})

		.controller('frequencyCtrl', function($scope, $stateParams, $q) {
					$scope.showLoading();
					var commentsList;
					var promise = $q(function(resolve, reject) {
							$.get(serverURI + 'Comments/getActiveComments/frequency/' + 0,function(data) {
									commentsList = data;
									localStorage.setItem('frequencyComments', JSON.stringify(data));
									resolve(data);
							}).fail(function() {
								try {
									commentsList = JSON.parse(localStorage.getItem('frequencyComments'));
									resolve(commentsList);
								} catch (ex) {
									// Redirect To Error Page No Connection And No Data
									$scope.hideLoading();
								}
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

		.controller('newsCtrl',function($scope, $stateParams, $state, $q, $ionicSlideBoxDelegate) {
					$scope.showLoading();
					var publicNews, newsList;
					var promise = $q(function(resolve, reject) {
						var pndone = false;
						var nldone = false;

						$.get(serverURI + 'News/getPublic/' + publicNunber,
								function(data) {
									publicNews = data;
									localStorage.setItem('publicNews', JSON
											.stringify(data));
									pndone = true;
									if (nldone)
										resolve(" ");
						}).fail(function() {
								try {
									publicNews = JSON.parse(localStorage.getItem('publicNews'));
									pndone = true;
									if (nldone)
										resolve(" ");
								} catch (ex) {
									// Redirect To Error Page No Connection And No Data
									$scope.hideLoading();
									$state.go("app.error");
									console.log("This is EX in Fitching Public News From Local Storage , No Internet Connection And No News ..");
								}
						});

						$.get(serverURI + 'News/getAllActive/', function(data) {
							newsList = data;
							localStorage.setItem('newsList', JSON.stringify(data));
							nldone = true;
							if (pndone)
								resolve(" ");
						}).fail(function() {
							try {
								newsList = JSON.parse(localStorage.getItem('newsList'));
								nldone = true;
								if (pndone)
									resolve(" ");
							} catch (ex) {
								// Redirect To Error Page No Connection And No Data
								$scope.hideLoading();
								$state.go("app.error");
								console.log("This is EX in Fitching News List From Local Storage , No Internet Connection And No News ..");
							}
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
				function($scope, $stateParams, $q, $state ) {
					$scope.showLoading();
					
					var news, commentsList;
					var promise = $q(function(resolve, reject) {
						var pndone = false;
						var nldone = false;

						$.get( serverURI + 'News/getByID/' + $stateParams.newsId, function(data) {
									news = data;
									localStorage.setItem('news'+  $stateParams.newsId , JSON.stringify(data));
									pndone = true;
									if (nldone)
										resolve(" ");
						}).fail(function() {
									try {
										news = JSON.parse(localStorage.getItem('news'+  $stateParams.newsId));
										pndone = true;
										if (nldone)
											resolve(" ");
									} catch (ex) {
										// Redirect To Error Page No Connection And No Data
										$scope.hideLoading();
										$state.go("app.error");
										console.log("This is EX in Fitching Public News From Local Storage , No Internet Connection And No News ..");
									}
						});

						$.get(serverURI + 'Comments/getActiveComments/news/'
								+ $stateParams.newsId, function(data) {
							commentsList = data;
							localStorage.setItem('newsComments'+  $stateParams.newsId , JSON.stringify(data));
							nldone = true;
							if (pndone)
								resolve(" ");
						}).fail(function() {
							try {
								commentsList = JSON.parse(localStorage.getItem('newsComments'+  $stateParams.newsId));
								nldone = true;
								if (pndone)
									resolve(" ");
							} catch (ex) {
								// Redirect To Error Page No Connection And No Data
								$scope.hideLoading();
								$state.go("app.error");
								console.log("This is EX in Fitching Public News From Local Storage , No Internet Connection And No News ..");
							}
						});
					});

					promise.then(function(data) {
						if(news != null){
							$scope.news = news[0];
							$scope.commentsList = commentsList;
						}
						$scope.hideLoading();
					}, null);
					
				})

		.controller(
				'videosCtrl',
				function($scope, $stateParams, $q, $state, $ionicSlideBoxDelegate) {
					$scope.showLoading();
					var publicVideos, videosList;
					var promise = $q(function(resolve, reject) {
						var pndone = false;
						var nldone = false;

						$.get(serverURI + 'Video/getPublic/' + publicNunber,
								function(data) {
									publicVideos = data;
									localStorage.setItem('publicVideos' , JSON.stringify(data));
									pndone = true;
									if (nldone)
										resolve(" ");
								}).fail(function() {
									try {
										publicVideos = JSON.parse(localStorage.getItem('publicVideos'));
										pndone = true;
										if (nldone)
											resolve(" ");
									} catch (ex) {
										// Redirect To Error Page No Connection And No Data
										$scope.hideLoading();
										$state.go("app.error");
										console.log("This is EX in Fitching publicVideos From Local Storage , No Internet Connection And No News ..");
									}
								});

						$.get(serverURI + 'Video/getAllActive/',
								function(data) {
									videosList = data;
									localStorage.setItem('videosList',JSON.stringify(data));
									nldone = true;
									if (pndone)
										resolve(" ");
								}).fail(function() {
									try {
										videosList = JSON.parse(localStorage.getItem('videosList'));
										nldone = true;
										if (pndone)
											resolve(" ");
									} catch (ex) {
										// Redirect To Error Page No Connection And No Data
										$scope.hideLoading();
										$state.go("app.error");
										console.log("This is EX in Fitching News List From Local Storage , No Internet Connection And No News ..");
									}
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
				function($scope, $sce, $state, $stateParams, $q) {

					$scope.showLoading();
					var video, commentsList;
					var promise = $q(function(resolve, reject) {
						var pndone = false;
						var nldone = false;

						$.get(serverURI + 'Video/getByID/'
								+ $stateParams.videoId, function(data) {
							video = data;
							localStorage.setItem('video'+  $stateParams.videoId , JSON.stringify(data));
							pndone = true;
							if (nldone)
								resolve(" ");
						}).fail(function() {
							try {
								video = JSON.parse(localStorage.getItem('video'+  $stateParams.videoId));
								pndone = true;
								if (nldone)
									resolve(" ");
							} catch (ex) {
								// Redirect To Error Page No Connection And No Data
								$scope.hideLoading();
								$state.go("app.error");
								console.log("This is EX in Fitching Public News From Local Storage , No Internet Connection And No News ..");
							}
						});

						$.get(serverURI + 'Comments/getActiveComments/video/' + $stateParams.videoId, function(data) {
							commentsList = data;
							localStorage.setItem('videoComments'+  $stateParams.videoId , JSON.stringify(data));
							nldone = true;
							if (pndone)
								resolve(" ");
						}).fail(function() {
							try {
								commentsList = JSON.parse(localStorage.getItem('videoComments'+  $stateParams.videoId));
								nldone = true;
								if (pndone)
									resolve(" ");
							} catch (ex) {
								// Redirect To Error Page No Connection And No Data
								$scope.hideLoading();
								$state.go("app.error");
								console.log("This is EX in Fitching Public News From Local Storage , No Internet Connection And No News ..");
							}
						});
					});

					promise
							.then(
									function(data) {
										if(video != null){
											$scope.video = video[0];
											
											$scope.theme = "lib/videogular-themes-default/videogular.css";
											$scope.sources = [
													{
														src : $sce
																.trustAsResourceUrl(video[0].videolink),
														type : "video/mp4"
													},
													{
														src : $sce
																.trustAsResourceUrl(video[0].videolink),
														type : "video/m4a"
													},
													{
														src : $sce
																.trustAsResourceUrl(video[0].videolink),
														type : "video/webm"
													},
													{
														src : $sce
																.trustAsResourceUrl(video[0].videolink),
														type : "video/ogg"
													} ];
										}
										$scope.commentsList = commentsList;
										$scope.hideLoading();
									}, null);
				})

		.controller(
				'soundsCtrl',
				function($scope, $stateParams, $q, $state, $ionicSlideBoxDelegate) {
					$scope.showLoading();
					var publicSounds, soundsList;
					var promise = $q(function(resolve, reject) {
						var pndone = false;
						var nldone = false;

						$.get(serverURI + 'Audio/getPublic/' + publicNunber,
								function(data) {
									publicSounds = data;
									localStorage.setItem('publicSounds', JSON
											.stringify(data));
									pndone = true;
									if (nldone)
										resolve(" ");
								}).fail(function() {
									try {
										publicSounds = JSON.parse(localStorage.getItem('publicSounds'));
										pndone = true;
										if (nldone)
											resolve(" ");
									} catch (ex) {
										// Redirect To Error Page No Connection And No Data
										$scope.hideLoading();
										$state.go("app.error");
										console.log("This is EX in Fitching publicVideos From Local Storage , No Internet Connection And No News ..");
									}
								});

						$.get(serverURI + 'Audio/getAllActive/',
								function(data) {
									soundsList = data;
									localStorage.setItem('soundsList' , JSON.stringify(data));
									nldone = true;
									if (pndone)
										resolve(" ");
								}).fail(function() {
									try {
										soundsList = JSON.parse(localStorage.getItem('soundsList'));
										nldone = true;
										if (pndone)
											resolve(" ");
									} catch (ex) {
										// Redirect To Error Page No Connection And No Data
										$scope.hideLoading();
										$state.go("app.error");
										console.log("This is EX in Fitching News List From Local Storage , No Internet Connection And No News ..");
									}
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
				function($scope, $stateParams, $state, $q) {

					$scope.showLoading();
					var sound, commentsList;
					var promise = $q(function(resolve, reject) {
						var pndone = false;
						var nldone = false;

						$.get(serverURI + 'Audio/getByID/' + $stateParams.soundId, function(data) {
							sound = data;
							localStorage.setItem('sound'+  $stateParams.soundId , JSON.stringify(data));
							pndone = true;
							if (nldone)
								resolve(" ");
						}).fail(function() {
							try {
								sound = JSON.parse(localStorage.getItem('sound'+  $stateParams.soundId));
								pndone = true;
								if (nldone)
									resolve(" ");
							} catch (ex) {
								// Redirect To Error Page No Connection And No Data
								$scope.hideLoading();
								$state.go("app.error");
								console.log("This is EX in Fitching Public News From Local Storage , No Internet Connection And No News ..");
							}
						});

						$.get(serverURI + 'Comments/getActiveComments/audio/' + $stateParams.soundId, function(data) {
							commentsList = data;
							localStorage.setItem('soundComments'+  $stateParams.soundId , JSON.stringify(data));
							nldone = true;
							if (pndone)
								resolve(" ");
						}).fail(function() {
							try {
								commentsList = JSON.parse(localStorage.getItem('soundComments'+  $stateParams.soundId));
								nldone = true;
								if (pndone)
									resolve(" ");
							} catch (ex) {
								// Redirect To Error Page No Connection And No Data
								$scope.hideLoading();
								$state.go("app.error");
								console.log("This is EX in Fitching Public News From Local Storage , No Internet Connection And No News ..");
							}
						});
					});

					promise.then(function(data) {
						if(sound != null)
							$scope.sound = sound[0];
						$scope.commentsList = commentsList;
						$scope.hideLoading();
					}, null);
				})

		.controller(
				'picturesCtrl',
				function($scope, $stateParams, $q, $state, $ionicSlideBoxDelegate) {
					$scope.showLoading();
					var publicPictures, picturesList;
					var promise = $q(function(resolve, reject) {
						var pndone = false;
						var nldone = false;

						$.get(serverURI + 'Photo/getPublic/' + publicNunber,
								function(data) {
									publicPictures = data;
									localStorage.setItem('publicPictures' , JSON.stringify(data));
									pndone = true;
									if (nldone)
										resolve(" ");
								}).fail(function() {
									try {
										publicSounds = JSON.parse(localStorage.getItem('publicPictures'));
										pndone = true;
										if (nldone)
											resolve(" ");
									} catch (ex) {
										// Redirect To Error Page No Connection And No Data
										$scope.hideLoading();
										$state.go("app.error");
										console.log("This is EX in Fitching publicVideos From Local Storage , No Internet Connection And No News ..");
									}
								});

						$.get(serverURI + 'Photo/getAllActive/',
								function(data) {
									picturesList = data;
									localStorage.setItem('picturesList' , JSON.stringify(data));
									nldone = true;
									if (pndone)
										resolve(" ");
								}).fail(function() {
									try {
										picturesList = JSON.parse(localStorage.getItem('picturesList'));
										nldone = true;
										if (pndone)
											resolve(" ");
									} catch (ex) {
										// Redirect To Error Page No Connection And No Data
										$scope.hideLoading();
										$state.go("app.error");
										console.log("This is EX in Fitching News List From Local Storage , No Internet Connection And No News ..");
									}
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
				function($scope, $stateParams, $state, $q) {
					$scope.showLoading();
					var picture, commentsList;
					var promise = $q(function(resolve, reject) {
						var pndone = false;
						var nldone = false;

						$.get(serverURI + 'Photo/getByID/' + $stateParams.pictureId, function(data) {
							picture = data;
							localStorage.setItem('picture'+  $stateParams.pictureId , JSON.stringify(data));
							pndone = true;
							if (nldone)
								resolve(" ");
						}).fail(function() {
							try {
								picture = JSON.parse(localStorage.getItem('picture'+  $stateParams.pictureId));
								pndone = true;
								if (nldone)
									resolve(" ");
							} catch (ex) {
								// Redirect To Error Page No Connection And No Data
								$scope.hideLoading();
								$state.go("app.error");
								console.log("This is EX in Fitching Public News From Local Storage , No Internet Connection And No News ..");
							}
						});
						
						$.get(serverURI + 'Comments/getActiveComments/photo/' + $stateParams.pictureId, function(data) {
							commentsList = data;
							localStorage.setItem('pictureComments'+  $stateParams.pictureId , JSON.stringify(data));
							nldone = true;
							if (pndone)
								resolve(" ");
						}).fail(function() {
							try {
								commentsList = JSON.parse(localStorage.getItem('pictureComments'+  $stateParams.pictureId));
								nldone = true;
								if (pndone)
									resolve(" ");
							} catch (ex) {
								// Redirect To Error Page No Connection And No Data
								$scope.hideLoading();
								$state.go("app.error");
								console.log("This is EX in Fitching Public News From Local Storage , No Internet Connection And No News ..");
							}
						});
					});

					promise.then(function(data) {
						if(picture != null)
							$scope.picture = picture[0];
						$scope.commentsList = commentsList;
						$scope.hideLoading();
					}, null);
				})
		.controller('errorCtrl',function(){
			
		})
		
		.controller('advertismentCtrl',function($scope, $stateParams, $state, $q){
			$scope.dataLoaded = false;			
			var advertisments;
			var promise = $q(function(resolve, reject) {
				$.get(serverURI + 'Advertisement/getAllActive/', function(data) {
					advertisments = data;
					localStorage.setItem('advertisments' , JSON.stringify(data));
					resolve(" ");
				}).fail(function() {
					try {
						advertisments = JSON.parse(localStorage.getItem('advertisments'));
						resolve(" ");
					} catch (ex) {
						// Redirect To Error Page No Connection And No Data
						$scope.hideLoading();
						$state.go("app.error");
						console.log("This is EX in Fitching Public News From Local Storage , No Internet Connection And No News ..");
					}
				});
			});

			promise.then(function(data) {
				$scope.advertisments = advertisments;
				$scope.hideLoading();
			}, null);
		})
		
		.controller('introVidCtrl',
				function($scope, $cordovaMedia, $state, $ionicHistory) {

					var endIntro = function() {
						$ionicHistory.nextViewOptions({
							disableAnimate : true,
							disableBack : true
						});
						$state.go("app.main");
					};

					// var readyCalled = false;

					setTimeout(function() {
						// if (!readyCalled) {
						endIntro();
						// }
					}, 9000);

					ionic.Platform.ready(function() {
						// readyCalled = true;
						// alert("this is ionic ready");
						// $("#introDiv")
						// .html(
						// '<img id="introImg" src="intro/hd.gif" style="margin:
						// auto; max-height: 100%; width: 100%;
						// background-color: #48270C;" />');
						// var initIntroSplash = function() {
						// try {
						//
						// var introAudioSrc = null;
						// if (ionic.Platform.isAndroid()) {
						// introAudioSrc = '/android_asset/www/intro/intro.mp2';
						// var introAudio = $cordovaMedia
						// .newMedia(introAudioSrc);
						// introAudio.play();
						// } else if (ionic.Platform.isIOS()) {
						// introAudioSrc = 'intro/intro.mp2';
						// var iOSPlayOptions = {
						// numberOfLoops : 1,
						// playAudioWhenScreenIsLocked : false
						// };
						// var introAudio = $cordovaMedia
						// .newMedia(introAudioSrc);
						// introAudio.play(iOSPlayOptions);
						// }
						//
						// } catch (e) {
						// console.log(e);
						// alert(e);
						// } finally {
						// setTimeout(function() {
						// $("#introImg").hide();
						// endIntro();
						// }, 3500);
						// }
						// };
						// initIntroSplash();

					});
				});
