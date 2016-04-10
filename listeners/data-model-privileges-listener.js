/**
 * MOST Web Framework Data Model Listener
 * Created by ${USER} on ${DATE}.
 */
/**
 * @private
 */
var web = require('most-web');
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
        if (web.common.isNullOrUndefined(event.target.privileges)) {
            return callback();
        }
        event.target.privileges.forEach(function(x) { x.model = event.target.name; });
        context.model("Privilege").silent().save(event.target.privileges).then(function () {
            return callback();
        }).catch(function (err) {
            return callback(err);
        });
    }
    catch (e) {
        return callback(e);
    }
};