/**
 * MOST Web Framework Controller
 * Created by kbarbounakis on 4/7/16.
 */
/**
 * @private
 */
var web = require("most-web"),
    util = require("util"),
    manager = require("./schema-manager");
/**
 * @constructor
 * @augments {HttpDataController}
 */
function SchemaBaseController() {
    SchemaBaseController.super_.call(this);
    
    var self = this, schemaManager_;
    self.getSchemaContext = function() {
        if (schemaManager_) {
            return schemaManager_;
        }
        if (typeof self.context === 'undefined' || self.context == null) {
            return;
        }
        schemaManager_ = manager.getSchemaManager(this.context).getContext();
        return schemaManager_;
    }
    
}
util.inherits(SchemaBaseController, web.controllers.HttpDataController);

SchemaBaseController.prototype.index = function (callback) {

    if (web.common.isEmptyString(this.context.params.name)) {
        return callback(new web.common.HttpBadRequest());
    }
    this.model = this.getSchemaContext().model(this.context.params.name);
    return SchemaBaseController.super_.prototype.index.call(this, callback);
};

if (typeof module !== 'undefined') module.exports = SchemaBaseController;