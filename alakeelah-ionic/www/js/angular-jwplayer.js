(function(window, angular, undefined) {
    'use strict';
    angular.module('angular-jwplayer', [])
        .directive('jwplayer', jwplayerCreator);

    /* @ngInject */
    function jwplayerCreator($log) {
        return {
            restrict: 'E',
            transclude: true,
            scope : {
				playerId : '@',
				file : '=',
				poster : '=',
				hieght : '@',
				width : '@',
				primary : '@',
			},

            link: function(scope, element, attrs, containerController) {
            	var id = scope.playerId|| 'random_player_' + Math.floor((Math.random() * 999999999) + 1);
                scope.id = id;
                scope.last = containerController.last; 
                var buildjwplayer = function() {
                	var file = scope.file ;
					var poster = scope.poster ;
					var hieght = scope.hieght ;
					var width = scope.width ;
					var primary = scope.primary ;
					
                    var params = {
                    		file : file,
							image : poster,
							height : hieght,
							width : width,
							primary : primary
                    };
                    
                    console.log('this is me : ' + params.file);
                    console.log('this is me : ' + id);
                    jwplayer(id).setup(params);
                };
                
                if (scope.last === true) {
                    $timeout(function() {
                    	console.log(' this is me after last ');
                    	buildjwplayer();
                    }, 0);
                }
            },
            template: '<div id="{{id}}" last="{{last}}"></div>'
        }
    }

})(window, angular, undefined);


//(function(window, angular, undefined) {
//
//	'use strict';
//	angular.module('angular-jwplayer', [])
//	.directive('jwplayer',['$compile',function($compile) {
//								return {
//									restrict : 'EC',
//									scope : {
//										playerId : '@',
//										file : '=',
//										poster : '=',
//										hieght : '@',
//										width : '@',
//										primary : '@',
//									},
//									link : function(scope, element, attrs) {
//
//										var file = scope.file ;
//										var poster = scope.poster ;
//										var hieght = scope.hieght ;
//										var width = scope.width ;
//										var primary = scope.primary ;
//
//										var id = scope.playerId|| 'random_player_' + Math.floor((Math.random() * 999999999) + 1), 
//										getTemplate = function(playerId) {
//											return '<div id="' + playerId + '"></div>';
//										};
//
//										element.html(getTemplate(id));
//										$compile(element.contents())(scope);
//										
//										console.log('this is me Jwplayer : ' + file);
//										scope.$watch('file' , function(newVal) {
//											jwplayer(id).setup({
//												file : file,
//												image : poster,
//												height : hieght,
//												width : width,
//												primary : primary
//											});
//									    }, true);
//										
//									}
//								};
//							} ])
//})(window, angular, undefined);
