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
        if (web.common.isNullOrUndefined(event.target.eventListeners)) {
            return callback();
        }
        event.target.eventListeners.forEach(function(x) { x.model = event.target.name; });
        context.model("Listener").silent().save(event.target.eventListeners).then(function () {
            return callback();
        }).catch(function (err) {
            return callback(err);
        });
    }
    catch (e) {
        return callback(e);
    }
};