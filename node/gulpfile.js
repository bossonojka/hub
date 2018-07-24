var gulp = require('gulp');
var htmltidy = require('gulp-htmltidy');
var autoprefixer = require('gulp-autoprefixer');
var csslint = require('gulp-csslint');

gulp.task('default', ['html', 'css']);

gulp.task('html', function(){
    return gulp.src('index.html')
    .pipe(htmltidy())
    .pipe(gulp.dest('build'));
});

gulp.task('css', function(){
    return gulp.src('clsstyle.css')
    .pipe(csslint())
    .pipe(csslint.formatter('compact'))
    .pipe(autoprefixer({
        browsers: ['last 5 versions'],
        cascade: false
    }))
    .pipe(gulp.dest('build'));
});