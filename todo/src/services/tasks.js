module.exports = (function() {
    var TaskService = function() {
        var _tasks = [],
            counter = 0,
            names = [
                "Hey,",
                "thanks",
                "for",
                "checking",
                "this",
                "out",
                "but",
                "I",
                "have",
                "one",
                "question,",
                "which",
                "is,",
                "why",
                "are",
                "you",
                "checking",
                "this",
                "out?",
                "It",
                "is",
                "simply",
                "a",
                "todo",
                "list",
                "built",
                "in",
                "Angular",
                "and",
                "nothing",
                "more.",
                "There",
                "are",
                "plenty",
                "of",
                "more",
                "interesting",
                "things",
                "on",
                "the",
                "Internet",
                "you",
                "could",
                "be",
                "looking",
                "at.",
                "You",
                "must",
                "really",
                "love",
                "me.",
                "I",
                "love",
                "you",
                "too.",
                "😘"
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
                task.editing = false;
            }, this);
        };
    };

    return TaskService;
})();
