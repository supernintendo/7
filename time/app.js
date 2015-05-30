~function() {
    var inner = document.getElementById('inner-container'),
        timer = document.getElementById('time'),
        addClass = function(el, className) {
            if (el.classList) {
                el.classList.add(className);
            } else {
                el.className += ' ' + className;
            }
        },
        fadeInner = function() {
            removeClass(inner, 'transparent');
            setTimeout(function() {
                addClass(inner, 'transparent');
            }, 1);
        },
        getTimeRange = function() {
            console.log(moment().format('h'));
        },
        removeClass = function(el, className) {
            if (el.classList) {
                el.classList.remove(className);
            } else {
                el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
            }
        },
        updateTimer = function() {
            var parts = [
                moment().format('h'),
                moment().format('mm'),
                moment().format('ss')
            ];

            timer.innerHTML = parts.join('<span class="color-two">:</span>') +
                              '<span class="color-three medium-type">' +
                              moment().format('a') +
                              '</span>';
        };

    updateTimer();
    getTimeRange();
    fadeInner();
    setInterval(updateTimer, 1000);
}();
