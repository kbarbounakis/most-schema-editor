/**
 * MOST Web Framework Controller
 * Created by kbarbounakis on 4/7/16.
 */
/**
 * @private
 */
var web = require("most-web"),
    util = require("util"),
    ModelController = require("./model-controller"),
    mgr = require("./schema-manager");
/**
 * @constructor
 * @augments {HttpBaseController}
 */
function SchemaBaseController() {
    SchemaBaseController.super_.call(this);
}
util.inherits(SchemaBaseController, web.controllers.HttpBaseController);

SchemaBaseController.prototype.schema = function (callback) {
    var self = this;
    var ctrl = new ModelController();
    ctrl.model = mgr.getSchemaManager(self.context).getContext().model(self.context.params.name);
    return ctrl.index(callback);
};

// SchemaBaseController.prototype.schema = function (callback) {
//     var self = this;
//     mgr.getSchemaManager(self.context).getContext().model("DataModel")
//         .where("name").equal(self.context.params.name).first().then(function (result) {
//         return callback(null, self.result(result))
//     }).catch(function (err) {
//         return callback(err);
//     });
// };

if (typeof module !== 'undefined') module.exports = SchemaBaseController;