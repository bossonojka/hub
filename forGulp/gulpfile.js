var gulp = require("gulp");
var jshint = require("gulp-jshint");
var babel = require("gulp-babel");

gulp.task('default', ['js']);

gulp.task('js', function(){
    gulp.src('src/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(babel())
    .pipe(babel({
        presets: ['babel-preset-es2015']
    }))
    .pipe(gulp.dest('build'));
});