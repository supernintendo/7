~function() {
    var gradient = 0,
        stroke,
        x = 0,
        y = 0,
        xSpacing = 90,
        ySpacing = 90,
        template = document.querySelector('#wave-orb').innerHTML,
        viewport = {},

        adjustElement = function(element, left, top) {
            element.style.position = 'fixed';
            element.style.marginTop = -45 + 'px';
            element.style.marginLeft = -45 + 'px';
            element.style.paddingLeft = left + 'px';
            element.style.paddingTop = top + 'px';
        },
        colorElement = function(element) {
            element.querySelector('.ring').style.borderColor = stroke;
            element.querySelector('.particle').style.background = stroke;

            if (gradient[y]) {
                element.querySelector('.ring').style.background = 'rgba(' + gradient[y].join(',') + ', 0.75)';
            }
        },
        getGradient = function(samples, rgbTo, rgbFrom) {
            var rgbDiff = [
                    rgbTo[0] - rgbFrom[0],
                    rgbTo[1] - rgbFrom[1],
                    rgbTo[2] - rgbFrom[2]
                ],
                hues = [],
                i;

            for (i = 0; i < samples; i++) {
                hues.push(getGradientPoint(i / samples, rgbDiff, rgbFrom));
            }
            return hues;
        },
        getGradientPoint = function(delta, rgbDiff, rgbFrom) {
            return [
                Math.floor(rgbDiff[0] * delta + rgbFrom[0]),
                Math.floor(rgbDiff[1] * delta + rgbFrom[1]),
                Math.floor(rgbDiff[2] * delta + rgbFrom[2])
            ];
        },
        resetValues = function() {
            x = 0;
            y = 0;
        },
        storeViewport = function() {
            viewport.height = window.innerHeight,
            viewport.width = window.innerWidth;
        },
        resetAll = function() {
            resetValues();
            storeViewport();
            gradient = getGradient(viewport.height / ySpacing, [167, 219, 216], [105, 210, 231]);
            stroke = '#00BCD1';
            document.body.innerHTML = '';
        };

    window.addEventListener('resize', resetAll);
    resetAll();
    setInterval(function() {
        var el,
            left = x * xSpacing,
            top = y * ySpacing;

        if (top < viewport.height + 45) {
            el = document.createElement('div'),
            el.innerHTML = template;
            adjustElement(el, left, top);
            colorElement(el);
            document.body.appendChild(el);

            if (left > viewport.width) {
                y++;
                x = 0;
            } else {
                x++;
            }
        }
    }, 25);
}();
