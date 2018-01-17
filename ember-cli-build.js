/* eslint-env node */
'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const Filter = require('broccoli-filter');

// DEFINE MyPlugin
function MyPlugin(inputNode) {
  Filter.call(this, inputNode);
}

MyPlugin.prototype = Object.create(Filter.prototype);
MyPlugin.prototype.processString = function(existingString, filePath) {
  let d = (new Date()).toISOString();
  return `/**
* ${filePath}
*
* (c) 2018 🦄🦄🦄🔫🌈🍺🍺 All Rights Reserved
* generated at: ${d}
*/
${existingString.replace("@@CURRENT_DATE@@", d)}`;
};

MyPlugin.prototype.extensions = ['js', 'css'];
// MyPlugin.prototype.targetExtension = 'js';
// END DEFINE MyPlugin

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    // Add options here
    'esw-index': {
      excludeScope: [/\/tests(\/.*)?$/,],
    },
    'esw-cache-fallback': {
      // RegExp patterns specifying which URLs to cache.
      patterns: [
        'https://commently-api-stage.herokuapp.com/api/(.+)',
      ]
    }
  });
  app.import('vendor/math.js');
 
  return new MyPlugin(app.toTree());
};
