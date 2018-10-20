requirejs.config({
	baseUrl : "assets/js",
	paths : {
		jquery : "vendor/jquery-3.3.1.min"
	}
});

require([ "app" ], function(App) {
	App.build();
});
