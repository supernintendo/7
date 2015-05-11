module.exports = (function() {
    var ElementsService = function($timeout) {
        // Focus an input and select all text within it.
        this.focusInput = function(selector) {
            $timeout(function() {
                $(selector).focus().select();
            }, 1);
        };

        // Prevent closing Bootstrap dropdown when clicking on inner content.
        this.makeDropdownsSticky = function() {
            $timeout(function() {
                $('.persistent-dropdown').click(function(e) {
                    e.stopPropagation();
                });
            }, 1);
        };
    };

    return ElementsService;
})();