/**
 * Created by kbarbounakis on 4/7/16.
 */

var fs = require("fs"),
    async = require("async"),
    web = require("most-web"),
    md = require("most-data"),
    path = require("path"),
    glob = require("glob"),
    util = require("util"),
    Q = require("q");


/**
 * @param {DataContext|*=} parentContext
 * @constructor
 */
function SchemaManager(parentContext) {

    var self = this;
    var context_;

    self.getParentContext = function() {
        return parentContext;
    };

    self.getContext = function() {
        if (context_) { return context_; }
        context_ = md.createContext("schema");

        var path_ = path.resolve(__dirname, "./../config/models");
        /**
         * Overrides configuration manager
         * @returns {DataConfiguration}
         */
        context_.getConfiguration = function() {
            return md.cfg.getNamedConfiguration("schema").setModelPath(path_);
        };

        /**
         * Gets the instance of SchemaManager class which is associated with this context.
         * @returns {SchemaManager}
         */
        context_.getSchemaManager = function() {
            return self;
        };

        context_.getParentContext = function() {
            return parentContext;
        };

        return context_;
    }
}

SchemaManager.prototype.initialize = function() {
    var self = this, deferred = Q.defer();
    self.runInContext(function(cb) {
        return self.getNativeModels().then(function(models) {
            models.forEach(function(x) { x.$state = 1; });
            //prepare models
            models.forEach(function (model) {
                var parentModel = self.getParentContext().model(model.name);
                model.fields.forEach(function (x) {
                    var field = parentModel.attributes.find(function (y) {
                        return (y.name === x.name);
                    });
                    if (field) {
                        if (field.model!==model.name) {
                            x.derivedFrom = field.model;
                        }
                    }
                    x.model = model.name;
                });
                if (model.constraints) {
                    model.constraints.forEach(function(constraint) {
                        if (constraint.fields) {
                            var constraintFields = constraint.fields.slice(0);
                            constraint.fields = [];
                            constraintFields.forEach(function (z) {
                                //find field
                                var field = parentModel.attributes.find(function (y) {
                                    return (z === y.name);
                                });
                                if (field) {
                                    constraint.fields.push({
                                        "name":field.name,
                                        "model":field.model
                                    });
                                }
                            });
                        }
                    });
                }
            });
            return self.getContext().model("DataModel").silent().save(models[0]).then(function () {
                return cb();
            }).catch(function (err) {
                return cb(err);
            });
        }).catch(function(err) {
            return cb(err);
        });
    }, function(err) {
        if (err) { return deferred.reject(err); }
        deferred.resolve();
    });
    return deferred.promise;
};


SchemaManager.prototype.getNativeModels = function() {
    var deferred = Q.defer();
    var applicationPath = this.getParentContext().application.mapPath("/");
    glob(path.resolve(applicationPath, "./../config/models/*.json"), function(err, files) {
        if (err) {
            return deferred.resolve(err);
        }
        var result = [];
        async.eachSeries(files, function(file, cb) {
            try {
                result.push(require(file));
                return cb();
            }
            catch (e) {
                cb(e);
            }
        }, function(err) {
            if (err) {
                return deferred.resolve(err);
            }
            return deferred.resolve(result);
        });
    });
    return deferred.promise;
};


SchemaManager.prototype.getNativeModel = function(name) {
    try {
        if (web.common.isEmptyString(name))
            return;
        var applicationPath = this.getParentContext().application.mapPath("/");
        return require(path.resolve(applicationPath, util.format("./../config/models/%s.json", name)));
    }
    catch(e) {
        //
    }
};

SchemaManager.prototype.runInContext = function(fn, callback) {
    var self = this;
    callback = callback || function() { };
    fn.call(this, function(err) {
        self.getContext().finalize(function() {
            return callback(err);
        });
    });
};

if (typeof module !== 'undefined') {
    module.exports = {
        SchemaManager:SchemaManager,
        /**
         * @param {DataContext|*=} parentContext
         * @returns {SchemaManager}
         */
        getSchemaManager: function(parentContext) {
            return new SchemaManager(parentContext);
        }
    };
} 