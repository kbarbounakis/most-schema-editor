/**
 * Created by kbarbounakis on 4/7/16.
 */
angular.module('editor.filters', []).filter("yesno",function() {
    return function(value) {
        if (typeof value === "undefined") {
            return "-";
        }
        if (value) {
            return "Yes";
        }
        return "No";
    }
});