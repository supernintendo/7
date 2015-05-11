module.exports = (function() {
    var MainController = function($scope, $timeout, TaskService, ElementsService) {
        var vm = this;
        vm.searchPhrase = '';
        vm.stopEditingAllTasks = TaskService.stopEditingAllTasks;
        vm.tasks = TaskService.getTasks();

        // Add a new task, fix Bootstrap dropdown.
        vm.addTask = function() {
            TaskService.addTask();
            ElementsService.makeDropdownsSticky();
        };

        // On enter or escape, stop editing task.
        vm.checkKey = function($event) {
            if ($event.keyCode === 13 || $event.keyCode === 27) {
                vm.stopEditingAllTasks();
            }
        };

        // Begin editing a task tame.
        vm.editTaskName = function(task) {
            vm.stopEditingAllTasks();
            ElementsService.focusInput('#task_rename_' + task.id);
            task.editing = true;
        };
    };

    return MainController;
})();