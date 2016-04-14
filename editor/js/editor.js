/**
 * Created by kbarbounakis on 2/22/16.
 */
angular.module('editor', ['ngMessages','ui.router', 'editor.controllers', 'editor.filters','most'])
    .config(function($stateProvider, $urlRouterProvider) {
        //
        // For any unmatched url, redirect to /state1
        $urlRouterProvider.otherwise("/app");
        //
        // Now set up the states
        $stateProvider
            .state('app', {
                url: "/app",
                templateUrl: "/editor/templates/app.html"
            }).state('model', {
            url: "/app/model/:name",
            templateUrl: "/editor/templates/model.html"
        });
    });