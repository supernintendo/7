(function() {
    var Waves = {
        attributes: {
            intervalLow: 10,
            intervalHigh: 50,
            xSpacingLow: 100,
            xSpacingHigh: 200,
            ySpacingLow: 100,
            ySpacingHigh: 200,
            template: document.querySelector('#wave-orb').innerHTML
        },
        // Place an orb.
        adjustElement: function(element, left, top) {
            element.style.position = 'fixed';
            element.style.marginTop = -45 + 'px';
            element.style.marginLeft = -45 + 'px';
            element.style.paddingLeft = left + 'px';
            element.style.paddingTop = top + 'px';
        },
        // Random int
        random: function(low, high) {
            return low + Math.floor(Math.random() * high);
        },
        // Reset the animation state.
        resetValues: function() {
            var attr = this.attributes;

            this.state = {
                interval: this.random(attr.intervalLow, attr.intervalHigh),
                x: 0,
                xSpacing: this.random(attr.xSpacingLow, attr.xSpacingHigh),
                y: 0,
                ySpacing: this.random(attr.ySpacingLow, attr.ySpacingHigh)
            };
        },
        // Store the window height and width.
        storeViewport: function() {
            this.viewport.height = window.innerHeight,
            this.viewport.width = window.innerWidth;
        },
        // Reset the animation.
        resetAll: function() {
            this.resetValues();
            this.storeViewport();
            document.body.innerHTML = '';
        },
        // Begin placing the orbs.
        tick: function() {
            if (this.interval) {
                clearTimeout(this.interval);
            }
            this.interval = setInterval(function() {
                var el,
                    left = this.state.x * this.state.xSpacing,
                    top = this.state.y * this.state.ySpacing;

                if (top < this.viewport.height + 45) {
                    el = document.createElement('div');
                    el.innerHTML = this.attributes.template;
                    this.adjustElement(el, left, top);
                    document.body.appendChild(el);

                    if (left > this.viewport.width) {
                        this.state.y++;
                        this.state.x = 0;
                    } else {
                        this.state.x++;
                    }
                }
            }.bind(this), this.state.interval);
        },
        viewport: {}
    };
    window.addEventListener('resize', Waves.resetAll.bind(Waves));
    Waves.resetAll();
    Waves.tick();
})();
