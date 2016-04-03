module.exports = (function() {
    var FilterController = function(ElementsService) {
        var vm = this;
        vm.searchPhrase = "";

        vm.applyFilter = function(tasks) {
            ElementsService.makeDropdownsSticky(); // Refresh dropdowns.
            tasks.map(this.filterBySearchPhrase, this);
        };

        /* Return only tasks that match the search phrase as well as any task
            that is currently being edited. */
        vm.filterBySearchPhrase = function(task) {
            var filtered = task,
                regEx = new RegExp(this.searchPhrase, "g");

            if (task.name.match(regEx) || task.editing) {
                filtered.hidden = false;
                return filtered;
            } else {
                filtered.hidden = true;
                return filtered;
            }
        };
    };

    return FilterController;
})();

