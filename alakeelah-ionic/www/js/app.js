// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular
		.module(
				'starter',
				[ 'ionic', 'starter.controllers', 'ngCordova', 'ui.router' , 'ngAnimate', 
						'pascalprecht.translate', 'ngMessages', 'ngSanitize', 'ksSwiper' ])

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
				function($stateProvider, $urlRouterProvider, $translateProvider , $ionicConfigProvider) {
					
					$ionicConfigProvider.scrolling.jsScrolling(false);
					
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
					
					.state('app.error', {
						url : "/error",
						views : {
							'menuContent' : {
								templateUrl : "templates/error.html",
								controller : 'errorCtrl'
							}
						}
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
					
					.state('app.usernews', {
						url : "/usernews/:userId",
						views : {
							'menuContent' : {
								templateUrl : "templates/usernews.html",
								controller : "usernewsCtrl"
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
					
					.state('app.uservideos', {
						url : "/uservideos/:userId",
						views : {
							'menuContent' : {
								templateUrl : "templates/uservideos.html",
								controller : "uservideosCtrl"
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
					
					.state('app.usersounds', {
						url : "/usersounds/:userId",
						views : {
							'menuContent' : {
								templateUrl : "templates/usersounds.html",
								controller : "usersoundsCtrl"
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
					
					.state('app.userpictures', {
						url : "/userpictures/:userId",
						views : {
							'menuContent' : {
								templateUrl : "templates/userpictures.html",
								controller : "userpicturesCtrl"
							}
						}
					})
					
					.state('app.advertisment', {
						url : "/advertisment",
						views : {
							'menuContent' : {
								templateUrl : "templates/advertisment.html",
								controller : "advertismentCtrl"
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
					})
					
					.state('app.userDetials', {
						url : "/userDetials/:userId",
						views : {
							'menuContent' : {
								templateUrl : "templates/userDetials.html",
								controller : "userDetialsCtrl"
							}
						}
					})
					
					.state('app.main', {
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
					$urlRouterProvider.otherwise('/app/main');

					$translateProvider.translations("ar", {
						appname_msg : "قناه العقيلة",
						liveBroadcast_msg : "البث المباشر",
						most_public : "أبرز الأحداث",
						most_publicVideo : "أبرز الفيديوات",
						most_publicNews : "أبرز الأخبار",
						most_publicAudio : "أبرز الصوتيات",
						most_publicPic : "أبرز الصور",
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
						advertisment_msg : "اعلانات",
						yellow_msg : "ذهبي",
						blue_msg : "ازرق",
						green_msg : "أخضر",
						neal_msg : "بنفسجي",
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
						moreComment_msg : "عرض المزيد من التعليقات",
						commentCheckbox_msg : "أختر لأضافة التعليق إلى حسابك في تويتر و فيس بوك",
						addComment_msg : "إضافة تعليق",
						newsCountry_msg : "اخبار",
						error_msg : "حدث حطأ أثناء تحميل اليبيانات , لا يوجد إتصال بالإنترنت يرجى المحاولة لاحقاً",
						required_msg : "هذا الحقل مطلوب !",
						minimum_msg : "اقل عدد من المحارف لهذا الحقل هو 3 !",
						maximum_msg : "أكبر عدد من المحارف المسموحة لهذا الحقل هو 20 !",
						submiting_msg : "يتم الإرسال ...",
						submitingdone_msg : "تم اضافة تعليقك , بانتظار موافقة الإدارة ...",
						submitingerror_msg : "حذث خطأ في ارسال البيانات ...",
						advertismenttitle_msg : "الإعلانات التجارية ...",
						gohome_msg : "العودة للرئسية",
						today_programs : "اليوم",
						tomorow_programs : "غدا",
					});

						$translateProvider.translations("en", {
							appname_msg : "Alaqila TV",
						liveBroadcast_msg : "Live Broadcast",
						live_msg : "Live",
						most_public : "Most Public",
						most_publicVideo : "Public Videos",
						most_publicNews :"Public News",
						most_publicAudio : "Public Audio",
						most_publicPic : "Public Pictures",
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
						advertisment_msg : "Advertising",
						yellow_msg : "Yellow",
						neal_msg : "Neal",
						blue_msg : "Blue",
						green_msg : "Grean",
						language_msg : "Language",
						arabic_msg : "العربية",
						english_msg : "English",
						socialNetworks_msg : "Social Networks",
						facebook_msg : "Facebook",
						twitter_msg : "Twitter",
						instagram_msg : "Instagram",
						youtube_msg : "Youtube",
						commentsHeader_msg : "Comments",
						addCommentHeader_msg : "Add Comment ..",
						addCommentMessage_msg : "Comments represent the opinion of owners not ours ...",
						commenterName_msg : "Name :",
						commentContent_msg : "Comment :",
						moreComment_msg : "Show More Comments",
						commentCheckbox_msg : "Add Your Comment Into Facebook Account",
						addComment_msg : "Add Comment",
						newsCountry_msg : "News",
						error_msg : "Error in Looding data, Try agin latter ",
						required_msg : "This field is required!",
						minimum_msg : "Minimum length of this field is 3 characters!",
						maximum_msg : "Maximum length of this field is 20 characters!",
						submiting_msg : "Submiting ...",
						submitingdone_msg : "Your Comment Has Been Added , Waiting For admin approve...",
						submitingerror_msg : "Error in Submiting Data ...",
						advertismenttitle_msg : "Commercial Ads ...",
						gohome_msg : "Back To Home",
						today_programs : "Today",
						tomorow_programs : "Tomorrow",
					});

					$translateProvider.preferredLanguage = "ar";
					$translateProvider.fallbackLanguage = "ar";
					
					$translateProvider.useSanitizeValueStrategy(null);
				});
