var model = {
	baseState : {
		showNumber: 0,
		currentNumber: 0,
		lastNumber: 0,
		MNumber: null,
		currentOperation: null,
		operationLane: "",
		M : null
	},
	baseOperations : {
		plus: function(b, a) {return a + b;},
		minus: function(b, a) {return a - b;},
		multiply: function(b, a) {return a * b;},
		divide: function(b, a) {return a / b;},
		pow: function(b, a) {return Math.pow(a, b);}	
	}
};

var calculator = angular.module("calculator", []);
calculator.controller('calculatorController', function($scope){

	$scope.state = Object.assign({}, model.baseState);
	$scope.operations = model.baseOperations;

	$scope.proceed = function(funcType, func){
		if ($scope.state.currentOperation === null){
			$scope.state.operationLane = $scope.state.currentNumber + " " + funcType;
			$scope.state.lastNumber = $scope.state.currentNumber;
			
		} else {
			$scope.state.operationLane += " " + $scope.state.currentNumber + " " + funcType;
			$scope.state.lastNumber = $scope.state.currentOperation($scope.state.currentNumber, $scope.state.lastNumber);
			$scope.state.showNumber = $scope.state.lastNumber;
			
		}

		$scope.state.currentOperation = func;
		$scope.state.currentNumber = 0;
	};

	$scope.inputNumber = function (number) {
		if ($scope.state.currentNumber.toString().replace(/[-.]/g,'').length >= 16)	{}
			else if (/\./.test($scope.state.showNumber) && Number($scope.state.showNumber) === $scope.state.currentNumber){
				if(number === 0)
					$scope.state.showNumber = $scope.state.showNumber.toString() + "0";
					else {
					$scope.state.currentNumber = Number($scope.state.showNumber.toString() + number);
					$scope.state.showNumber = $scope.state.currentNumber;
				}
			} else	{
				$scope.state.currentNumber = (($scope.state.currentNumber) ? Number($scope.state.currentNumber.toString() + number) : number);
				$scope.state.showNumber = $scope.state.currentNumber;
			}
	};

	$scope.dot = function (){	
		if ($scope.state.currentNumber.toString().replace(/[-.]/g,'').length >= 16)	{}
			else if($scope.state.currentNumber === Number($scope.state.showNumber)){
				if (/\./.test($scope.state.showNumber)) {}
					else {$scope.state.showNumber = $scope.state.showNumber.toString() + ".";}
			} else {
				$scope.state.showNumber = "0.";
			}
	};

	$scope.changeSign = function (){
		if($scope.state.currentNumber === Number($scope.state.showNumber)){
			if($scope.state.currentNumber === 0){
				$scope.state.showNumber = (($scope.state.showNumber.toString()[0] === "-") ? $scope.state.showNumber.toString().slice(1) : ("-" + $scope.state.showNumber.toString()));
			} else {
				$scope.state.currentNumber = $scope.state.currentNumber * -1;
				$scope.state.showNumber = $scope.state.currentNumber;
			}
		}
	};

	$scope.del = function(){
		if ($scope.state.currentNumber === Number($scope.state.showNumber)){
			if ($scope.state.showNumber.toString() != "0") {
				if($scope.state.showNumber.toString().length > 1){
					$scope.state.showNumber = $scope.state.showNumber.toString().slice(0, -1);
					$scope.state.currentNumber = Number($scope.state.showNumber);
				}
				else {
					$scope.state.showNumber = 0;
					$scope.state.currentNumber = 0;
				}
			}
		}
		if($scope.state.showNumber == NaN) $scope.state.showNumber = 0; //need fix
	};

	$scope.MSave = function(){
		$scope.state.M = $scope.state.currentNumber;
	};

	$scope.MClear = function(){
		$scope.state.M = null;
	};

	$scope.MInsert = function(){																// unactivate button (MI && MC) when m == null
		$scope.state.currentNumber = $scope.state.M;
		$scope.state.showNumber = $scope.state.M;
	}; 

	$scope.equal = function(){
		if ($scope.state.currentOperation) {
			$scope.state.operationLane += " " + $scope.state.currentNumber +"=";
			$scope.state.currentNumber = $scope.state.currentOperation($scope.state.currentNumber, $scope.state.lastNumber);
			$scope.state.showNumber = $scope.state.currentNumber;
			$scope.state.currentOperation = null;
		}
	};

	$scope.clear = function(){
		$scope.state.showNumber = 0;
		$scope.state.currentNumber = 0;
	};

	$scope.clearE = function(){
		$scope.state = Object.assign({}, model.baseState);
	};

	addKeyHandlers($scope); //probably not the best way...
});
