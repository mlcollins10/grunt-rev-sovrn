# grunt-rev-sovrn

> Static file cache-busting and versioning, specifically for sovrn Holdings, Inc.

## Getting Started
_If you haven't used [grunt][] before, be sure to check out the [Getting Started][] guide._

From the same directory as your project's [Gruntfile][Getting Started] and [package.json][], install this plugin with the following command:

```bash
npm install git://github.com/mlcollins10/grunt-rev-sovrn.git --save-dev
```

Once that's done, add this line to your project's Gruntfile:

```js
grunt.loadNpmTasks('grunt-rev-sovrn');
```

If the plugin has been installed correctly, running `grunt --help` at the command line should list the newly-installed plugin's task or tasks. In addition, the plugin should be listed in package.json as a `devDependency`, which ensures that it will be installed whenever the `npm install` command is run.

[grunt]: http://gruntjs.com/
[Getting Started]: https://github.com/gruntjs/grunt/blob/devel/docs/getting_started.md
[package.json]: https://npmjs.org/doc/json.html

### Overview
In your project's Gruntfile, add a section named `rev_sovrn` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  rev_sovrn: {
    dist: {
      files: {
        src: [
          'img/**/*.{jpg,jpeg,gif,png}',
          'fonts/**/*.{eot,svg,ttf,woff}'
        ]
      },
      options: {
        versionSource: "/path/to/versionfile",
        replaceFiles: [ "/some/file/toReplace", "another/file/toReplace" ],
        versionPattern: "@@@@version@@@"
      }
    }
  },
})
```

### Options

#### options.versionSource
Type: `String`

The path of the file containing the version string.

#### options.relpaceFiles
Type: `List`

List of file paths where a string replacement should occur

#### options.versionPattern
Type: `String`

The needle to search for when replacing with version number

## Release History
_(Nothing yet)_
