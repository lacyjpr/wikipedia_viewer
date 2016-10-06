$("#form-container").submit(function(event) {
	event.preventDefault();
	var searchTerm = $("#searchText").val();

	var wikiUrl = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + searchTerm + "&format=json&callback=wikiCallback";

	$.ajax({
		type: "GET",
		url: wikiUrl,
		dataType: "jsonp",
		headers: {
			"Api-User-Agent": "Example/1.0"
		},
		success: function(response){
			// Remove previous results
			$("#results").html("");
			// Loop through response array and append results
			if (response[1].length === 0) {
				$("#results").append('<div class="text-center result"><h4>No Results Found</h4></div>');
			} else {
				for (var i = 0; i < response[1].length; i++) {
					$("#results").append('<div class="col-md-6 col-md-offset-3 col-sm-6 col-sm-offset-3 col-xs-8 col-xs-offset-2 result"><a href=' + response[3][i] + ' target="blank_">' + response[1][i] + '</a><p class="description">' + response[2][i] + '</div');
				}
			}
		},
		error: function() {
			$("results").html("Error encountered. Please try again later!");
		}  
	});
});



