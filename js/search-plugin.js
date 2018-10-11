var search = {};

search.init = function() {
	search.indexPosts();
	search.createButton();
}

search.indexPosts = function() {
	// create search index; only title and description for now
	$.get(POSTS_JSON_URL, function(posts) {
		search.index = [];
		for(var article in posts) {
			search.index.push({
				"key" : article,
				"title" : posts[article].title,
				"description" : posts[article].description
			});
		}
	});
}

search.createButton = function() {
	// add search button and define behaviour
	var searchField = $('<input>')
						.attr("id", "searchField")
						.attr("type", "text")
						.attr("autocomplete", "off");
	var searchResults = $('<table>').attr("id", "searchResults");

	searchField.keypress(function(event) {
		var text = $("#searchField").val();
		var updateKey = event.originalEvent.key;
		var searchText = text.toLowerCase();
		if (updateKey === "Backspace") {
			searchText = searchText.substring(0, searchText.length - 2);
		} else {
			searchText = searchText + updateKey.toLowerCase();
		}
		var results = [];

		// searching through title and description, 
		// we may want to reorder the search results depending on which has 
		// more weightage
		for(var i = 0; i < search.index.length; i++) {
			var post = search.index[i];
			if(post.title.toLowerCase().includes(searchText)
				|| post.description.toLowerCase().includes(searchText)) {
				results.push(post);
			}
		}
		
		search.populateResults(results);
	});

	var searchBar = $('<form>').attr("id", "searchBar");
	searchBar.css("visibility", "hidden");
	searchBar.append(searchField);
	searchBar.append(searchResults);
	
	var searchDiv = $('<div>')
						.text("SEARCH")
						.attr("id", "search")
						.css("cursor", "pointer");
	searchDiv.css("background-color", "green");
	searchDiv.click(function() {
		var state = searchBar.css("visibility");
		if(state == "visible") 
			searchBar.css("visibility", "hidden");
		else 
			searchBar.css("visibility", "visible");
	});

	$("#main-body").append(searchDiv);
	$("#main-body").append(searchBar);
}

search.populateResults = function(results) {
	$('#searchResults tr').remove();
	var searchResults = $('#searchResults');
	for(var i = 0; i < results.length; i++) {
		var post = results[i];
		var cell = $('<tr><td>');
		var link = $('<a>')
				.attr('href', _postLinkFromId(post.key))
				.text(post.title);
		cell.append(link);
		searchResults.append(cell);
	}
};

$(document).ready(function(){
	search.init();
});