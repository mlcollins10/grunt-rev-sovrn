'use strict';

var fs = require('fs');
var path = require('path');

module.exports = function(grunt) {
    grunt.registerMultiTask('rev_sovrn', 'Prefix static asset file names with a version number', function() {
        var fsOptions = {encoding: "utf8"};
        var options = grunt.task.current.options({'private': true});
        var version = JSON.parse(fs.readFileSync(options.versionSource, fsOptions));
        var versionNum = version.release + "_rc" + version.version;
        var replaceFiles = options.replaceFiles;
        var versionPattern = options.versionPattern;
        var modalPattern = options.modalPattern;
        var environment = options.env;
        
        function getCompiledModalMarkup(versionNumber){
            return '<div style="position:absolute;top:0px;left:280px;border:1px solid silver;background:#eee;z-index:1000;">' 
                    + versionNumber + '</div>';
        }
        
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
            grunt.log.write(contents + "\n");
            contents.replace(versionPattern, versionNum);
            grunt.log.write("environment detected: " + environment + "\n");
            if(environment === "qa" || environment === "dev"){
                grunt.log.write("doing qa tasks\n");
                grunt.log.write("modal patterh: " + modalPattern + "\n");
                contents.replace(modalPattern, getCompiledModalMarkup(versionNum));
            }else{
                grunt.log.write("doing prod tasks\n");
                contents.replace(modalPattern, "");
            }
            fs.writeFileSync(replaceFiles[file], contents, fsOptions);
            grunt.log.write("Updated version in file: " + replaceFiles[file] + "\n");
        }
        
        
        
        version.version++;
        fs.writeFileSync(options.versionSource, JSON.stringify(version));
        grunt.log.write("Updated the version number in version config file.\n ");
        
        
        
    });
};