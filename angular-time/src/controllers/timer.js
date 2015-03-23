module.exports = (function() {
    var TimerController = function($scope, $interval) {
        var vm = this,
            _timerPromise = null;

        vm.pauseTask = function(task) {
            task.playing = false;
            vm.stopInterval();
        };
        vm.stopInterval = function() {
            $interval.cancel(_timerPromise);
        };
        vm.resumeTask = function(task) {
            vm.stopInterval();

            task.playing = true;
            _timerPromise = $interval(function() {
                task.accumulatedTime += 1000;
                vm.updateTimeString(task);
            }, 1000);
        };
        vm.updateTimeString = function(task) {
            task.timeString = moment(task.accumulatedTime).format('mm:ss');
        };
    };

    return TimerController;
})();

