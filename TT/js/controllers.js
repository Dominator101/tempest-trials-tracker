app.controller('defaultCont', function($scope, $rootScope, $location, trialData) {
	$scope.trialData = trialData ;
	$scope.showAll = false ;

	$scope.$watch(
		function() { return trialData.points; },
		function(newValue, oldValue) {
			if ( newValue !== oldValue ) {
				var remaining = trialData.end.getTime() - new Date().getTime() ;
				trialData.calcPPDs(remaining) ;
				trialData.updatePrizeCounts() ;
			}
		}
	);

	$scope.getBackgroundURL = function() {
		var backStyle = 'url(\'' ;

		var imgURL = 'img/posters/neutral.png' ;
		if(trialData.points >= trialData.majorPrizes[1].points) imgURL = 'img/posters/attack.png' ;
		if(trialData.points >= trialData.majorPrizes[3].points) imgURL = 'img/posters/special.png' ;
		if(trialData.points >= trialData.majorPrizes[4].points) imgURL = 'img/posters/damage.png' ;
		

		backStyle += imgURL + '\')' ;
		return {'background-image': backStyle};
	}

	$scope.charAllFilter = function(item) {
		return item.type == 'char' || item.type == 'all' ;
	}

	$scope.getImg = function(item) {
		return 'img/' + item.img ;
	}

	$scope.gotoProjected = function() {
		$scope.showAll = true ;
		setTimeout(function(){
			var proj = document.getElementById('projectedAnchor');
			proj.scrollIntoView();
		}, 50);
	}

	$scope.isProjected = function(prize, next) {
		// If my points is less than projected, but the next prize is over the projection...
		var isProjected = prize.points <= trialData.projected && (next == null || next.points > trialData.projected) ;

		// ...or I'm the highest prize and the projection is > 99999
		//var isHighest = trialData.projected > 99999 && prize.points == 99999 ;

		//return isProjected || isHighest ;
		return isProjected ;
	}
});

app.controller('tableCont', function($scope, $location, trialData) {
	$scope.trialData = trialData ;
});

app.controller('countdownCont', function($scope, $location, trialData) {
	var startDate = trialData.start ;
	var endDate = trialData.end ;

	if(updateCountdown(false)) return ;

	var update = setInterval(function() {
		updateCountdown(true) ;
	}, 1000);

	function updateCountdown(apply) {
		// Get the elapsed and remaining times
		var now = new Date().getTime() ;
		var elapsed = now - startDate.getTime() ;
		var remaining = endDate.getTime() - now ;

		// Trials are over :(
		if (remaining < 0) {
			clearInterval(update);
			$scope.time = "Trials over :(" ;
			if(apply) $scope.$apply() ;
			return true ;
		}

		$scope.time = '' ;
		var target = remaining ;
		if(startDate > now) {
			target = startDate.getTime() - now ;
			$scope.time = 'Trials start in: ' ;
		}

		//-------------------//
		//  Countdown Stuff  //
		//-------------------//
		// Get the date parts for the countdown
		var rDays = Math.floor(target / (1000 * 60 * 60 * 24)) ;
		var rHours = Math.floor((target % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) ;
		var rMinutes = Math.floor((target % (1000 * 60 * 60)) / (1000 * 60)) ;
		var rSeconds = Math.floor((target % (1000 * 60)) / 1000) ;

		var d = rDays == 1 ? ' day ' : ' days ' ;
		var h = rHours == 1 ? ' hour ' : ' hours ' ;
		var m = rMinutes == 1 ? ' minute ' : ' minutes ' ;
		var s = rSeconds == 1 ? ' second ' : ' seconds ' ;

		// Draw countdown
		$scope.time += rDays + d + rHours + h + rMinutes + m + rSeconds + s ;

		if(startDate < now) trialData.calcPPDs(remaining) ;

		if(apply) $scope.$apply() ;
	}
});