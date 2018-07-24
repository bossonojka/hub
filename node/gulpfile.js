var gulp = require('gulp');
var htmltidy = require('gulp-htmltidy');
var autoprefixer = require('gulp-autoprefixer');
var csslint = require('gulp-csslint');
var jshint = require('gulp-jshint');
var babel = require('gulp-babel');

gulp.task('default', ['html', 'css', 'js']);

gulp.task('html', function(){
    return gulp.src('src/index.html')
    .pipe(htmltidy())
    .pipe(gulp.dest('build'));
});

gulp.task('css', function(){
    return gulp.src('src/clsstyle.css')
    .pipe(csslint())
    .pipe(csslint.formatter('compact'))
    .pipe(autoprefixer({
        browsers: ['last 5 versions'],
        cascade: false
    }))
    .pipe(gulp.dest('build'));
});

gulp.task('js', function(){
    return gulp.src('src/main.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(gulp.dest('build'));
});

gulp.task('watch', function(){
    gulp.watch('src/*.html', ['html']);
    gulp.watch('src/*.css', ['css']);
    gulp.watch('src/*.js', ['js']);
});