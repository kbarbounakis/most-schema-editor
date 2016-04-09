angular.module('editor.controllers', []).controller("SchemaController",function($http) {
    var vm = this;
    function activate() {
        $http.get("/schema/index.json").then(function successCallback(response) {
            vm.models = response.data;
        }, function errorCallback(response) {
            console.log(response);
        });
    }
    activate();
}).controller("ModelController",function($http, $stateParams) {
    var vm = this;
    function activate() {
        $http.get("/schema/" + $stateParams.name + "/schema.json").then(function successCallback(response) {
            vm.model = response.data;
        }, function errorCallback(response) {
            console.log(response);
        });
    }
    activate();
});