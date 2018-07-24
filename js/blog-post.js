'use strict';

var $mainBody = $('#main-body');

var $mainNav = $('#main-nav');
var navHeight = $mainNav.height();

var NAV_BODY_MARGIN = 25;

// scrolling body-nav offset
$mainBody.offset({ top: navHeight + NAV_BODY_MARGIN, bottom: NAV_BODY_MARGIN });