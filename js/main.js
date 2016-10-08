// Autocomplete adapted from http://codepen.io/edkahara/pen/ZpvXxB
$("#searchText").autocomplete({
	source: function(request, response) {
		$.ajax({
			type: "GET",
			url: "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + request.term + "&format=json&callback?",
			dataType: "jsonp",
			success: function(data) {
				response(data[1]);
			},
		});
	},
	// Submit on select credit http://stackoverflow.com/questions/2198539/jquery-autocomplete-submit-form-on-selection
	select: function(event, ui) { 
		$("#searchText").val(ui.item.value);
		$("#form-container").submit(); 
	}

});
// Close autocomplete dropdown on enter	http://stackoverflow.com/questions/9602395/jquery-ui-autocomplete-hide-list-after-hiting-enter
$("#searchText").keypress(function(e){ 
	if (!e) e = window.event;   
	if (e.keyCode == "13"){
		$("#searchText").autocomplete("close");
		$("#form-container").submit();
		return false;
	}
  });

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
		success: function(response) {
			// Remove previous results
			$("#results").html("");
			// Check for errors
			if (response.hasOwnProperty("error")) {
				$("#results").append('<div class="text-center col-md-6 col-md-offset-3 col-sm-6 col-sm-offset-3 col-xs-8 col-xs-offset-2 result"><h4>Error encountered. Please try again later!</h4></div>');
			// Check for no results
			} else if (response.query.search.length === 0) {
				$("#results").append('<div class="text-center col-md-6 col-md-offset-3 col-sm-6 col-sm-offset-3 col-xs-8 col-xs-offset-2 result"><h4>No Results Found</h4></div>');
			} else {
				var result = response.query.search;
				// Loop through response array and append results
				for (var i = 0; i < result.length; i++) {
					var endUrl = result[i].title.replace(/ /g, "_");
					var title = result[i].title;
					var snippet = result[i].snippet;
					$("#results").append('<a href=http://en.wikipedia.org/wiki/' + endUrl + ' target="blank_"><div class="col-md-6 col-md-offset-3 col-sm-6 col-sm-offset-3 col-xs-8 col-xs-offset-2 result"><h4>' + title + '</h4><p class="description"><p>' + snippet + '<p></div></a>');
				}
			}
		},
		error: function() {
			$("results").html("Error encountered. Please try again later!");
		}  
	});
});