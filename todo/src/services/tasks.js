module.exports = (function() {
    var TaskService = function() {
        var _tasks = [],
            counter = 0,
            names = [
                "do",
                "re",
                "mi",
                "fa",
                "so",
                "la",
                "ti",
                "do"
            ];

        // Create a new task.
        this.addTask = function() {
            _tasks.push({
                accumulatedTime: 0,
                beer: false,
                done: false,
                editing: false,
                labels: [],
                id: counter,
                money: 0,
                name: names[counter % names.length],
                playing: false,
                timeString: '00:00'
            });
            counter++;
        };

        // Getter for tasks.
        this.getTasks = function() {
            return _tasks;
        };

        // Remove a given task.
        this.destroyTask = function(task) {
            var index = _tasks.indexOf(task);

            if (index > -1) {
                _tasks.splice(index, 1);
            }
        };

        // Mark all tasks as not editing.
        this.stopEditingAllTasks = function() {
            _tasks.forEach(function(task) {
                if (task.name.trim() === '') {
                    task.name = 'untitled';
                }
                task.editing = false;
            }, this);
        };
    };

    return TaskService;
})();
