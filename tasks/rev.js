'use strict';

var fs = require('fs');
var path = require('path');

module.exports = function(grunt) {
    grunt.registerMultiTask('rev_sovrn', 'Prefix static asset file names with a version number', function() {
        grunt.log.write("starting rev sovrn \n");

        for(var key in this){
            grunt.log.write(key + " \n");
        };
        
        this.files.forEach(function(filePair) {
            filePair.src.forEach(function(f) {
                var renamed = getVersion() + "." + path.basename(f);
                var outPath = path.resolve(path.dirname(f), renamed);

                fs.renameSync(f, outPath);
                grunt.log.write(f + ' ').ok(renamed);
            });
        });
        
        function getVersion(){
            return fs.readFile(this.files.versionSource);
        }
    });
};