function resertFont() {
    var HTML = document.getElementsByTagName('html')[0];
    var deviceWidth = document.documentElement.clientWidth;
    var scale = deviceWidth / 320;
    HTML.style.fontSize = 100 * scale + 'px';
}
resertFont();
window.onresize = function() {
    resertFont();
}

//navigation event bind for mobile
window.onload = function() {
    var navContainer = document.querySelector('.header-classify'),
        firstNav = document.querySelector('.header-classify .header-all'),
        mask = document.querySelector('.common-header .mask');

    firstNav && firstNav.addEventListener('click', function() {
        if (navContainer.className.indexOf('header-classify-moblie') === -1) {
            navContainer.className = 'header-classify header-classify-moblie';
            mask.className = 'mask';

            document.addEventListener('scroll', function() {
                navContainer.className = 'header-classify';
                mask.className = 'mask hide';
            })

        } else {
            navContainer.className = 'header-classify';
            mask.className = 'mask hide';

            document.removeEventListener('scroll');
        }

    })

    mask && mask.addEventListener('click', function() {
        navContainer.className = 'header-classify';
        mask.className = 'mask hide';
    })

    //more navigation handler
    var moreNav = document.querySelector('.common-header .header-more-hide');
    if (moreNav) {
        moreNav.addEventListener('click', function(e) {
            if (moreNav.className.indexOf('header-more-hide') === -1) {
                moreNav.className += ' header-more-hide';
            } else {
                moreNav.className = moreNav.className.replace('header-more-hide', '');
            }

            e.stopPropagation ? e.stopPropagation() : (e.cancelBubble = false);
        })

        document.body.addEventListener('click', function() {
            if (moreNav.className.indexOf('header-more-hide') === -1) {
                moreNav.className += ' header-more-hide';
            }
        })
    }
}
