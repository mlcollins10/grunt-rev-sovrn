'use strict';

var fs = require('fs');
var path = require('path');

module.exports = function(grunt) {
    grunt.registerMultiTask('rev_sovrn', 'Prefix static asset file names with a version number', function() {
        grunt.log.write("starting rev sovrn 2 \n");
        grunt.log.write(this.files.versionSource + "\n");
        
        for(var key in this){
            grunt.log('t' + key + "\n");
        }
        
        for(var key in this.files){
            grunt.log.write("f: " + key + "\n");
        }
        
        for(var key in this.options){
            grunt.log.write("o: " + key + "\n");
        }
        
        var version = fs.readFileSync(this.versionSource, {encoding:"utf8"});
        grunt.log.write("versionsssssss");
        grunt.log.write("version2: " + version);
        grunt.log.write("version3: " + version.toString());
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