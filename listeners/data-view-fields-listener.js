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
        if (web.common.isNullOrUndefined(event.target.fields)) {
            return callback();
        }
        event.target.fields.forEach(function(x) {
           x.parent = event.target.id; 
        });
        context.model("ViewField").silent().save(event.target.fields).then(function () {
            return callback();
        }).catch(function (err) {
            return callback(err);
        });
    }
    catch (e) {
        return callback(e);
    }
};