~function() {
    var colors = [
            [[199,237,232], [160,222,214], [69,181,196]],
            [[176,248,255], [174,232,251], [0,188,209]]
        ],
        gradient = 0,
        interval = 105,
        stroke,
        x = 0,
        y = 0,
        xSpacing = 60,
        ySpacing = 75,
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
            element.querySelector('.ring').style.borderColor = rgba(stroke, 1);
            element.querySelector('.particle').style.background = rgba(stroke, 1);

            if (gradient[y]) {
                element.querySelector('.ring').style.background = rgba(gradient[y], 0.6);
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
        getRandomColors = function() {
            return colors[Math.floor((Math.random() * colors.length))];
        },
        rgba = function(colors, alpha) {
            return 'rgba(' + colors.join(',') + ', ' + alpha + ')';
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
            var colorSet = getRandomColors();

            resetValues();
            storeViewport();
            gradient = getGradient(viewport.height / ySpacing, colorSet[0], colorSet[1]);
            stroke = colorSet[2];
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
    }, interval);
}();
