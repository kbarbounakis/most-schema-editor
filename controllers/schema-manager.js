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

function SchemaManager() {

    var self = this;
    var context_;

    self.getContext = function() {
        if (context_) { return context_; }
        context_ = md.createContext("schema");
        /**
         * @param name
         * @returns {DataModel|undefined}
         */
        context_.model = function(name) {
            if (web.common.isEmptyString(name)) {
                return;
            }
            try {
                var result = new md.classes.DataModel(require("./../config/models/" + name + ".json"));
                result.context = context_;
                return result;
            }
            catch(e) {
                return null;
            }
        };
        return context_;
    }
}

SchemaManager.prototype.initialize = function() {
    var self = this, deferred = Q.defer();
    self.runInContext(function(cb) {
        return self.getModels().then(function(models) {
            models.forEach(function(x) { x.$state = 1; });
            //enumerate models
            return self.getContext().model("DataModel").silent().save(models).then(function () {
                cb();
            });
        }).catch(function(err) {
            return cb(err);
        });
    }, function(err) {
        if (err) { return deferred.resolve(err); }
        deferred.resolve();
    });
    return deferred.promise;
};

function getSchemaModels() {
    var deferred = Q.defer();
    glob(path.resolve("./","config/models/*.json"), function(err, files) {
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
}

SchemaManager.prototype.getModels = function() {
    var deferred = Q.defer();
    glob(path.join(process.cwd(),"config/models/*.json"), function(err, files) {
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

SchemaManager.prototype.getModel = function(name) {
    var deferred = Q.defer();
    process.nextTick(function() {
       try {
           deferred.resolve(require(path.join(process.cwd(),util.format("/config/models/%s.json", name))));
       } 
        catch (e) {
            deferred.reject(e);
        }
    });
    return deferred.promise;
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
        getSchemaManager: function() {
            return new SchemaManager();
        }
    };
} 