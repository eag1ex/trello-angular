// Karma configuration
// Generated on Sat Jun 11 2016 10:00:21 GMT-0500 (CDT)
/**
 * tutorial 
 * https://www.webcodegeeks.com/javascript/angular-js/angularjs-unit-testing-karma-jasmine/
 * repo
 * https://github.com/mbrown333/unit-testing-demo-book-inventory-app
 * 
 * component controller
 * http://stackoverflow.com/questions/38094972/angular-1-5-unit-test-controller-that-requires-parent-components-controller#38878103
 * http://www.codelord.net/2017/01/09/unit-testing-angular-components-with-%24componentcontroller/
 * https://puigcerber.com/2016/02/07/how-to-test-angular-1-5-components/
 */


module.exports = function (config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'public/bower_components/angular/angular.js',
      "public/bower_components/angular-sanitize/angular-sanitize.js",
      "public/bower_components/angular-mocks/angular-mocks.js",
      "public/bower_components/angular-bootstrap/ui-bootstrap-tpls.js",
      'public/bower_components/jquery/dist/jquery.js',
      'public/bower_components/tether/dist/js/tether.js',
      'public/bower_components/bootstrap/dist/js/bootstrap.js',
      "public/bower_components/angular-animate/angular-animate.js",
      'public/bower_components/angular-ui-router/release/angular-ui-router.js',
      "public/bower_components/angular-drag-and-drop-lists/angular-drag-and-drop-lists.js",



      'public/dist/js/app.js',
      'public/dist/js/app.core.js',
      'public/dist/js/app.layout.js',
      'public/dist/js/app.main.js',
      "public/dist/js/app.ticket.modal.js",
      "public/dist/js/email.form.js",
      'public/dist/js/mock.data.js',
      'public/dist/js/dataservice.js',
      'public/dist/js/httpbackedMockService.js',
      "public/dist/js/project.name.js",
      'public/dist/js/templates.js',
      'tests/**/*.spec.js',
      'tests/*.spec.js',

      // templates
      'src/app/scripts/*.html',
      'src/app/scripts/**/*.html'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
       'src/app/scripts/*.html': 'ng-html2js',
       'src/app/scripts/**/*.html': 'ng-html2js'
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS', 'Chrome', 'Chrome_without_security'],

    // you can define custom flags 
    customLaunchers: {
      Chrome_without_security: {
        base: 'Chrome',
        flags: ['--disable-web-security']
      }
    },

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
