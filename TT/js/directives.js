app.directive('prizeTable', function() {
	return {
		templateUrl: 'templates/table.html',
		controller: 'tableCont',
		replace: true,
		scope: {
			data: '='
		}
	};
});

app.directive('countdown', function() {
	return {
		templateUrl: 'templates/countdown.html',
		controller: 'countdownCont',
		replace: true
	};
});

app.directive("ngMobileClick", [function () {
	return function (scope, elem, attrs) {
		elem.bind("touchstart click", function (e) {
			//e.preventDefault();
			e.stopPropagation();

			scope.$apply(attrs["ngMobileClick"]);
		});
	}
}])