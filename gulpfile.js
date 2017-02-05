var gulp = require('gulp');
var notify = require('gulp-notify');
var browserSync = require('browser-sync').create();
var responsive = require('gulp-responsive');
var sass = require('gulp-sass')
var glob = require('glob')
var googleWebFonts = require('gulp-google-webfonts');
var browserify = require('browserify');
var tap = require('gulp-tap');
var browserify = require('browserify');
var tap = require('gulp-tap');
var envify = require('envify/custom');
var gutil = require('gulp-util');

var options = {
	fontsDir: './dist/fonts',
	cssDir: './src/scss',
	cssFilename: '_fonts.scss'
};


var sizes = {
    VERY_SMALL: 20,
    SMALL : 200,
    MEDIUM : 500,
    LARGE : 800
}

var watchers=[
    {
        tasks: ['getCSS'],
        trigger: './src/scss/*.scss'
    },{
        tasks: ['reloadBrowser'],
        trigger: ['*.html','./dist/js/*.js']
    },
    {
        tasks: ['getFonts'],
        trigger: ['./fonts.list'] 
    },
    {
        tasks: ['getJavascript'],
        trigger: './src/js/*.js'
    }
]

function errorHandler(error){
    notify().write(error)
}

gulp.task('default', ['getCSS', 'getFonts', 'getJavascript'], function(){
    notify().write("Basic tasks done");
})

gulp.task('reloadBrowser', function(){
    browserSync.reload(); 
    notify().write("Browser reloaded");
})

function initWatchers(){
    for(var index in watchers){
        watcher = watchers[index]
        gulp.watch(watcher.trigger,watcher.tasks)
    }
}

gulp.task('dev', ['default'], function(){

    browserSync.init({
        server : './'
    })

    initWatchers();
})

gulp.task('withSparrest', ['default'], function(){

    browserSync.init({
        proxy: "127.0.0.1:8000"
    })

    initWatchers();
})

gulp.task('prod', ['default'], function(){
   
})

gulp.task('getCSS', function(){

    gulp.src(['./src/scss/fnews.scss'])
        .pipe(
            sass(
                { includePaths: glob.sync('./node_modules/*/scss')} // with this you can import any scss framework directly in your own scss file with an @import directive :D (time lost with this shit: 2 hours)
            ).on('error', errorHandler))
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.stream())
        .pipe(notify('CSS Updated'))
})

gulp.task('getJS', function(){
    notify().write('Working getJS')
    console.log('Working getJS');
    gulp.src('./src/js/fnews.js')
})

gulp.task('getFonts', function() {
  gulp.src('./node_modules/font-awesome/fonts/*')
    .pipe(gulp.dest('./dist/fonts'));


	gulp.src('./fonts.list')
		.pipe(googleWebFonts(options).on('error', function(error){
            return notify().write(error);
        }))
		.pipe(gulp.dest('./'))
		;

});

gulp.task("getJavascript", function(){
    gulp.src('./src/js/fnews.js')
    .pipe(tap(function(file){
        file.contents = browserify(file.path, { debug:true })
        .transform(envify(gutil.env))  // nos permite leer variables de entorno con process.env
        .bundle()
        .on('error', function(error){
            return notify().write(error);
        });
    }))
    .pipe(gulp.dest('./dist/js/'))
    .pipe(notify("JS Updated"));
});

gulp.task('responsive', function () {
    return gulp.src(['uploads/**/**/*[0-9]{.jpg,.png}','uploads/**/**/*main{.jpg,.png}'])
          .pipe(responsive(
                {
                    '**/**/*{.jpg,.png}': [
                        {
                            width: sizes.VERY_SMALL,
                            rename: { suffix: '_small' },
                        }, 
                        {
                            width: sizes.SMALL,
                            rename: { suffix: '_small' },
                        }, 
                        {
                            width: sizes.MEDIUM,
                            rename: { suffix: '_medium' },
                        }, 
                        {
                            width: sizes.LARGE,
                            rename: { suffix: '_large' },
                        }
                    ]
                }, 
                {
                    quality: 70,
                    withMetadata: false,
                    errorOnEnlargement: false //Because if you put smaller image than specify in their size, stops conversion
                }))
          .on('error',function(error){
              console.log(error)
          })
          .pipe(gulp.dest('uploads/'))
  });

