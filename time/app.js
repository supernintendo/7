~function() {
    var inner = document.getElementById('inner-container'),
        milestone = document.getElementById('milestone-container'),
        milestones = document.getElementById('milestones'),
        outer = document.getElementById('outer-container'),
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
            var hour = Number(moment().format('H'));

            if (hour >= 6 && hour < 12) {
                return 'dawn';
            } else if (hour >= 12 && hour < 17) {
                return 'day';
            } else if (hour >= 17 && hour < 20) {
                return 'dusk';
            } else {
                return 'night';
            }
        },
        isBackgroundClass = function(className) {
            return className.indexOf('dawn') > -1 ||
                   className.indexOf('day') > -1 ||
                   className.indexOf('dusk') > -1 ||
                   className.indexOf('night') > -1;
        },
        removeBackgroundClass = function() {
            var classes = outer.classList, i;

            for (i = 0; i < classes.length; i++) {
                if (isBackgroundClass(classes[i])) {
                    removeClass(outer, classes[i]);
                }
            }
        },
        removeClass = function(el, className) {
            if (el.classList) {
                el.classList.remove(className);
            } else {
                el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
            }
        },
        showMilestone = function() {
            var elements = milestones.children,
                n = Math.floor(Math.random() * elements.length),
                element = elements[n],
                time = moment(new Date(Number(element.dataset.time)*1000)).fromNow();

            milestone.innerHTML = time + ', ' + element.innerHTML;
            removeClass(milestone, 'invisible');
        },
        shuffleBackground = function() {
            var n = Math.floor(Math.random() * 4 + 1);

            removeBackgroundClass();
            addClass(outer, getTimeRange() + n);

            if (getTimeRange() === 'dusk' || getTimeRange() === 'night') {
                addClass(milestone, 'invert');
                addClass(timer, 'invert');
            } else {
                removeClass(milestone, 'invert');
                removeClass(timer, 'invert');
            }
            fadeInner();
        },
        updateMilestone = function() {
            addClass(milestone, 'invisible');
            setTimeout(showMilestone, 425);
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
    updateMilestone();
    shuffleBackground();
    setInterval(updateTimer, 1000);
    setInterval(updateMilestone, 12000);
    setInterval(shuffleBackground, 30000);
}();
