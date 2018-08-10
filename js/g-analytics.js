if ( document.location.hostname === "web.dabblingin.com" ) {
    window.dataLayer = window.dataLayer || [];  
    function gtag() { dataLayer.push(arguments); }

    gtag('js', new Date());
    gtag('config', 'UA-119556311-5');
} else {
    console.debug('ga:dev');
}