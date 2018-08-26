console.log('BLOG-UTIL');

var _DAY_IN_MS = 1000*60*60*24;

/*
    USE THIS OBJECT:
*/

var blogUtil = {
    minDateString: _minDateString,
    getWeekdayString: _getWeekdayString
};



function _minDateString(rawDateString) {
    var d = new Date(rawDateString);
    //var weekdayString = _getWeekdayString(d);
    var dateStringParts = [d.toLocaleDateString()];
    /*if (weekdayString !== "") {
        dateStringParts.push(weekdayString);
    }*/
    dateStringParts.push(d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }));
    return dateStringParts.join(" ");
    //return d.toLocaleDateString() + ' ' + d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
}

function _getWeekdayString(comparedDate) {
    var date = new Date(comparedDate.getTime());
    var now = new Date();
    if (now.toLocaleDateString() === date.toLocaleDateString()) {
        return "Today";
    }

    // zeroing out hours before comparison
    date.setHours(0,0,0,0);
    now.setHours(0,0,0,0);
    var diffDays = (now.getTime() - date.getTime())/_DAY_IN_MS;

    if (diffDays >= 7) {
        return "";
    } else {
        return date.toLocaleDateString([], { weekday: "short" });
    }
}

function _postLinkFromId(postId) {
    return "/p/" + postId + ".html";
}