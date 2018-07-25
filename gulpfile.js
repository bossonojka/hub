var gulp = require('gulp');
var htmltidy = require('gulp-htmltidy');
var babel = require('gulp-babel');

gulp.task('default', ['html', 'js']);

gulp.task('html', function(){
    gulp.src('forGulp/*.html')
    .pipe(htmltidy())
    .pipe(gulp.dest('build'));
});

gulp.task('js', function(){
    gulp.src('forGulp/*.js')
    .pipe(babel())
    .pipe(babel({presets:['es2015']}))
    .pipe(gulp.dest('build'));
});

gulp.task('watch', function(){
    gulp.watch('forGulp/main.js', ['js']);
})