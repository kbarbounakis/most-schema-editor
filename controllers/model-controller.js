/**
 * MOST Web Framework Controller
 * Created by kbarbounakis on 4/12/16.
 */
/**
 * @private
 */
var web = require("most-web"),
    mgr = require("./schema-manager"),
    util = require("util");
/**
 * @constructor
 * @augments {HttpDataController}
 */
function ModelController() {
    ModelController.super_.call(this);
}
util.inherits(ModelController, web.controllers.HttpDataController);


ModelController.prototype.index = function(callback) {
    this.model = mgr.getSchemaManager(this.context).getContext().model("Model");
    return ModelController.super_.prototype.index.call(this, callback);
};

if (typeof module !== 'undefined') module.exports = ModelController;
