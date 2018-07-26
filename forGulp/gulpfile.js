var gulp = require("gulp");
var jshint = require("gulp-jshint");

gulp.task('default', ['js']);

gulp.task('js', function(){
    gulp.src('src/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(gulp.dest('build'));
});