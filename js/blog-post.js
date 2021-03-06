'use strict';

var $mainBody = $('#main-body');

var $mainNav = $('#main-nav');
var navHeight = $mainNav.height();

var $articleDate = $('.article-date');
var $articleWeekday = $('.article-weekday');


var NAV_BODY_MARGIN = 25;

// scrolling body-nav offset
$mainBody.offset({ top: navHeight + NAV_BODY_MARGIN, bottom: NAV_BODY_MARGIN });

// Adjusting the article datetime string to neat, clean one
var oldArticleDateString = $articleDate.text();
var newArticleDateString = blogUtil.minDateString(oldArticleDateString);
if (newArticleDateString !== oldArticleDateString && newArticleDateString.length !== 0) {
    $articleDate.text(newArticleDateString);
}

var articleWeekdayString = blogUtil.getWeekdayString(new Date(newArticleDateString));
if (articleWeekdayString !== "") {
    $('.article-weekday')
        .text("  " + articleWeekdayString);
}