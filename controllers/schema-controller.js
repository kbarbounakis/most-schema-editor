/**
 * MOST Web Framework Controller
 * Created by kbarbounakis on 4/7/16.
 */
/**
 * @private
 */
var web = require("most-web"),
    util = require("util"),
    mgr = require("./schema-manager");
/**
 * @constructor
 * @augments {HttpBaseController}
 */
function SchemaBaseController() {
    SchemaBaseController.super_.call(this);
}
util.inherits(SchemaBaseController, web.controllers.HttpBaseController);

SchemaBaseController.prototype.index = function (callback) {
    var self = this;
    mgr.getSchemaManager().getModels().then(function (result) {
        return callback(null, self.result(result))
    }).catch(function (err) {
        return callback(err);
    });
};

SchemaBaseController.prototype.schema = function (callback) {
    var self = this;
    mgr.getSchemaManager().getModel(self.context.params.name).then(function (result) {
        return callback(null, self.result(result))
    }).catch(function (err) {
        return callback(err);
    });
};

SchemaBaseController.prototype.script = function(callback)
{
    if (web.common.isEmptyString(this.context.params.name)) {
        return callback(new web.common.HttpBadRequest());
    }
    var scriptFile = this.context.params.name + '.js';
    return callback(null, this.file(path.resolve(__dirname, './../js/' + scriptFile), scriptFile));
};

if (typeof module !== 'undefined') module.exports = SchemaBaseController;