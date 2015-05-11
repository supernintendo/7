var angular = require('angular');

angular
    .module('app', [])
    .controller('MainController', require('./controllers/main'))
    .controller('FilterController', require('./controllers/filter'))
    .controller('TimerController', require('./controllers/timer'))
    .controller('TaskSettingsController', require('./controllers/task-settings'))
    .service('TaskService', require('./services/tasks'))
    .service('ElementsService', require('./services/elements'));