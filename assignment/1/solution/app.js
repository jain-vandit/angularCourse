(function(){
	angular.module("LunchCheck",[])
	.controller("LunchCheckController",LunchCheckController);

	LunchCheckController.inject=['$scope'];
	function LunchCheckController($scope){
		$scope.lunchDishes="";
		$scope.checkResult={
			message:"",
			class:""
		};

		$scope.checkLunch=function(){
			var dishes=$scope.lunchDishes.split(',');
			var length=dishes.length-countEmpty(dishes);
			if(length==0){
				$scope.checkResult={
					message:"Please enter data first",
					class:"text-danger"
				};
			}
			else if(length>3)
				$scope.checkResult={
					message:"Too Much!",
					class:"text-info"
				};
			else $scope.checkResult={
				message:"Enjoy!",
				class:"text-success"
			};
		}
		var countEmpty =function(arr){
			var empty=0;
			for(var i=0;i<arr.length;i++){
				if(arr[i]=="")
					empty++;
			}
			return empty;
		}
	}
})()