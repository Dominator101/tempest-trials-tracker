app.config(function($routeProvider) {
	$routeProvider.
	when('/', {
		templateUrl: 'templates/home2.html',
		controller: 'defaultCont'
	}).
	otherwise({
		redirectTo: '/'
	});
}) ;