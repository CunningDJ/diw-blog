console.log('BLOG-UTIL');



var blogUtil = {
    minDateString: _minDateString
};

function _minDateString(rawDateString) {
    return (new Date(rawDateString).toDateString());
}

function _postLinkFromId(postId) {
    return "/p/" + postId + ".html";
}