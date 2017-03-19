(function () {
    angular
        .module('app')
        .controller('EventExecutionsController', ['EventExecutionService', '$scope',
            EventExecutionsController
        ]);

    function EventExecutionsController(EventExecutionsService, $scope, googlechart) {
        function onlyUnique(value, index, self) { 
          return self.indexOf(value) === index;
        }

        google.charts.load('current', {packages: ['corechart', 'bar']});
        google.charts.setOnLoadCallback(drawResources);

        function drawResources() {
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'Event');
            data.addColumn('number', 'Number of Executions');

            eventRes = [];

            var traceRes = EventExecutionsService.get({}, function(result) {

                console.log(result);

                var i = 0;

                for (var key in result) {
                    var val = result[key];
                    eventRes.push([key, Number(val)]);
                }

                data.addRows(eventRes);
                // $scope.data = data;
                chart.draw(data, options);

            }); 


            var options = {
              hAxis: {
                title: 'Event'
              },
              vAxis: {
                title: 'Number of Executions'
              }
            };

            var chart = new google.visualization.BarChart(document.getElementById('events_chart'));

            chart.draw(data, options);

        }
    }
})();
