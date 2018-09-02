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
	var searchField = $('<input id="searchField" type="text" />');
	var searchResults = $('<table id="searchResults" />');

	searchField.keypress(function(event) {
		var text = $("#searchField").val();
		var results = [];

		// searching through title and description, 
		// we may want to reorder the search results depending on which has 
		// more weightage
		for(var i = 0; i < search.index.length; i++) {
			var post = search.index[i];
			if(post.title.includes(text) || post.description.includes(text)) {
				results.push(post);
			}
		}
		
		search.populateResults(results);
	});

	var searchBar = $('<form id="searchBar" />');
	searchBar.css("visibility", "hidden");
	searchBar.append(searchField);
	searchBar.append(searchResults);
	
	var searchDiv = $('<div id="search">SEARCH</div>');
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
		var link = $('<tr><td>' + post.title + '</td></tr>');
		link.click(function() {
			window.location.replace("localhost:8000/p/" + post.key + ".html");
		});
		searchResults.append(link);
	}
};

$(document).ready(function(){
	search.init();
});