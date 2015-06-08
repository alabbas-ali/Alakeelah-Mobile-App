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

					});

					if (typeof navigator.globalization !== "undefined") {
						navigator.globalization.getPreferredLanguage(function(
								language) {
							$translate.use((language.value).split("-")[0]);
						}, null);
					} else {
						$translate.use((navigator.language).split("-")[0]);
					}
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
						url : "/pageView/:pageId/:pageName",
						views : {
							'menuContent' : {
								templateUrl : "templates/pageView.html",
								controller : "pageViewCtrl"
							}
						}
					})

					.state('app.pageViewDetials', {
						url : "/pageViewDetials/:userId",
						views : {
							'menuContent' : {
								templateUrl : "templates/pageViewDetials.html",
								controller : "pageViewDetialsCtrl"
							}
						}
					})

					.state('app.liveBroadcast', {
						url : "/liveBroadcast/:userID",
						views : {
							'menuContent' : {
								templateUrl : "templates/liveBroadcast.html",
								controller : "liveBroadcastCtrl"
							}
						}
					})

					.state('app.frequency', {
						url : "/frequency",
						views : {
							'menuContent' : {
								templateUrl : "templates/frequency.html",
								controller : "frequencyCtrl"
							}
						}
					})

					.state('app.broadcastTable', {
						url : "/broadcastTable",
						views : {
							'menuContent' : {
								templateUrl : "templates/broadcastTable.html",
								controller : "broadcastTableCtrl"
							}
						}
					})

					.state('app.news', {
						url : "/news",
						views : {
							'menuContent' : {
								templateUrl : "templates/news.html",
								controller : "newsCtrl"
							}
						}
					})

					.state('app.newsDetials', {
						url : "/newsDetials/:newsId",
						views : {
							'menuContent' : {
								templateUrl : "templates/newsDetials.html",
								controller : "newsDetialsCtrl"
							}
						}
					})

					.state('app.videos', {
						url : "/videos",
						views : {
							'menuContent' : {
								templateUrl : "templates/videos.html",
								controller : "videosCtrl"
							}
						}
					})

					.state('app.videoDetials', {
						url : "/videoDetials/:videoId",
						views : {
							'menuContent' : {
								templateUrl : "templates/videoDetials.html",
								controller : "videoDetialsCtrl"
							}
						}
					})

					.state('app.sounds', {
						url : "/sounds",
						views : {
							'menuContent' : {
								templateUrl : "templates/sounds.html",
								controller : "soundsCtrl"
							}
						}
					})

					.state('app.soundDetials', {
						url : "/soundDetials/:soundId",
						views : {
							'menuContent' : {
								templateUrl : "templates/soundDetials.html",
								controller : "soundDetialsCtrl"
							}
						}
					})

					.state('app.pictures', {
						url : "/pictures",
						views : {
							'menuContent' : {
								templateUrl : "templates/pictures.html",
								controller : "picturesCtrl"
							}
						}
					})

					.state('app.pictureDetials', {
						url : "/pictureDetials/:pictureId",
						views : {
							'menuContent' : {
								templateUrl : "templates/pictureDetials.html",
								controller : "pictureDetialsCtrl"
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

					$translateProvider
							.translations(
									"ar",
									{
										liveBroadcast_msg : "البث المباشر",
										most_public : "أبرز الأحداث",
										live_msg : "مباشر",
										frequency_msg : "التردد",
										broadcastTable_msg : "جدول البث",
										divisions_msg : "الاقسام",
										home_msg : "الرئيسية",
										news_msg : "الاخبار",
										videos_msg : "الفيديوهات",
										sounds_msg : "الصوتيات",
										gallery_msg : "الصور",
										pages_msg : "صفحات",
										setting_msg : "الإعدادت",
										yellow_msg : "ذهبي",
										blue_msg : "ازرق",
										green_msg : "أحضر",
										neal_msg : "كحلي",
										language_msg : "اللغة",
										arabic_msg : "العربية",
										english_msg : "English",
										socialNetworks_msg : "التواصل الاجتماعي",
										facebook_msg : "فيسبوك",
										twitter_msg : "تويتر",
										instagram_msg : "انستاغرام",
										youtube_msg : "يوتيوب",
										commentsHeader_msg : "التعليقات",
										addCommentHeader_msg : "أضف تعليق ..",
										addCommentMessage_msg : " التعليقات تمثل رأي أصحابها وقناة العقيلة الفضائية تخلي مسؤوليته عنها",
										commenterName_msg : "الإسم :",
										commentContent_msg : "التعليق :",
										commentCheckbox_msg : "أختر لأضافة التعليق إلى حسابك في تويتر و فيس بوك",
										addComment_msg : "إضافة تعليق",
									});

					$translateProvider
							.translations(
									"en",
									{
										liveBroadcast_msg : "Live Broadcast",
										live_msg : "Live",
										most_public : "Most Public",
										frequency_msg : "Frequency",
										broadcastTable_msg : "Broadcast Scheduler",
										divisions_msg : "Divisions",
										home_msg : "Home",
										news_msg : "News",
										videos_msg : "Videos",
										sounds_msg : "Audios",
										gallery_msg : "Gallery",
										pages_msg : "Pages",
										setting_msg : "Setting",
										yellow_msg : "Yellow",
										neal_msg : "neal",
										blue_msg : "Blue",
										green_msg : "Grean",
										language_msg : "Language",
										arabic_msg : "العربية",
										english_msg : "English",
										socialNetworks_msg : "Social Networks",
										facebook_msg : "Facebook",
										twitter_msg : "Twitter",
										instagram_msg : "Instagram",
										youtube_msg : "youtube",
										commentsHeader_msg : "Comments",
										addCommentHeader_msg : "Add Comment ..",
										addCommentMessage_msg : "This Comments Represnts Commenrs Thouds Not Our's ...",
										commenterName_msg : "Name :",
										commentContent_msg : "Comment :",
										commentCheckbox_msg : "Add Your Comment Into Facebook Account",
										addComment_msg : "Add Comment",
									});

					$translateProvider.preferredLanguage = "en";
					$translateProvider.fallbackLanguage = "en";
				});
