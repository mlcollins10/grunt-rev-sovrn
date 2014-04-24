'use strict';

var fs = require('fs');
var path = require('path');

module.exports = function(grunt) {
    grunt.registerMultiTask('rev_sovrn', 'Prefix static asset file names with a version number', function() {
        var options = grunt.task.current.options({'private': true});
        var version = fs.readFileSync(options.versionSource, {encoding:"utf8"}).trim();
        
        this.files.forEach(function(filePair) {
            filePair.src.forEach(function(f) {
                grunt.log.write("version: " + version + "\n");
                grunt.log.write("base: " + path.basename(f));
                var renamed = version + "." + path.basename(f);
                var outPath = path.resolve(path.dirname(f), renamed);
                grunt.log.write("writing: " + outPath);
                fs.renameSync(f, outPath);
                grunt.log.write(f + ' ').ok(renamed);
            });
        });
    });
};