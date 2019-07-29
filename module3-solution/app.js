(function () {
'use strict';

angular
.module('NarrowItDownApp',[])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', foundItemsDirective);

function foundItemsDirective(){
	var ddo = {
		templateUrl: 'foundItem.html',
		scope : {
			items: '<',
			onRemove: '&'
		},
		controller: NarrowItDownController,
		controllerAs: 'menulist',
		bindToController: true
	};
	return ddo;
}

NarrowItDownController.$inject = ['MenuSearchService'];

function NarrowItDownController(MenuSearchService){
	var menu = this;
	menu.found = [];
	
	menu.search = function(){ 
		if(menu.searchTerm!=="" && menu.searchTerm!==undefined){
			MenuSearchService.getMatchedMenuItems(menu.searchTerm)
			.then(function(result){
				menu.found = result;
			});
		}else{
			menu.found = [];
		}
	}
	menu.removeItem = function (itemIndex){
		menu.found.splice(itemIndex, 1)
	}
	menu.errorHandler = function(){
		return menu.items.length==0;
	}
}

MenuSearchService.$inject = ['$http']
function MenuSearchService($http){
	var service = this;

	service.getMatchedMenuItems = function(searchTerm){
		return $http({method:'GET',url:"https://davids-restaurant.herokuapp.com/menu_items.json"}).then(function(result){
			var foundItems = [];
			for(var i=0;i< result.data.menu_items.length;i++){
				if(result.data.menu_items[i].description.indexOf(searchTerm)!==-1){
					foundItems.push(result.data.menu_items[i]);
				}
			}
			return foundItems;
		});
	}
}

})();