function addKeyHandlers($scope){
	addEventListener("keydown", function (evt) {
		// fromCharCode() for numlock keys little bit broken, can't use String.fromCharCode(evt.keyCode);
		if((evt.keyCode >= 96 && evt.keyCode <= 105) || (evt.keyCode >= 48 && evt.keyCode <= 57)){
			if(evt.keyCode == 96 || evt.keyCode == 48)
				$scope.$apply(function(){$scope.inputNumber(0);});
			else if(evt.keyCode == 97 || evt.keyCode == 49)
				$scope.$apply(function(){$scope.inputNumber(1);});
			else if(evt.keyCode == 98 || evt.keyCode == 50)
				$scope.$apply(function(){$scope.inputNumber(2);});
			else if(evt.keyCode == 99 || evt.keyCode == 51)
				$scope.$apply(function(){$scope.inputNumber(3);});
			else if(evt.keyCode == 100 || evt.keyCode == 52)
				$scope.$apply(function(){$scope.inputNumber(4);});
			else if(evt.keyCode == 101 || evt.keyCode == 53)
				$scope.$apply(function(){$scope.inputNumber(5);});
			else if(evt.keyCode == 102 || evt.keyCode == 54)
				$scope.$apply(function(){$scope.inputNumber(6);});
			else if(evt.keyCode == 103 || evt.keyCode == 55)
				$scope.$apply(function(){$scope.inputNumber(7);});
			else if(evt.keyCode == 104 || evt.keyCode == 56)
				$scope.$apply(function(){$scope.inputNumber(8);});
			else
				$scope.$apply(function(){$scope.inputNumber(9);});
		}
		else if (evt.keyCode == 8)
			$scope.$apply(function(){$scope.del();});
		else if (evt.keyCode == 46)
			$scope.$apply(function(){$scope.clear();});
		else if (evt.keyCode == 111)
			$scope.$apply(function(){$scope.proceed('/', $scope.operations.divide);});
		else if (evt.keyCode == 106)
			$scope.$apply(function(){$scope.proceed('*', $scope.operations.multiply);});
		else if (evt.keyCode == 109)
			$scope.$apply(function(){$scope.proceed('-', $scope.operations.minus);});
		else if (evt.keyCode == 107)
			$scope.$apply(function(){$scope.proceed('+', $scope.operations.plus);});
		else if (evt.keyCode == 13)
			$scope.$apply(function(){$scope.equal();});
		else if (evt.keyCode == 110)
			$scope.$apply(function(){$scope.dot();});	
	});
}