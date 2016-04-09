/**
 * MOST Web Framework Controller for Root
 * Created by kbarbounakis on 2015-11-04.
 */
var util = require('util'),
    web = require('most-web'),
    path = require('path');
/**
 * Represents the HTTP data controller of the Root model.
 * @class AdminBaseController
 * @constructor
 * @augments {HttpBaseController}
 */
function EditorBaseController() {
    EditorBaseController.super_.call(this);
}
util.inherits(EditorBaseController, web.controllers.HttpBaseController);

if (typeof module !== 'undefined') module.exports = EditorBaseController;