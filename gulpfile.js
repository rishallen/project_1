'use strict';

const gulp = require('gulp'),
	connect  = require('gulp-connect'),
	concat   = require('gulp-concat'),
	sass     = require('gulp-sass'),
	del      = require('del'),
	uglify   = require('gulp-uglify'),
	cleanCSS = require('gulp-clean-css'),
	imageMin = require('gulp-imagemin'),
	strip    = require('gulp-strip-comments'),
	paths    = {
		neither:    ['public/*.ejs', 'public/**/*.ejs'],
		styles:		  ['public/css/**/*.scss', 'public/css/*.scss'],
		styleSheet: ['public/css/main.scss'],
		scripts:    ['public/js/*.js','public/js/components/*.js'],
		images:     ['public/img/*.jpg', 'public/img/*.svg', 'public/img/**/*'],
		ejs:        ['public/*.ejs', 'public/**/*.ejs']
	};
	// vendor = {
	// 	js: ['src/js/vendor/modernizr.js', 'src/js/vendor/picturefill.js']
	// };

var flags = require('yargs').argv;

gulp.task('start',['clean', 'build','serve','watch']);
gulp.task('watch',['watch:styles','watch:scripts','watch:neither','watch:ejs']);
gulp.task('build',['build:styles', 'build:scripts', 'build:ejs', 'copy:images']);

gulp.task('clean',function(){
	if(flags.prod){
		del.sync('build/**');
	}
});

gulp.task('build:styles',function(){
	var dest = flags.prod?'public/css':'build/css';
	var task = gulp.src(paths.styleSheet)
	.pipe(sass({includePaths: require('node-sass').includePaths}).on('error', sass.logError));
	if(flags.prod){
		task = task.pipe(cleanCSS())
		.pipe(concat('styles.min.css'));
	}
	task = task.pipe(gulp.dest(dest))
	.pipe(connect.reload());
	return task;
});

gulp.task('build:scripts',function(){
	var dest = flags.prod?'public/js':'build/js';
	var name = flags.prod?'main.min.js':'main.js';
	var task = gulp.src(paths.scripts)
	.pipe(concat(name, {newline:''}));
	if(flags.prod){
		task = task.pipe(strip())
		.pipe(uglify({mangle:true}));
	}
	task = task.pipe(gulp.dest(dest))
	.pipe(connect.reload());
	return task;
});


// gulp.task('styles', function() {
//     gulp.src('sass/**/*.scss')
//         .pipe(sass().on('error', sass.logError))
//         .pipe(gulp.dest('./css/'))
// });

gulp.task('build:ejs',function(){
	var dest = flags.prod?'public':'build';
	var task = gulp.src(paths.ejs)
	.pipe(gulp.dest(dest))
	.pipe(connect.reload());
	return task;
});

gulp.task('build:ejs',function(){
	var dest = flags.prod?'public':'build';
	var task = gulp.src(paths.ejs)
	.pipe(gulp.dest(dest))
	.pipe(connect.reload());
	return task;
});

gulp.task('copy:images',function(){
	var dest = flags.prod?'public/img':'build/img';
	var task = gulp.src(paths.images)
	.pipe(imageMin());
	task = task.pipe(gulp.dest(dest))
	.pipe(connect.reload());
	return task;
});

gulp.task('reload',function(){
	return gulp.src(paths.neither)
	.pipe(connect.reload());
});

gulp.task('serve', function(){
	var base = flags.prod?'public/':'build/';
	var fallback = flags.prod?'public/layouts.ejs':'build/layouts.ejs';
	connect.server({
		root:'build',
		port:'3030',
		livereload:true,
		fallback: fallback
	})
});

// ==========================================================
gulp.task('watch:styles', function(){
	gulp.watch(paths.styles, ['build:styles'])
});


gulp.task('watch:scripts', function(){
	gulp.watch(paths.scripts, ['build:scripts'])
});

gulp.task('watch:ejs', function(){
	gulp.watch(paths.ejs, ['build:ejs'])
});

// gulp.task('watch:scss', function(){
// 	gulp.watch(paths.scss, ['build:scss'])
// });

gulp.task('watch:neither', function(){
	gulp.watch(paths.neither, ['reload'])
});
