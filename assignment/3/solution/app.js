(function(){
	angular.module("NarrowItDownApp",[])
	.controller("NarrowItDownController",NarrowItDownController)
	.service("NarrowItDownService",NarrowItDownService)
	.directive("foundItems",FoundItems);
	NarrowItDownController.$inject=["NarrowItDownService"];
	function NarrowItDownController(NarrowItDownService){
		var narrowItDown=this
		narrowItDown.found=[];
		narrowItDown.searched=false;
		narrowItDown.searchTerm="";
		narrowItDown.narrowIt=function(){
			if(narrowItDown.searchTerm){
				NarrowItDownService.getMatchedMenuItems(narrowItDown.searchTerm)
				.then(function(response){
					narrowItDown.found=response;
				});
			}
			else narrowItDown.searched=true;
		}
		narrowItDown.removeItem=function(index){
			narrowItDown.found.splice(index,1);
		}
	}
	NarrowItDownService.$inject=['$http'];
	function NarrowItDownService($http){
		var service=this;
		service.getMatchedMenuItems=function(searchTerm){
			return $http.get('https://davids-restaurant.herokuapp.com/menu_items.json')
			.then(function sucess(res){
				var results=[];
				for(itemIn in res.data.menu_items){
					var item=res.data.menu_items[itemIn];
					if(item.description.includes(searchTerm))
						results.push(item);
				}
				return results;
			},
			function error(err){
				return ;
			});			
		}
	}
	//FoundItems.$inject=['NarrowItDownService'];
	function FoundItems(){
		var ddo ={
			templateUrl: 'foundItems/index.html',
			scope:{
				list : "<foundItemsList",
				removeItem: "=onRemove"
			}
		}
		return ddo;
	}
})();