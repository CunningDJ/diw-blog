console.log('BLOG-UTIL');



var blogUtil = {
    minDateString: _minDateString
};

function _minDateString(rawDateString) {
    var d = new Date(rawDateString);
    return d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
}

function _postLinkFromId(postId) {
    return "/p/" + postId + ".html";
}