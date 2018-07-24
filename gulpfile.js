'use strict';

const gulp = require('gulp');
const gSass = require('gulp-sass');

const SASS_DIR = './scss';
const SASS_FILES_RE = SASS_DIR + '/**/*.scss';

const CSS_DIR = './css';


gulp.task('sass', function() {
    return gulp.src(SASS_FILES_RE)
        .pipe(gSass().on('error', gSass.logError))
        .pipe(gulp.dest(CSS_DIR));
});


gulp.task('sass:watch', function() {
    gulp.watch(SASS_FILES_RE, ['sass']);
});


gulp.task('default', ['sass']);
