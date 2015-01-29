var gulp = require('gulp'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify');

gulp.task('default', ['js'], function () {
	gulp.watch('./*.js', ['js']);
});

gulp.task('js', function () {
	gulp.src('./openWeather.js')
		.pipe(concat('openWeather.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./'));
});