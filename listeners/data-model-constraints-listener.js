/**
 * MOST Web Framework Data Model Listener
 * Created by ${USER} on ${DATE}.
 */
/**
 * @private
 */
var web = require('most-web'), async = require("async");
/**
 * @param {DataEventArgs} event
 * @param {Function} callback
 */
exports.beforeSave = function (event, callback) {
    try {
        return callback();
    }
    catch (e) {
        return callback(e);
    }
};

/**
 * @param {DataEventArgs} event
 * @param {Function} callback
 */
exports.afterSave = function (event, callback) {
    try {
        var context = event.model.context;
        if (web.common.isNullOrUndefined(event.target.constraints)) {
            return callback();
        }
        event.target.constraints.forEach(function(x) { x.model = event.target.name; });
        context.model("Constraint").silent().save(event.target.constraints).then(function () {
            return callback();
        }).catch(function (err) {
            return callback(err);
        });
    }
    catch (e) {
        return callback(e);
    }
};