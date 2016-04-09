/**
 * Created by kbarbounakis on 4/7/16.
 */

var fs = require("fs"),
    async = require("async"),
    path = require("path"),
    glob = require("glob"),
    util = require("util"),
    Q = require("q");
function SchemaManager() {
    
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

if (typeof module !== 'undefined') {
    module.exports = {
        SchemaManager:SchemaManager,
        getSchemaManager: function() {
            return new SchemaManager();
        }
    };
} 