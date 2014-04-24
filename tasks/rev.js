'use strict';

var fs = require('fs');
var path = require('path');

module.exports = function(grunt) {
    grunt.registerMultiTask('rev_sovrn', 'Prefix static asset file names with a version number', function() {
        grunt.log.write("starting rev sovrn \n");
        var version =  fs.readFile(this.files.versionSource);
        this.files.forEach(function(filePair) {
            filePair.src.forEach(function(f) {
                var renamed = version + "." + path.basename(f);
                var outPath = path.resolve(path.dirname(f), renamed);

                fs.renameSync(f, outPath);
                grunt.log.write(f + ' ').ok(renamed);
            });
        });
    });
};