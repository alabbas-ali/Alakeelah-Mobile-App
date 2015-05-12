// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular
		.module(
				'starter',
				[ 'ionic', 'starter.controllers', 'ngCordova',
						'pascalprecht.translate' ])

		.run(
				function($ionicPlatform, $translate, $state, $ionicHistory) {
					$ionicPlatform.ready(function() {
						// Hide the accessory bar by default (remove
						// this to
						// show the
						// accessory
						// bar above the keyboard
						// for form inputs)
						if (window.cordova && window.cordova.plugins.Keyboard) {
							cordova.plugins.Keyboard
									.hideKeyboardAccessoryBar(true);
						}
						if (window.StatusBar) {
							// org.apache.cordova.statusbar required
							StatusBar.styleDefault();
						}

						if (typeof navigator.globalization !== "undefined") {
							navigator.globalization.getPreferredLanguage(
									function(language) {
										$translate.use((language.value)
												.split("-")[0]);
									}, null);
						} 

					});

				})

		.config(
				function($stateProvider, $urlRouterProvider, $translateProvider) {
					$stateProvider

					.state('app', {
						url : "/app",
						abstract : true,
						templateUrl : "templates/menu.html",
						controller : 'AppCtrl'
					})

					.state('intro', {
						url : "/intro",
						templateUrl : "templates/intro.html",
						controller : 'introVidCtrl'
					})

					.state('app.pageView', {
						url : "/pageView/:pageId",
						views : {
							'menuContent' : {
								templateUrl : "templates/pageView.html",
								controller : "pageViewCtrl"
							}
						}
					})

					.state('app.liveBroadcast', {
						url : "/liveBroadcast",
						views : {
							'menuContent' : {
								templateUrl : "templates/liveBroadcast.html"
							}
						}
					})

					.state('app.frequency', {
						url : "/frequency",
						views : {
							'menuContent' : {
								templateUrl : "templates/frequency.html"
							}
						}
					}).state('app.broadcastTable', {
						url : "/broadcastTable",
						views : {
							'menuContent' : {
								templateUrl : "templates/broadcastTable.html",
							}
						}
					})

					.state('app.news', {
						url : "/news",
						views : {
							'menuContent' : {
								templateUrl : "templates/news.html",
							}
						}
					})

					.state('app.videos', {
						url : "/videos",
						views : {
							'menuContent' : {
								templateUrl : "templates/videos.html",
							}
						}
					})

					.state('app.sounds', {
						url : "/sounds",
						views : {
							'menuContent' : {
								templateUrl : "templates/sounds.html",
							}
						}
					})

					.state('app.pictures', {
						url : "/pictures",
						views : {
							'menuContent' : {
								templateUrl : "templates/pictures.html",
							}
						}
					})

					.state('app.facebook', {
						url : "/facebook",
						views : {
							'menuContent' : {
								templateUrl : "templates/facebook.html",
							}
						}
					})

					.state('app.twitter', {
						url : "/twitter",
						views : {
							'menuContent' : {
								templateUrl : "templates/twitter.html",
							}
						}
					})

					.state('app.instagram', {
						url : "/instagram",
						views : {
							'menuContent' : {
								templateUrl : "templates/instagram.html",
							}
						}
					})

					.state('app.youtube', {
						url : "/youtube",
						views : {
							'menuContent' : {
								templateUrl : "templates/youtube.html",
							}
						}
					}).state('app.main', {
						url : "/main",
						views : {
							'menuContent' : {
								templateUrl : "templates/main.html",
								controller : "mainCtrl"
							}
						}
					});
					// if none of the above states are matched, use this as the
					// fallback
					$urlRouterProvider.otherwise('/intro');

					$translateProvider.translations("ar", {
						liveBroadcast_msg : "البث المباشر",
						live_msg : "مباشر",
						frequency_msg : "التردد",
						broadcastTable_msg : "جدول البث",
						divisions_msg : "الاقسام",
						home_msg : "الريسية",
						news_msg : "الاخبار",
						videos_msg : "الفيديوهات",
						sounds_msg : "الصوتيات",
						gallery_msg : "الصور",
						pages_msg : "صفحات",
						socialNetworks_msg : "التواصل الاجتماعي",
						facebook_msg : "فيسبوك",
						twitter_msg : "تويتر",
						instagram_msg : "انستاغرام",
						youtube_msg : "يوتيوب"
					});
					
					$translateProvider.translations("en", {
						liveBroadcast_msg : "Live Broadcast",
						live_msg : "Live",
						frequency_msg : "Frequency",
						broadcastTable_msg : "Broadcast Scheduler",
						divisions_msg : "Divisions",
						home_msg : "Home",
						news_msg : "News",
						videos_msg : "Videos",
						sounds_msg : "Audios",
						gallery_msg : "Gallery",
						pages_msg : "Pages",
						socialNetworks_msg : "Social Networks",
						facebook_msg : "Facebook",
						twitter_msg : "Twitter",
						instagram_msg : "Instagram",
						youtube_msg : "youtube"
					});
					
					$translateProvider.preferredLanguage = "en";
					$translateProvider.fallbackLanguage = "en";
				});
