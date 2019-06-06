angular
.module('LunchCheck',[])
.controller('LunchCheckController',LunchCheckController);
LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope){
	$scope.lunch ='';
	$scope.result ='';
	$scope.class='';
	$scope.check = function(){ 
		if($scope.lunch.trim().length==0){
			$scope.class='alert alert-danger';
			$scope.result='Please enter valid Data';

		}else{
			var lunchItem = $scope.lunch.split(',');
		if(lunchItem.length<=3){
			$scope.result="Enjoy!"
		}else{
			$scope.result="Too much!"
		}
			$scope.class='alert alert-success';
		}
		
	};
	

}