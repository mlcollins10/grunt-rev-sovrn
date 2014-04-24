'use strict';

var fs = require('fs');
var path = require('path');

module.exports = function(grunt) {
    grunt.registerMultiTask('rev_sovrn', 'Prefix static asset file names with a version number', function() {
        var fsOptions = {encoding: "utf8"};
        var options = grunt.task.current.options({'private': true});
        var version = JSON.parse(fs.readFileSync(options.versionSource, fsOptions));
        var version_num = version.release + "_rc" + version.version;
        var replaceFiles = options.replaceFiles;
        var pattern = options.pattern;
        
        this.files.forEach(function(filePair) {
            filePair.src.forEach(function(f) {
                var renamed = version_num + "." + path.basename(f);
                var outPath = path.resolve(path.dirname(f), renamed);
                fs.renameSync(f, outPath);
                grunt.log.write(f + ' ').ok(renamed);
            });
        });
        
        for(file in replaceFiles){
            var contents = fs.readFileSync(file, fsOptions);
            contents.replace(pattern, version_num);
            fs.writeFileSync(file, contents, fsOptions);
            grunt.log.write("Updated version in file: " + file + "\n");
        }
        
        version.version++;
        fs.writeFileSync(options.versionSource, JSON.stringify(version));
        grunt.log.write("Updated the version number in version config file.\n ");
        
        
        
    });
};