//var serverURI = 'http://localhost/NewProject/public/';
var serverURI = 'http://alaqila.tv/admin528/public/';
var appStoreURL = '';
var publicNunber = 5;

//var is_ios = /(iPad|iPhone|iPod)/g.test( navigator.userAgent );

//if(is_ios){
	//$('.body ion-side-menus').css("top", "20px;");
	//appStoreURL = 'https://itunes.apple.com/us/app/alaqila-tv/id1004536281?ls=1&mt=8'; 
//}else{
	appStoreURL = 'https://play.google.com/store/apps/details?id=com.alaqila'; 
//}

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

angular.module('starter.controllers', [])

		.controller(
				'AppCtrl',
				function($scope, $ionicModal, $ionicHistory ,$translate, $ionicLoading, $sce , $cordovaSocialSharing , $timeout) {
					$ionicHistory.clearCache();
					
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
							//if(!settingsList.shareURL || settingsList.shareURL === "") 
							//settingsList.shareURL = "http://alaqila.tv";
						$cordovaSocialSharing.share( massage , $translate('appname_msg'), image , appStoreURL );
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
						var monthNamesAr = [ "يناير", " فبراير", "مارس",
								"ابريل", "مايو", "يونيو", "يوليو", "اغسطس",
								"سبتمبر", "اكتوبر", "نوفمبر",
								"ديسمبر" ];
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
					
					$scope.getTime = function(date) {
						var objDate = new Date(date);
						var h = objDate.getHours();
						var m = objDate.getMinutes();
						if(h<10)  h = '0' + h;
						if(m<10)  m = '0' + m;
						return h + " : " + m;
					};

					$scope.openOut = function(href) {
						if( href != "" ){
							window.open(href, '_system', 'location=yes');
						}
					}
					
					$scope.changImageUrl = function(href) {
						if(href){
							return href.replace('orginal', '700-350');
						}else{
							return "";
						}
					}
					
					$scope.changContentLinks = function(html){
						
						var div = document.createElement("div");
						div.innerHTML = html;
						var text = div.textContent || div.innerText || "";
						
						var pattern1 = /(?:http?s?:\/\/)?(?:www\.)?(?:vimeo\.com)\/?([0-9a-zA-Z-]+)/g;
				        var pattern2 = /(?:http?s?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?([0-9a-zA-Z-]+)/g;
				        var pattern3 = /([-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?(?:jpg|jpeg|gif|png))/gi;

				        if(pattern1.test(text)){
				        	var replacement = '<div style="text-align:center"><iframe webkit-playsinline width="95%" height="200" src="//player.vimeo.com/video/$1" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div>';
				        	text = text.replace(pattern1, replacement);
				        }
				     
				        if(pattern2.test(text)){
				            var replacement = '<div style="text-align:center"><iframe webkit-playsinline width="95%" height="200" src="http://www.youtube.com/embed/$1" frameborder="0" allowfullscreen></iframe></div>';
				            text = text.replace(pattern2, replacement);
				        }

				        if(pattern3.test(text)){
				            var replacement = '<img class="sml" src="$1" /><br />';
				            text = text.replace(pattern3, replacement);
				        }
				        
				        text = text.replace(/\n/g, "<br />");
				        
				        return $sce.trustAsHtml(text);
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
												if(news === null) {
													$state.go("app.error");
												}
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
												if(vedios === null) {
													$state.go("app.error");
												}
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
												if(sounds === null) {
													$state.go("app.error");
												}
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
												if(pictures === null) {
													$state.go("app.error");
												}
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
												var da = JSON.parse(localStorage.getItem('PageUsers'+ pageID))
												if(da === null) {
													$state.go("app.error");
												}
												resolve(da);
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
///////////////////////////////////////////////////////////////////////////////////////////////////////////
		.controller(
				'pageViewDetialsCtrl',
				function($scope, $stateParams, $q,$state, $ionicSlideBoxDelegate , userService) {
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
												if(user === null) {
													$state.go("app.error");
												}
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
												if(news === null) {
													$state.go("app.error");
												}
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
												if(vedios === null) {
													$state.go("app.error");
												}
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
												if(sounds === null) {
													$state.go("app.error");
												}
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
												if(pictures === null) {
													$state.go("app.error");
												}
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
						userService.setUser(user);
						$ionicSlideBoxDelegate.update();
						$scope.hideLoading();
					}, null);
				})

		.controller(
				'liveBroadcastCtrl',
				function($scope, $stateParams, $q, $sce,$state, $ionicSlideBoxDelegate) {
					$scope.showLoading();
					
					$scope.viewPlayer=false;
					
					var ppr=$q(function(resolve, reject){
						$scope.playerId='random_player_' + Math.floor((Math.random() * 999999999) + 1);
						resolve($scope.playerId);
					});
					
					ppr.then(function(pid){
						var commentsList, broadcastURI;
						var promise = $q(function(resolve, reject) {
							var pndone = false;
							var nldone = false;
							$.get(serverURI + 'Comments/getActiveComments/broadcast/' + $stateParams.userID, function(data) {
								commentsList = data;
								pndone = true;
								if (nldone)
									resolve(" ");
							});

							if ($stateParams.userID != 0) {
								$.get(serverURI + 'Userprofile/getByID/' + $stateParams.userID, function(data) {
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
											$scope.userID = $stateParams.userID;

											var prefix = 'http://';
											var prefix2 = 'https://';
											if (broadcastURI.substr(0, prefix.length) !== prefix && broadcastURI.substr(0, prefix2.length) !== prefix2 ){
												broadcastURI = prefix + broadcastURI;
											}

											var pattern2 = /(?:http?s?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?([0-9a-zA-Z-]+)/g;
									        if(pattern2.test(broadcastURI)){
									            var replacement = 'http://www.youtube.com/embed/$1';
									            broadcastURI = broadcastURI.replace(pattern2, replacement);
									            $scope.broadcastURI = broadcastURI;
									            $('#myplayer').html('<iframe webkit-playsinline id="videoframe" class="youtube-player" type="text/html" width="100%" height="210" src="' + broadcastURI + '" allowfullscreen frameborder="0"></iframe>');
									        }else{
									        	//{{trustSrc(video.videolink)}}
									        	$scope.broadcastURI = broadcastURI;
									        	$('#myplayer').html('<iframe webkit-playsinline id="videoframe" class="youtube-player" type="text/html" width="100%" height="210" src="templates/player.html" allowfullscreen frameborder="0"></iframe>');
									        }
											
											$scope.viewPlayer=true;
											$scope.hideLoading();
										}, null);
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
			var programList;
			var promise = $q(function(resolve, reject) {
				$.get(serverURI + 'Programs/getAllActive', function(data) {
					programList = data;
					localStorage.setItem('programList', JSON.stringify(data));
					resolve(data);
				}).fail(function(){
					try{
						programList = JSON.parse(localStorage.getItem('programList'));
						if(programList === null) {
							$state.go("app.error");
						}
					}catch(ex){
						$scope.hideLoading();
						$state.go("app.error");
					}
				});
			});
			promise.then(function(data) {
				$scope.programList = programList;
				//alert(programList);
				$scope.hideLoading();
			}, null);
			
			$scope.calcheight = function( start_date , duration ){
				var objDate = new Date(start_date);
				var h = objDate.getHours();
				var m = objDate.getMinutes();
				var objDate1 = new Date(duration);
				var h1 = objDate1.getHours();
				var m1 = objDate1.getMinutes();
				var hieght = ((h1 - h) * 60 ) + ( m1 - m );
				//console.log(' hieght : = ' + hieght);
				return hieght;
			}
			
			$scope.programDay = {program_day:'1'};
			$scope.changelist = function(day){
				if(day==='today'){
					$scope.programDay = {program_day:'1'};
				}else{
					$scope.programDay = {program_day:'2'};
				}
			}
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
									if(publicNews === null) {
										$state.go("app.error");
									}
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
								if(newsList === null) {
									$state.go("app.error");
								}
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
				function($scope, $stateParams, $q, $state, $location, $ionicViewService) {
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
										if(news === null) {
											$state.go("app.error");
										}
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
										if(publicVideos === null) {
											$state.go("app.error");
										}
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
										if(videosList === null) {
											$state.go("app.error");
										}
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

		.controller('videoDetialsCtrl',
				function($scope, $state, $stateParams, $q , $interval) {

					$scope.showLoading();

							var video, commentsList;
							var promise = $q(function(resolve, reject) {
								var pndone = false;
								var nldone = false;
		
								$.get(serverURI + 'Video/getByID/' + $stateParams.videoId, function(data) {
									video = data;
									localStorage.setItem('video'+  $stateParams.videoId , JSON.stringify(data));
									pndone = true;
									if (nldone)
										resolve(" ");
								}).fail(function() {
									try {
										video = JSON.parse(localStorage.getItem('video'+  $stateParams.videoId));
										if(video === null) {
											$state.go("app.error");
										}
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

							promise.then(function(data) {
										if(video != null){
											var prefix = 'http://';
											var prefix2 = 'https://';
											if (video[0].videolink.substr(0, prefix.length) !== prefix && video[0].videolink.substr(0, prefix2.length) !== prefix2 ){
												video[0].videolink = prefix + video[0].videolink;
											}

											var pattern2 = /(?:http?s?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?([0-9a-zA-Z-]+)/g;
									        if(pattern2.test(video[0].videolink)){
									            var replacement = 'http://www.youtube.com/embed/$1';
									            video[0].videolink = video[0].videolink.replace(pattern2, replacement);
									            $scope.video = video[0];
									            $('#myplayer').html('<iframe webkit-playsinline id="videoframe" class="youtube-player" type="text/html" width="100%" height="210" src="' + video[0].videolink + '" allowfullscreen frameborder="0"></iframe>');
									        }else{
									        	//{{trustSrc(video.videolink)}}
									        	$scope.video = video[0];
									        	$('#myplayer').html('<iframe webkit-playsinline id="videoframe" class="youtube-player" type="text/html" width="100%" height="210" src="templates/player.html" allowfullscreen frameborder="0"></iframe>');
									        }
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
										if(publicSounds === null) {
											$state.go("app.error");
										}
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
										if(soundsList === null) {
											$state.go("app.error");
										}
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
								if(sound === null) {
									$state.go("app.error");
								}
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
						if(sound != null){
							var prefix = 'http://';
							var prefix2 = 'https://';
							if (sound[0].audiolink.substr(0, prefix.length) !== prefix && sound[0].audiolink.substr(0, prefix2.length) !== prefix2 ){
								sound[0].audiolink = prefix + sound[0].audiolink;
							}
							$scope.sound = sound[0];
						}
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
										publicPictures = JSON.parse(localStorage.getItem('publicPictures'));
										if(publicPictures === null) {
											$state.go("app.error");
										}
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
										if(picturesList === null) {
											$state.go("app.error");
										}
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
								if(picture === null) {
									$state.go("app.error");
								}
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
		.controller('errorCtrl',function($scope , $state , $ionicHistory, $ionicNavBarDelegate){
			$ionicHistory.clearCache();
			$ionicNavBarDelegate.showBackButton(false);
				//$scope.$on('$ionicView.enter', function() {
				//  $ionicHistory.clearHistory();
				//});
			$scope.backhome = function (){
				$ionicNavBarDelegate.showBackButton(true);
				$ionicHistory.nextViewOptions({
					disableAnimate : true,
					disableBack : true
				});
				$state.go("app.main");
			}
		})
		
		.controller('advertismentCtrl',function($scope, $state, $q){
						
			var advertisments;
			var promise = $q(function(resolve, reject) {
				$.get(serverURI + 'Advertisement/getAllActive/', function(data) {
					advertisments = data;
					localStorage.setItem('advertisments' , JSON.stringify(data));
					resolve(" ");
				}).fail(function() {
					try {
						advertisments = JSON.parse(localStorage.getItem('advertisments'));
						if(advertisments === null) {
							$state.go("app.error");
						}
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
		
		.controller('userDetialsCtrl',function($scope, $stateParams, $state, $q , userService){
			$scope.user = userService.user;
		})
		
		.service('userService', function() {
			  var user = [{}];
			  this.setUser = function(data) {
			        this.user = data;
			  };
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
				})
/////////////////////// Starting User Conrolers //////////////////////////
				.controller('usernewsCtrl',
						function($scope, $stateParams, $stateParams , $state, $q, $ionicSlideBoxDelegate) {
					$scope.showLoading();
					var publicNews, newsList;
					var promise = $q(function(resolve, reject) {
						var pndone = false;
						var nldone = false;

						$.get(serverURI + 'News/getUserPublic/' +  $stateParams.userId ,
								function(data) {
									publicNews = data;
									localStorage.setItem('publicUserNews'+ $stateParams.userId , JSON.stringify(data));
									pndone = true;
									if (nldone)
										resolve(" ");
						}).fail(function() {
								try {
									publicNews = JSON.parse(localStorage.getItem('publicUserNews' + $stateParams.userId));
									if(publicNews === null) {
										$state.go("app.error");
									}
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

						$.get(serverURI + 'News/getAllUserActive/' + $stateParams.userId, function(data) {
							newsList = data;
							localStorage.setItem('newsUserList' + $stateParams.userId, JSON.stringify(data));
							nldone = true;
							if (pndone)
								resolve(" ");
						}).fail(function() {
							try {
								newsList = JSON.parse(localStorage.getItem('newsUserList' + $stateParams.userId));
								if(newsList === null) {
									$state.go("app.error");
								}
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
				.controller('uservideosCtrl',
				function($scope, $stateParams, $q, $state, $stateParams, $ionicSlideBoxDelegate) {
					$scope.showLoading();
					var publicVideos, videosList;
					var promise = $q(function(resolve, reject) {
						var pndone = false;
						var nldone = false;

						$.get(serverURI + 'Video/getUserPublic/' + $stateParams.userId,
								function(data) {
									publicVideos = data;
									localStorage.setItem('publicUserVideos' + $stateParams.userId, JSON.stringify(data));
									pndone = true;
									if (nldone)
										resolve(" ");
								}).fail(function() {
									try {
										publicVideos = JSON.parse(localStorage.getItem('publicUserVideos' + $stateParams.userId));
										if(publicVideos === null) {
											$state.go("app.error");
										}
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

						$.get(serverURI + 'Video/getAllUserActive/' + $stateParams.userId,
								function(data) {
									videosList = data;
									localStorage.setItem('videosUserList' + $stateParams.userId ,JSON.stringify(data));
									nldone = true;
									if (pndone)
										resolve(" ");
								}).fail(function() {
									try {
										videosList = JSON.parse(localStorage.getItem('videosUserList' + $stateParams.userId));
										if(videosList === null) {
											$state.go("app.error");
										}
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
				.controller( 'usersoundsCtrl',
				function($scope, $stateParams, $q, $state , $stateParams , $ionicSlideBoxDelegate) {
					$scope.showLoading();
					var publicSounds, soundsList;
					var promise = $q(function(resolve, reject) {
						var pndone = false;
						var nldone = false;

						$.get(serverURI + 'Audio/getUserPublic/' + $stateParams.userId,
								function(data) {
									publicSounds = data;
									localStorage.setItem('publicUserSounds' + $stateParams.userId, JSON.stringify(data));
									pndone = true;
									if (nldone)
										resolve(" ");
								}).fail(function() {
									try {
										publicSounds = JSON.parse(localStorage.getItem('publicUserSounds' + $stateParams.userId));
										if(publicSounds === null) {
											$state.go("app.error");
										}
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

						$.get(serverURI + 'Audio/getAllUserActive/' + $stateParams.userId,
								function(data) {
									soundsList = data;
									localStorage.setItem('soundsUserList' + $stateParams.userId, JSON.stringify(data));
									nldone = true;
									if (pndone)
										resolve(" ");
								}).fail(function() {
									try {
										soundsList = JSON.parse(localStorage.getItem('soundsUserList' + $stateParams.userId));
										if(soundsList === null) {
											$state.go("app.error");
										}
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
				.controller( 'userpicturesCtrl',
				function($scope, $stateParams, $q, $state, $stateParams, $ionicSlideBoxDelegate) {
					$scope.showLoading();
					var publicPictures, picturesList;
					var promise = $q(function(resolve, reject) {
						var pndone = false;
						var nldone = false;

						$.get(serverURI + 'Photo/getUserPublic/' + $stateParams.userId,
								function(data) {
									publicPictures = data;
									localStorage.setItem('publicUserPictures' + $stateParams.userId , JSON.stringify(data));
									pndone = true;
									if (nldone)
										resolve(" ");
								}).fail(function() {
									try {
										publicPictures = JSON.parse(localStorage.getItem('publicUserPictures' + $stateParams.userId));
										if(publicPictures === null) {
											$state.go("app.error");
										}
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

						$.get(serverURI + 'Photo/getAllUserActive/' + $stateParams.userId,
								function(data) {
									picturesList = data;
									localStorage.setItem('picturesUserList' + $stateParams.userId , JSON.stringify(data));
									nldone = true;
									if (pndone)
										resolve(" ");
								}).fail(function() {
									try {
										picturesList = JSON.parse(localStorage.getItem('picturesUserList' + $stateParams.userId));
										if(picturesList === null) {
											$state.go("app.error");
										}
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
				});
