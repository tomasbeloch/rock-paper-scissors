var gulp = require('gulp'),
    sass = require('gulp-sass'),
    minifycss = require('gulp-minify-css'),
    //uglify = require('gulp-uglify'),
    //source = require('vinyl-source-stream'),
    //buffer = require('vinyl-buffer'),
    //sourcemaps = require('gulp-sourcemaps'),
    browserify = require('browserify'),
    transform = require('vinyl-transform'),
    livereload = require('gulp-livereload'),
    del = require('del'),

    paths = {
        scriptsSrc: './app/**/*.js',
        scriptsDest: './www/build/js',
        stylesSrc: './www/res/scss/**/*.scss',
        stylesDest: './www/build/css',
        html: 'www/**/*.html'
    };

// Styles
gulp.task('styles', function() {
    return gulp.src(paths.stylesSrc)
        .pipe(sass())
        .pipe(minifycss())
        .pipe(gulp.dest(paths.stylesDest));
});

// Browserify task
gulp.task('browserify', function () {

    var browserified = transform(function(filename) {
        return browserify(filename)
            .require(filename, { expose: 'app'})
            .bundle()
            //.pipe(source('./app.min.js'))
            //.pipe(buffer())
            //.pipe(sourcemaps.init({loadMaps: true}))
            //.pipe(uglify())
            //.pipe(sourcemaps.write('./'));
    });
    return gulp.src('./app/app.main.js')
        .pipe(browserified)
        .pipe(gulp.dest(paths.scriptsDest));
});

// Scripts task
gulp.task('scripts', ['browserify']);

// Clean task
gulp.task('clean', function(cb) {
    del([
        paths.stylesDest,
        paths.scriptsDest
    ], cb);
});

// Watch task
gulp.task('watch', function() {
    livereload.listen();
    gulp.watch(paths.stylesSrc, ['styles']);
    gulp.watch(paths.scriptsSrc, ['scripts']);

    gulp.watch([
        paths.scriptsSrc,
        paths.stylesSrc,
        paths.html
    ]).on('change', livereload.changed);
});

// Default task
gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts');
});
