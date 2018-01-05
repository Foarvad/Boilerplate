

//MAIN
const gulp        		= require('gulp'), //Gulp
browserSync    		    = require('browser-sync').create(), // Local server
//HTML
pug			 		    = require('gulp-pug'), // Pug(Jade) into HTML
//CSS
postcss			        = require('gulp-postcss'), // Sass sytnax in css
sourcemaps		        = require('gulp-sourcemaps'), //Deep analysis for file direction
// cssnext			    = require('postcss-cssnext'), // CSS4 syntax
autoprefixer			= require('autoprefixer'), // Autoprefixer for older browsers
stylus 				    = require('gulp-stylus'),
cssgrace			    = require('cssgrace'), // Insert IE hacks for css
mediaPacker		        = require('css-mqpacker'), // Gather all media queries together
cssshort      		    = require('postcss-short'), // Shortcuts for css properties
imageset			    = require('postcss-image-set-polyfill'), // Short-cuts for css
cssnano      		    = require('gulp-cssnano'), // CSS minification
//JAVASCRIPT
babel		 		    = require('gulp-babel'), // Convert ES6 syntax into ES5
uglify				    = require('gulp-uglify') // JavaScript minification
//OTHER
include 		 		= require('gulp-include') // Include other files into another
concat        			= require('gulp-concat'), // Get different files joined
cache        			= require('gulp-cached'), // Cache edited files
imagemin     		    = require('gulp-imagemin'), // Minify images
pngquant    			= require('imagemin-pngquant'), // Imagemin plugin for png
svgSprite    			= require("gulp-svg-sprites"), // Get sprite from pack of images
rename       		    = require('gulp-rename'), // Rename files
del          			= require('del'), // Remove files
notify				    = require('gulp-notify'), // Tell about error during task processing
absolutePath		    = require('path'); // Create file's path


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

 //MAIN MAIN MAIN



 //HTML HTML HTML


gulp.task('templates:single', function() {
    	return gulp.src(['src/html/**/*.pug', '!src/html/template/template.pug', '!src/html/layout/*.pug', '!src/html/components/*.pug'], { since: gulp.lastRun('templates:single') })
        .pipe(include())
        .pipe(pug({
            pretty: true
        }))
        .on('error', function(err) {
            notify({ title: 'template task error!' }).write(err.message);
            this.emit('end');
        })
        .pipe(gulp.dest("dist"));
});

gulp.task('templates:all', function() {

    return gulp.src('src/html/*.pug')
        .pipe(include())
        .pipe(pug({
            pretty: true
        }))
        .on('error', function(err) {
            notify({ title: 'templates task error!' }).write(err.message);
            this.emit('end');
        })
        .pipe(gulp.dest("dist"));
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

gulp.task('styles', function() {
	return gulp.src('src/styles/*.styl')
	.pipe(sourcemaps.init())
	.pipe(stylus())
	.pipe(postcss(processors))
    .on('error', function(err) {
        notify({ title: 'CSS task error!' }).write(err.message);
        this.emit('end');
    })
    .pipe(gulp.dest('dist/styles'))
})

//CSS CSS CSS

//JAVASCRIPT JAVASCRIPT

// ———————————————————————————————————————————
gulp.task('scripts:single', function() {
    return gulp.src('src/js/*.js')
        .pipe(include()).on('error', console.error)
        .pipe(babel({
            presets: ['es2015']
        }))
        .on('error', function(err) {
            notify({ title: 'scripts:single task error!' }).write(err.message);
            this.emit('end');
        })
        .pipe(gulp.dest("dist/js"));
});

gulp.task('scripts:all', function() {
    return gulp.src('src/js/*.js')
        .pipe(include()).on('error', console.error)
        .pipe(babel({
            presets: ['es2015']
        }))
        .on('error', function(err) {
            notify({ title: 'scripts:all task error!' }).write(err.message);
            this.emit('end');
        })
        .pipe(gulp.dest("dist/js"));
});

gulp.task('vendor:js', function() {
    return gulp.src(['src/vendor/jquery/**/*', 'src/vendor/**/!(jquery)*.js'])
    .pipe(concat('vendor.js'))
    // .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
})

gulp.task('vendor:css', function() {
    return gulp.src('src/vendor/**/*.css')
    .pipe(concat('vendor.css'))
    // .pipe(cssnano({
    //     zindex: false,
    //     autoprefixer: false,
    //     discardComments: { removeAll: true }
    // }))
    .pipe(gulp.dest('dist/styles'))
})

// —————————————————————————————————————————————
//JAVASCRIPT JAVASCRIPT


gulp.task('images', function() {
    return gulp.src('src/assets/img/*', {since: gulp.lastRun('images')})
        .pipe(cache(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('dist'))
})


gulp.task('assets', function() {
    return gulp.src(['src/assets/**', '!src/assets/img/*'], {since: gulp.lastRun('assets')})
        .pipe(gulp.dest('dist'))
})

// gulp.task('svgSprite', function () {
//     return gulp.src('src/img/sprite')
//         .pipe(svgSprite())
//         .pipe(gulp.dest("dist/img/sprite/done"));
// });


gulp.task('clean:dist', function() {
	return del('dist');
});

gulp.task('clean:public', function() {
    return del('public');
});


gulp.task('clear', function (callback) {
	return cache.clearAll();
});



//DEV //DEV //DEV

gulp.task('watch', gulp.series('clean:dist', gulp.parallel('templates:all', 'styles', 'scripts:all', 'vendor:css', 'vendor:js', 'assets'), function() {
    gulp.watch(['src/html/template/*.pug','src/html/include/**/*.pug'], gulp.series('templates:all', 'reload'));
    gulp.watch(['src/html/*.pug'], gulp.series('templates:single', 'reload'));
    gulp.watch('src/styles/**/*.*', gulp.series('styles', 'reload'));
    gulp.watch(['src/js/*.*', 'src/js/pages/**/*.*'], gulp.series('scripts:single', 'reload'));
    gulp.watch(['src/js/widgets/**/*.*', 'src/js/chunks/**/*.*'], gulp.series('scripts:all', 'reload'));
    gulp.watch(['src/assets/**/*.*', '!src/assets/img/**/*.*'], gulp.series('assets', 'reload'));
    gulp.watch('src/assets/img/**/*.*', gulp.series('images', 'reload'));
    gulp.watch('src/vendor/**/*.css', gulp.series('vendor:css', 'reload'));
    gulp.watch('src/vendor/**/*.js', gulp.series('vendor:js', 'reload'));
}));

gulp.task('dev', gulp.parallel('watch', 'browser-sync'));


//DEV //DEV //DEV


// BUILD  // BUILD  // BUILD  // BUILD


gulp.task('reduce:js', function() {
    return gulp.src('dist/js/**/*')
            .pipe(uglify())
            .pipe(gulp.dest('public/js'))
})

gulp.task('reduce:css', function() {
    return gulp.src('dist/styles/**/*')
            .pipe(cssnano({
                zindex: false,
                autoprefixer: false,
                discardComments: { removeAll: true }
            }))
            .pipe(gulp.dest('public/styles'))
})

gulp.task('build', gulp.series('clean:public', gulp.parallel('reduce:css', 'reduce:js'), function() {
    return gulp.src([
        'dist/!(styles|js)/**/*',
        'dist/*'
        ])
            .pipe(gulp.dest('public'))
}))

// BUILD  // BUILD  // BUILD  // BUILD
