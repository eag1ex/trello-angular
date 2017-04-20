var gulp = require('gulp');
rename = require("gulp-rename");
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var wiredep = require('wiredep').stream;
var inject = require('gulp-inject');
var del = require('del');
var mainBowerFiles = require('main-bower-files');
var typescript = require('gulp-typescript');
var tsProject = typescript.createProject('tsconfig.json', { removeComments: false });
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var filter = require('gulp-filter');
var concat = require('gulp-concat');
var csso = require('gulp-csso');
var wiredep = require('wiredep').stream;
var gutil = require('gulp-util'); http://localhost:3000/
var minifyHtml = require('gulp-htmlmin');
var angularTemplatecache = require('gulp-angular-templatecache');

var port = process.env.PORT || 3000;

var app_path = './src/app';
var dist_path = './public/dist'


//v4-alpha
// https://v4-alpha.getbootstrap.com/
//https://github.com/twbs/bootstrap/releases/
// https://fezvrasta.github.io/bootstrap-material-design/#radio-button
// Ctrl + K + F 


gulp.task('clean', function (done) {
  del(['./public/dist/'], done);
});



gulp.task('styles-new', function () {


 // move fonts dit  manyally
  gulp.src(app_path + '/scss/fonts/*.*')
    .pipe(gulp.dest(dist_path + '/styles/fonts'));   

  var injectAppFiles = gulp.src([app_path + '/scss/layout.scss'], { read: false });
  var injectAppFonts = gulp.src([app_path + '/scss/fonts.scss'], { read: false });
  var injectGlobalFiles = gulp.src(app_path + '/scss/global.variables.scss', { read: false });


  function transformFilepath(filepath) {
    return '@import "' + filepath + '";';
  }

  var injectAppFontOptions = {
    transform: transformFilepath,
    starttag: '// inject:Fonts',
    endtag: '// endinject',
    addRootSlash: false
  };

  var injectAppOptions = {
    transform: transformFilepath,
    starttag: '// inject:app',
    endtag: '// endinject',
    addRootSlash: false
  };

  var injectGlobalOptions = {
    transform: transformFilepath,
    starttag: '// inject:global',
    endtag: '// endinject',
    addRootSlash: false
  };

  var wireupConf = {
    'ignorePath': '../public/',
    exclude: ['sass-bem', 'bootstrap-material-design', 'bootstrap-sass'],//, 'bootstrap'
    directory: './public/bower_components',
  };

  return gulp.src(app_path + '/scss/main.scss')
    .pipe(wiredep())
    .pipe(inject(injectGlobalFiles, injectGlobalOptions))
    .pipe(inject(injectAppFonts, injectAppFontOptions))
    .pipe(inject(injectAppFiles, injectAppOptions))
    .pipe(sass())
    .pipe(csso())
    .pipe(gulp.dest(dist_path + '/styles'));

});


gulp.task('vendor-js', function () {
  var bowerDebOrder = require('./bower.json').dependencies;

  return gulp.src(mainBowerFiles(), { base: dist_path + '/bower_components' })
    .pipe(filter('**/*.js'))
    .pipe(concat('vendors.js'))
    .pipe(uglify())
    .pipe(gulp.dest(dist_path + '/js'));
});


gulp.task('typescript', function () {

  var tsSources = [
    app_path + '/scripts/**/*.ts'];

  return gulp.src(tsSources)
    .pipe(tsProject())
    .pipe(rename({ dirname: '' }))// remove dir structure copy
    .pipe(sourcemaps.init())
    //.pipe(gulpif(env==='production', uglify() ))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(dist_path + '/js'))
})


gulp.task('angular-templates', function () {

  var templateCache = {
    file: 'templates.js',
    options: {
      module: 'app.core',
      root: 'dist/js',
      standAlone: false
    }
  }
  return gulp.src(app_path + '/scripts/**/*.html')
    .pipe(rename({ dirname: '' }))
    .pipe(minifyHtml({ collapseWhitespace: true }))
    .pipe(angularTemplatecache(
      templateCache.file,
      templateCache.options
    ))
    .pipe(gulp.dest(dist_path + '/js'));
});



gulp.task('ts-js-temp', ['typescript', 'angular-templates'], function (done) {
  browserSync.reload();
  done();
});

gulp.task('style-change', ['styles-new'], function (done) {
  browserSync.reload();
  done();
});



gulp.task('watch', function () {
  gulp.watch(app_path + "/scripts/**/*.ts", ['ts-js-temp']);
  gulp.watch(app_path + "/scss/*.scss", ['style-change']);
  gulp.watch(app_path + "/scripts/**/*.html", ['ts-js-temp']);
});

gulp.task('wiredep', ['styles-new', 'typescript', 'angular-templates'], function () {

  var injectFiles = gulp.src([dist_path + '/styles/*.css',
  dist_path + '/js/*.js',
  '!' + dist_path + '/js/app.js',
  '!' + dist_path + '/js/app.core.js'
  ]);
  // dist_path + '/js/vendors.js',
  var injectOptions = {
    addRootSlash: false,
    ignorePath: ['src', 'public']
  };

  var wireupConf = {
    'ignorePath': '../public/',
    exclude: ['sass-bem', 'bootstrap-sass'],
    directory: './public/bower_components',
  };

  return gulp.src('src/index.html')
    .pipe(wiredep(wireupConf))
    .pipe(inject(gulp.src(dist_path + '/js/app.js', { read: false }),
      { starttag: '<!-- inject:app:{{ext}} -->', addRootSlash: false, ignorePath: ['src', 'public'] }))

    .pipe(inject(gulp.src(dist_path + '/js/app.core.js', { read: false }),
      { starttag: '<!-- inject:appcore:{{ext}} -->', addRootSlash: false, ignorePath: ['src', 'public'] }))

    .pipe(inject(injectFiles, injectOptions))
    .pipe(gulp.dest('./public'))
});

gulp.task('all', ['clean'], function () {
  gulp.start('wiredep', function () {
    gutil.log('-------------------------');
    gutil.log('Ready!', 'local:', gutil.colors.magenta('http:localhost:' + port));
    gutil.log('-------------------------');
  });
});


gulp.task('default', ['all', 'watch'], function () {

  var bSync = function () {
    browserSync.init({
      server: {
        port: port,
        open: false,
        baseDir: './public',
        middleware: function (req, res, next) {
          next();
        },
      }
    })
  }

  setTimeout(function () {
    bSync();
  }, 800)

});