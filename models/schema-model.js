/**
 * MOST Web Framework Data Model Class
 * Created by kbarbounakis on 4/8/16.
 */
/**
 * @private
 */
var web = require("most-web"),
    util = require("util"), 
    Q = require("q"),
    glob = require("glob"),
    async = require("async"),
    path = require("path"),
    md = require('most-data');

function getConnectOptions_() {
    if (web.common.isNullOrUndefined(this.id)) {
        throw new Error("Project identifier must be a number.");
    }
    var file26 = web.common.convertToBase26(this.id);
    return { database:"db/" + file26.substr(0,1) + "/" + file26 + ".db" };
}

/**
 * @constructor
 * @augments {DataObject}
 */
function SchemaModel(obj) {
    SchemaModel.super_.call(this, 'Project', obj);
    var self = this, context_;

    self.getContext = function() {
        if (context_) { return context_; }
        context_ = md.createContext("project");
        context_.db.options.database = this.getConnectOptions().database;
        /**
         * @param name
         * @returns {DataModel|undefined}
         */
        context_.model = function(name) {
            if (web.common.isEmptyString(name)) {
                return;
            }
            try {
                var result = new md.classes.DataModel(require("most-schema-editor/config/models/" + name + ".json"));
                result.context = context_;
                return result;
            }
            catch(e) {
                web.common.log(util.format("An error occured while trying to load model with name %s", name));
                web.common.log(e);
            }
        };
        return context_;
    }
}
util.inherits(SchemaModel, md.DataObject);

SchemaModel.prototype.getConnectOptions = function() {
    return getConnectOptions_.call(this);
};

SchemaModel.prototype.runInContext = function(fn, callback) {
    var self = this;
    callback = callback || function() { };
    fn.call(this, function(err) {
        self.getContext().finalize(function() {
            return callback(err);
        });
    });
};

SchemaModel.prototype.generate = function() {
    var self = this, deferred = Q.defer();
    self.runInContext(function(cb) {
        //enumerate files
        glob(path.join(process.cwd(),"app/config/models/*.json"), function(err, files) {
            if (err) {
                return cb(err);
            }
            async.eachSeries(files, function(file, cb1) {
                //get data model

            }, function(err) {
                return cb(err);
            })
        });
    }, function(err) {
        if (err) { return deferred.reject(err); }
        return deferred.resolve();
    });
    return deferred.promise;
};

if (typeof module !== 'undefined') module.exports = SchemaModel;
