module.exports = (function() {
    var TaskService = function() {
        var _tasks = [],
            counter = 0,
            randomNames = [
                'Do science',
                'Draw something',
                'Exercise',
                'Read a new article',
                'Read a new book',
                'Ride a bicycle',
                'Travel to a new place',
                'Write a blog post',
                'Write code',
                'Write music'
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
                name: this.randomName(),
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
                task.editing = false;
            }, this);
        };

        this.randomName = function() {
            return randomNames[Math.floor(Math.random() * randomNames.length)];
        };
    };

    return TaskService;
})();