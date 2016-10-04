function search() {
	var searchTerm = $("#searchText").val();

	var wikiUrl = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + searchTerm + "&format=json&callback=wikiCallback";
	console.log(wikiUrl);
	$.ajax({
		type: "GET",
		url: wikiUrl,
		dataType: "json",
		headers: {
			"Api-User-Agent": "Example/1.0"
		},
		success: function(response){
			console.log(response);
		};
	});
}

$("#form-container").submit(search);

