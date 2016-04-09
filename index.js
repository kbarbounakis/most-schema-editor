/**
 * MOST Web Framework
 * A JavaScript Web Framework
 * http://themost.io
 * Created by Kyriakos Barbounakis<k.barbounakis@gmail.com> on 2016-04-07.
 *
 * Copyright (c) 2014, Kyriakos Barbounakis k.barbounakis@gmail.com
 Anthi Oikonomou anthioikonomou@gmail.com
 All rights reserved.
 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:
 * Redistributions of source code must retain the above copyright notice, this
 list of conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice,
 this list of conditions and the following disclaimer in the documentation
 and/or other materials provided with the distribution.
 * Neither the name of MOST Web Framework nor the names of its
 contributors may be used to endorse or promote products derived from
 this software without specific prior written permission.
 THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
/**
 * @ignore
 */
var SchemaBaseController = require('./controllers/schema-controller'),
    mgr = require('./controllers/schema-manager'),
    EditorBaseController = require('./controllers/editor-controller'),
    path = require('path');
if (typeof exports !== 'undefined')
{
    module.exports = {
        /**
         * @returns {SchemaManager}
         */
        getSchemaManager: function() {
            return mgr.getSchemaManager();
        },
        /**
         * @param {HttpApplication} app
         */
        extend:function(app) {
            //register controllers
            app.controller('schema', SchemaBaseController);
            app.controller('editor', EditorBaseController);
            //register routes
            app.config.routes.unshift(
                { "url":"/schema/:name/schema.json",  "mime":"application/json", "controller":"schema", "action":"schema" },
                { "url":"/schema/:action.json",  "mime":"application/json", "controller":"schema" },
                { "url":"/editor/",  "mime":"text/html", "action":"index", "controller":"editor", path:path.join(__dirname, 'views') }
            );
        }
    };
}