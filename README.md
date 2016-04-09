# most-schema-editor (in progress)

Most Web Framework Schema Editor Extension

Μanage web application modelling by registering this extension in application configuration as follows:

    {
      ...
      "extensions": {
          "name":"schema", "description":"MOST Web Framework Schema Editor", "type":"most-schema-editor"
      }
    }

or by adding the following lines of code in server.js init script:

    var schema = require('most-schema-editor');
    schema.extend(web.current);
