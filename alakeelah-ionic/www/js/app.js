// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', [ 'ionic', 'starter.controllers' ])

.run(function($ionicPlatform) {
	$ionicPlatform.ready(function() {
		// Hide the accessory bar by default (remove this to show the accessory
		// bar above the keyboard
		// for form inputs)
		if (window.cordova && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		}
		if (window.StatusBar) {
			// org.apache.cordova.statusbar required
			StatusBar.styleDefault();
		}
	});
})

.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider

	.state('app', {
		url : "/app",
		abstract : true,
		templateUrl : "templates/menu.html",
		controller : 'AppCtrl'
	})

	.state('app.pageView', {
		url : "/pageView/:pageId",
		views : {
			'menuContent' : {
				templateUrl : "templates/pageView.html",
				controller: "pageViewCtrl"
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

	.state('app.houseyn', {
		url : "/houseyn",
		views : {
			'menuContent' : {
				templateUrl : "templates/houseyn.html",
			}
		}
	})

	.state('app.speachers', {
		url : "/speachers",
		views : {
			'menuContent' : {
				templateUrl : "templates/speachers.html",
			}
		}
	})

	.state('app.tales', {
		url : "/tales",
		views : {
			'menuContent' : {
				templateUrl : "templates/tales.html",
			}
		}
	})

	.state('app.poets', {
		url : "/poets",
		views : {
			'menuContent' : {
				templateUrl : "templates/poets.html",
			}
		}
	})

	.state('app.commercial', {
		url : "/commercial",
		views : {
			'menuContent' : {
				templateUrl : "templates/commercial.html",
			}
		}
	})

	.state('app.other', {
		url : "/other",
		views : {
			'menuContent' : {
				templateUrl : "templates/other.html",
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
				controller: "mainCtrl"
			}
		}
	});
	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/app/main');
});
