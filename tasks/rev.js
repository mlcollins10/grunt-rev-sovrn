'use strict';

var fs = require('fs');
var path = require('path');

module.exports = function(grunt) {
    grunt.registerMultiTask('rev_sovrn', 'Prefix static asset file names with a version number', function() {
        grunt.log.write("starting rev sovrn 2 \n");
        grunt.log.write(this.options.versionSource + "\n");
        var options = grunt.task.current.options({'private': true});

        var version = fs.readFileSync(options.versionSource, {encoding:"utf8"});
        
        this.files.forEach(function(filePair) {
            filePair.src.forEach(function(f) {
                grunt.log.write("version2: " + version);
                var renamed = version + "." + path.basename(f);
                var outPath = path.resolve(path.dirname(f), renamed);

                fs.renameSync(f, outPath);
                grunt.log.write(f + ' ').ok(renamed);
            });
        });
    });
};