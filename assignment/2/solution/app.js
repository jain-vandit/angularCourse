(function(){
	angular.module('ShoppingListCheckOff',[])
	.controller('ToBuyController',ToBuyController)
	.controller('AlreadyBoughtController',AlreadyBoughtController)
	.service('ShoppingListCheckOffService',ShoppingListCheckOffService);
	ToBuyController.$inject=['$scope','ShoppingListCheckOffService'];
	AlreadyBoughtController.$inject=['$scope','ShoppingListCheckOffService'];
	function ToBuyController($scope,ShoppingListCheckOffService){
		var toBuy=this;
		toBuy.list=ShoppingListCheckOffService.getBuyList();
		toBuy.checkOffItem= function(itemIndex){
			ShoppingListCheckOffService.checkOffItem(itemIndex);
		}
	}
	function AlreadyBoughtController($scope,ShoppingListCheckOffService){
		var bought=this;
		bought.list=ShoppingListCheckOffService.getBoughtList();
	}
	function ShoppingListCheckOffService(){
		var service=this;
		var buyList=[{name:"Coke",quantity:8},{name:"Chips",quantity:4},{name:"Cookies",quantity:10},{name:"Juice",quantity:1},{name:"Sweets",quantity:8}];
		var boughtList=[];

		service.getBuyList= function(){
			return buyList;
		}
		service.getBoughtList = function(){
			return boughtList;
		}
		service.checkOffItem = function(itemIndex){
			boughtList.push(buyList[itemIndex]);
			buyList.splice(itemIndex,1);
		}
	}
})()