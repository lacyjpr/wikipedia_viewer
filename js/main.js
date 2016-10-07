$("#form-container").submit(function(event) {
	event.preventDefault();
	var searchTerm = $("#searchText").val();
	var wikiUrl = "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=" + searchTerm + "&format=json";

	$.ajax({
		type: "GET",
		url: wikiUrl,
		dataType: "jsonp",
		headers: {
			"Api-User-Agent": "Example/1.0"
		},
		success: function(response){
			console.log(response);
			// Remove previous results
			$("#results").html("");
			// Check for errors
			if (response.hasOwnProperty("error")) {
				$("#results").append('<div class="text-center result"><h4>Error encountered. Please try again later!</h4></div>');
			// Check for no results
			} else if (response.query.search.length === 0){
				$("#results").append('<div class="text-center result"><h4>No Results Found</h4></div>');
			} else {
				var result = response.query.search;
				// Loop through response array and append results
				for (var i = 0; i < result.length; i++) {
					var endUrl = result[i].title.replace(/ /g, "_");
					var title = result[i].title;
					var snippet = result[i].snippet;
					$("#results").append('<div class="col-md-6 col-md-offset-3 col-sm-6 col-sm-offset-3 col-xs-8 col-xs-offset-2 result"><a href=http://en.wikipedia.org/wiki/' + endUrl + ' target="blank_">' + title + '</a><p class="description">' + snippet + '</div');
				}
			}
		},
		error: function() {
			$("results").html("Error encountered. Please try again later!");
		}  
	});
});



