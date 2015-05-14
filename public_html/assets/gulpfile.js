/* global require */
'use strict';

// Load plugins
var gulp = require( 'gulp' ),
  sass = require( 'gulp-ruby-sass' ),
  autoprefixer = require( 'gulp-autoprefixer' ),
  minifycss = require( 'gulp-minify-css' ),
  uglify = require( 'gulp-uglifyjs' ),
  imagemin = require( 'gulp-imagemin' ),
  rename = require( 'gulp-rename' ),
  clean = require( 'gulp-clean' );

// Styles
gulp.task( 'styles', function () {
  return gulp.src( 'src/css/main.sass' )
    .pipe( sass( {
      style: 'expanded',
    } ) )
    .pipe( autoprefixer( 'last 15 version' ) )
    .pipe( gulp.dest( 'dist/css' ) )
    .pipe( rename( {
      suffix: '.min'
    } ) )
    .pipe( minifycss() )
    .pipe( gulp.dest( 'dist/css' ) );
} );

// Scripts
gulp.task( 'scripts', function () {
  return gulp.src( 'src/js/*.js' )
    .pipe( uglify( 'main.min.js', {
      outSourceMap: true,
      output: {
        source_map: {
          file: 'main.min.js.map',
          root: '/assets'
        }
      }
    } ) )
    .pipe( gulp.dest( 'dist/js' ) );
} );

// Images
gulp.task( 'images', [ 'cleanimages' ], function () {
  return gulp.src( 'src/img/**/*' )
    .pipe( imagemin( {
      optimizationLevel: 3,
      progressive: true,
      interlaced: true,
      pngquant: true
    } ) )
    .pipe( gulp.dest( 'dist/img' ) );
} );

// Clean
gulp.task( 'clean', function () {
  return gulp.src( [ 'dist/css', 'dist/js' ], {
      read: false
    } )
    .pipe( clean() );
} );

gulp.task( 'cleanimages', function () {
  return gulp.src( 'dist/img', {
      read: false
    } )
    .pipe( clean() );
} );

gulp.task( 'main', [ 'styles', 'scripts' ] );

// Default task
gulp.task( 'default', [ 'clean' ], function () {
  gulp.run( 'main' );
} );