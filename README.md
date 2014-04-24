# grunt-rev [![Build Status](https://travis-ci.org/cbas/grunt-rev.png)](https://travis-ci.org/cbas/grunt-rev)

> Static file asset revisioning through content hashing

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

## The "rev" task

Use the **rev** task together with [yeoman/grunt-usemin](https://github.com/yeoman/grunt-usemin) for cache busting of static files in your app. This allows them to be cached forever by the browser.

### Overview
In your project's Gruntfile, add a section named `rev` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  rev_sovrn: {
    options: {
      versionSource: "/path/to/versionfile"
    },
    dist: {
      files: [{
        src: [
          'img/**/*.{jpg,jpeg,gif,png}',
          'fonts/**/*.{eot,svg,ttf,woff}'
        ]
      }]
    }
  },
})
```

### Options

#### options.versionSource
Type: `String`

The path of the file containing the version string.

## Release History
_(Nothing yet)_
