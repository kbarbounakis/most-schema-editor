/**
 * MOST Web Framework Data Model Class
 */
/**
 * @private
 */
var web = require("most-web"),
    util = require("util"),
    Q = require("q"),
    md = require('most-data');
/**
 * @constructor
 * @property {string} inherits
 * @augments {DataObject}
 */
function DataModelModel() {
    DataModelModel.super_.call(this, 'DataModel', obj);
}
util.inherits(DataModelModel, md.DataObject);

DataModelModel.prototype.getAttributes = function()
{
    var self = this,
        context = this.context;
    if (self.inherits) {
        
    }
};

DataModelModel.prototype.getInheritedModel = function()
{
    var deferred = Q.defer(), self = this, context = this.context;
    process.nextTick(function() {
        if (web.common.isNullOrUndefined(self.inherits)) {
            return deferred.resolve(null);
        }
        var models = context.model("DataModel");
        models.where("name").equal(self.inherits).silent().first().then(function(result) {
            if (result)
                return deferred.resolve(models.convert(result));
            return deferred.resolve();
        }).catch(function (err) {
            return deferred.reject(err);
        });
    });
    return deferred.promise;
};

if (typeof module !== 'undefined') module.exports = DataModelModel;