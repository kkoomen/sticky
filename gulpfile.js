var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

var pkg = require('./package.json');
var banner = ['/**',
  ' * <%= pkg.name %> - <%= pkg.description %>',
  ' * @version v<%= pkg.version %>',
  ' * @link <%= pkg.homepage %>',
  ' * @license <%= pkg.license %>',
  ' */',
  ''].join('\n');

gulp.task('minify', function() {
  return gulp.src('sticky.jquery.js')
    .pipe(plugins.uglify({ mangle: true }))
    .pipe(plugins.rename({ suffix: '.min' }))
    .pipe(plugins.header(banner, { pkg : pkg } ))
    .pipe(gulp.dest('./'))
});

gulp.task('build', ['minify']);
gulp.task('default', ['minify']);
