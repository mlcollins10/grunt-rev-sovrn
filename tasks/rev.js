'use strict';

var fs = require('fs');
var path = require('path');

module.exports = function(grunt) {
    grunt.registerMultiTask('rev_sovrn', 'Prefix static asset file names with a version number', function() {
        var fsOptions = {encoding: "utf8"};
        var options = grunt.task.current.options({'private': true});
        var versionNum = fs.readFileSync(options.versionSource, fsOptions).trim();
        var replaceFiles = options.replaceFiles;
        var versionPattern = options.versionPattern;
        
        this.files.forEach(function(filePair) {
            filePair.src.forEach(function(f) {
                var renamed = versionNum + "." + path.basename(f);
                var outPath = path.resolve(path.dirname(f), renamed);
                fs.renameSync(f, outPath);
                grunt.log.write(f + ' ').ok(renamed);
            });
        });
        
        for(var file in replaceFiles){
            grunt.log.write("Updating file: " + replaceFiles[file] + "\n");
            var contents = fs.readFileSync(replaceFiles[file], fsOptions);
            contents = contents.replace(versionPattern, versionNum);
            fs.writeFileSync(replaceFiles[file], contents, fsOptions);
            grunt.log.write("Updated version in file: " + replaceFiles[file] + "\n");
        }

//        version.version++;
//        fs.writeFileSync(options.versionSource, JSON.stringify(version));

        grunt.log.writeln("Finished sovrn grunt rev task");
    });
};