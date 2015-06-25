module.exports = (function() {
    var TaskSettingsController = function($scope, TaskService) {
        var vm = this;
        vm.labels = ['violet', 'blue', 'green', 'yellow', 'red'];
        vm.destroyTask = TaskService.destroyTask;

        // Mark a task as done.
        vm.completeTask = function(task) {
            task.done = true;
            task.playing = false;
        };

        // Check if the task has a label and return the appropriate state.
        vm.labelState = function(task, label) {
            if (task.labels.indexOf(label) === -1) {
                return 'inactive';
            } else {
                return 'active';
            }
        };

        // Mark a task as not done.
        vm.openTask = function(task) {
            task.done = false;
        };

        // If the task has the label, remove it. If it doesn't, add it.
        vm.toggleLabel = function(task, label) {
            var index = task.labels.indexOf(label);

            if (index === -1) {
                task.labels.push(label);
            } else {
                task.labels.splice(index, 1);
            }
        };
    };

    return TaskSettingsController;
})();

