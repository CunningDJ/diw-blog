let $articleListing = $('#article-listing');

let POSTS_JSON_URL = "/d/posts.json";

// article list item html classes & tags
let AL = {
    "item": { 
        "class": "al-item", 
        "tag": "<div>" },
    "title": { 
        "class": "al-title", 
        "tag": "<h3>" },
    "author": { 
        "class": "al-author", 
        "tag": "<a>" },
    "description": { 
        "class": "al-description", 
        "tag": "<p>" },
    "date": { 
        "class": "al-date", 
        "tag": "<p>" }
};


function articleListItem(title, author, dateString, description) {
    let $listItem = $(AL.item.tag).addClass(AL.item.class);

    let $title = $(AL.title.tag)
                    .addClass(AL.title.class)
                    .text(title);
    
    let $author = $(AL.author.tag)
                    .addClass(AL.author.class)
                    .text(author);

    dateString = blogUtil.minDateString(dateString);
    let $date = $(AL.date.tag)
                    .addClass(AL.date.class)
                    .text(dateString);

    let $description = $(AL.description.tag)
                            .addClass(AL.description.class)
                            .text(description);

    // assembling
    console.log('title', title)
    console.log('author', author)
    $listItem
        .append($title)
        .append($author)
        .append($description)
        .append($date);

    return $listItem;
}

// Getting posts listing
$.get(POSTS_JSON_URL,
    function(posts) {
        console.log("POSTS", posts);
        Object.keys(posts).forEach(function(postID) {
            console.log('post name:', postID);
            console.log(posts[postID]);
            var p = posts[postID];
            var $listItem = articleListItem(p.title, p.author, p.date, p.description);
            $articleListing.append($listItem);
        });
    },
    "json");
