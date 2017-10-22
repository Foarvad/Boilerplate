

//MAIN
const gulp        		= require('gulp'), //Gulp
browserSync    		= require('browser-sync'), // Local server
//HTML
pug			 		= require('gulp-pug'), // Pug(Jade) into HTML
//CSS
postcss			= require('gulp-postcss'), // Sass sytnax in css
sourcemaps		= require('gulp-sourcemaps'), //Deep analysis for file direction
// cssnext			= require('postcss-cssnext'), // CSS4 syntax
autoprefixer			= require('autoprefixer'), // Autoprefixer for older browsers
stylus 				= require('gulp-stylus'),
cssgrace			= require('cssgrace'), // Insert IE hacks for css
mediaPacker		= require('css-mqpacker'), // Gather all media queries together
cssshort      		= require('postcss-short'), // Shortcuts for css properties
imageset			= require('postcss-image-set-polyfill'), // Short-cuts for css
cssnano      		= require('gulp-cssnano'), // CSS minification
//JAVASCRIPT
babel		 		= require('gulp-babel'), // Convert ES6 syntax into ES5
uglify				= require('gulp-uglify') // JavaScript minification
//OTHER
include 		 		= require('gulp-include') // Include other files into another
concat        			= require('gulp-concat'), // Get different files joined
cache        			= require('gulp-cached'), // Cache edited files
imagemin     		= require('gulp-imagemin'), // Minify images
pngquant    			= require('imagemin-pngquant'), // Imagemin plugin for png
svgSprite    			= require("gulp-svg-sprites"), // Get sprite from pack of images
rename       		= require('gulp-rename'), // Rename files
del          			= require('del'), // Remove files
notify				= require('gulp-notify'), // Tell about error during task processing
absolutePath		= require('path'); // Create file's path


 //MAIN MAIN MAIN

gulp.task('browser-sync', function() {
	browserSync.init({
		server: 'dist',
		ghostMode: false,
		open: false
	});
});

gulp.task('reload', function(done) {
    browserSync.reload();
    done();
});


gulp.task('scripts', function() {
	return gulp.src(['src/libs/jquery/**/*', 'src/libs/**/!(jquery)*.js'])
		.pipe(concat('libs.min.js')) // Собираем их в кучу в новом файле libs.min.js
		.pipe(gulp.dest('dist/js'));
});

gulp.task('css-libs', function() {
	return gulp.src('src/libs/**/*.css') // Выбираем файл для минификации
		.pipe(concat('libs.min.css'))
		.pipe(cssnano()) // Сжимаем // Добавляем суффикс .min
		.pipe(gulp.dest('dist/styles')); // Выгружаем в папку src/css
});

gulp.task('movesub', function() {
	return gulp.src(['src/**/*', '!src/{html,html/**}', '!src/{styles,styles/**}', '!src/{js,js/**}', '!src/{libs,libs/**}'])
	.pipe(gulp.dest('dist'))
})

 //MAIN MAIN MAIN




 //HTML HTML HTML

gulp.task('pug', function() {
	return gulp.src('src/html/*.pug')
	.pipe(pug({
		pretty: true
	}))
	.on('error', function(err) {
	      notify({ title: 'Pug task error!' }).write(err.message);
	      this.emit('end');
      })
	.pipe(gulp.dest('dist'))
	.pipe(browserSync.reload({stream: true}))
});

 //HTML HTML HTML




//CSS CSS CSS
var processors = [	
	cssshort,
	imageset,
	autoprefixer({
		browsers: "last 15 versions, > 1%, ie 8, ie 7"
	})
]

gulp.task('сss', function () {

	return gulp.src('src/styles/*.styl')
	.pipe(sourcemaps.init())
	.pipe(stylus())
	.pipe(postcss(processors) )
	.on('error', function(err) {
          notify({ title: 'CSS task error!' }).write(err.message);
          this.emit('end');
      })
	.pipe(gulp.dest('dist/styles'))
	.pipe(browserSync.reload({stream: true}))
})

//CSS CSS CSS

//JAVASCRIPT JAVASCRIPT

gulp.task('fileIncludeJs', function() {
	return gulp.src('src/js/*.js')
	.pipe( cache('javascript') )
	.pipe(babel({
		presets: ['es2015']
	}))
	.on('error', function(err) {
	    notify({ title: 'Javascript task error!' }).write(err.message);
	    this.emit('end');
	})
	.pipe(include())
	.pipe(gulp.dest('dist/js'))
	.pipe(browserSync.reload({stream: true}))
});

//JAVASCRIPT JAVASCRIPT





// IMG IMG IMG

gulp.task('svgSprite', function () {
    return gulp.src('src/img/sprite')
        .pipe(svgSprite())
        .pipe(gulp.dest("dist/img/sprite/done"));
});

gulp.task('images', function() {
	return gulp.src('src/img/**/*')
	.pipe(gulp.dest('dist/img'))
})



// IMG IMG IMG




//DEV //DEV //DEV

gulp.task('watch', ['browser-sync', 'clean', 'movesub', 'сss', 'pug', 'fileIncludeJs', 'css-libs', 'scripts'], function() {
	gulp.watch('src/styles/**/*.styl', ['сss']);
	gulp.watch('src/html/**/*.pug', ['pug']);
	gulp.watch('src/js/**/*.js', ['fileIncludeJs']);
	gulp.watch('src/img/**/*, [images]')
});

gulp.task('clean', function() {
	return del.sync('dist'); // Удаляем папку dist перед сборкой
});

gulp.task('clear', function (callback) {
	return cache.clearAll();
});

//DEV //DEV //DEV


//BUILD //BUILD //BUILD

gulp.task('cleanBuild', function() {
	return del.sync('public'); // Удаляем папку dist перед сборкой
});

//BUILD //BUILD //BUILD

gulp.task('img', function() {
	return gulp.src('dist/img/**/*') // Берем все изображения из src
		.pipe(cache(imagemin({  // Сжимаем их с наилучшими настройками с учетом кеширования
			interlaced: true,
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		})))
		.pipe(gulp.dest('public/img')); // Выгружаем на продакшен
});


gulp.task('build', ['cleanBuild', 'img'], function() {


	var buildCss = gulp.src(['dist/styles/*.css', '!dist/styles/libs.min.css'])
	.pipe(postcss([mediaPacker,cssgrace]))
	.pipe(cssnano({
		discardComments: {
			removeAll: true
		}
	}))
	.pipe(gulp.dest('public/styles'))

	var buildCssLibs = gulp.src('dist/styles/libs.min.css')
	.pipe(cssnano({
		discardComments: {
			removeAll: true
		}
	}))
	.pipe(gulp.dest('public/styles'))


	var buildJs = gulp.src('dist/js/**/*.js')
	.pipe(uglify())
	.pipe(gulp.dest('public/js'))


	var moveothers = gulp.src(['dist/**/*', '!dist/{styles,styles/**}', '!dist/{js,js/**}', '!dist/{img,img/**}'])
	.pipe(gulp.dest('public'))

});