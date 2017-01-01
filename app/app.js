var myApp = angular.module('myApp', []);

/**
 * CONSTANTS
 */
myApp.constant('CONSTANTS', {
	LISTING_API: 'http://m.lowes.com/CatalogServices/product/nvalue/v1_0?nValue=4294857975&maxResults=20&showURL=1&rollUpVariants=1&showUrl=true&storeNumber=0595&priceFlag=rangeBalance&showMarketingBullets=1'
});


/**
 * Controller
 */
myApp.controller('listingController', ['$scope', '$rootScope','App.Service.Listing', function ($scope, $rootScope,listingService) {
	'use strict';


	$scope.items = null;
	$scope.getlistItems = function(){
		listingService.getItems(function(response){
			if(response){
				$scope.items = response;
				$scope.detailItem = $scope.items[0];
				console.log($scope.detailItem);
			}
		})
	}

	$scope.viewMore = function(item){
		$scope.detailItem = item;
		//scroll to the hero section
		$("html, body").animate({
			scrollTop: 0
		}, 600);
	}

	$scope.getlistItems();

	$scope.alertPrice = function(price){
		alert('The Price of this item is : $'+ price);
	}
}]);


myApp.factory('App.Service.Listing', ['$http', 'CONSTANTS','$sce', function ($http, CONSTANTS,$sce) {
	'use strict';

	function getItems(cb){
		$http.get(CONSTANTS.LISTING_API).then(function(response){
			if(response){
				cb(response.data.productList);
			}else{
				cb(false);
			}
		})


		// using jsonp to overcome the cors issue
		
		// var url = CONSTANTS.LISTING_API;
		// $sce.trustAsResourceUrl(url);

		// $http.jsonp(url, {jsonpCallbackParam: 'callback'})
		// 	.success(function(response){
		// 		if(response){
				// cb(response.data.productList);
				// }else{
				// 	cb(false);
				// }
		// 	});
	}

	return {
		getItems: getItems
	};

}]);