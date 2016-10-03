var searchTerm = "water skiing";

var wikiUrl = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + searchTerm + "&format=json&callback=wikiCallback"

	$.ajax({
		url: wikiUrl,
		dataType: "jsonp",
		// jsonp: "callback",
		success: function(response) {
			console.log(response);
		}
	});
