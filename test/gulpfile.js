/*jshint node: true*/
//引入gulp及各种组件;
var gulp                    = require('gulp'),
    uglify                  = require('gulp-uglify'),
    minifyCSS               = require('gulp-minify-css'),
    sass                    = require('gulp-sass'),
    imagemin                = require('gulp-imagemin'),
    imageminJpegRecompress  = require('imagemin-jpeg-recompress'),
    imageminOptipng         = require('imagemin-optipng'),
    imageminGifsicle        = require('imagemin-gifsicle'),
    browserSync             = require('browser-sync').create();

//处理JS文件:压缩,然后换个名输出;
//命令行使用gulp script启用此任务;
gulp.task('script', function() {
    var srcScript = '../src/js/*.js',
        dstScript = '../dist/js';
    gulp.src(srcScript)
        .pipe(uglify())
        .pipe(gulp.dest(dstScript));
});

//处理CSS文件:压缩,然后换个名输出;
//命令行使用gulp css启用此任务;
gulp.task('css', function() {
    var srcCss = '../src/css/*.css',
        dstCSS = '../dist/css';
    gulp.src(srcCss)
        .pipe(minifyCSS())
        .pipe(gulp.dest(dstCSS));
});

//SASS文件输出CSS,天生自带压缩特效;
//命令行使用gulp scss启用此任务;
gulp.task('sass', function() {
    var srcSass = '../src/css/*.scss',
        dstSass = '../dist/css';
    gulp.src(srcSass)
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(gulp.dest(dstSass));
});

//图片压缩任务,支持JPEG、PNG及GIF文件;
//命令行使用gulp jpgmin启用此任务;
gulp.task('imgmin', function() {
    var srcImage = '../src/img/*.*',
        dstImage = '../dist/img';
    var jpgmin = imageminJpegRecompress(),
        pngmin = imageminOptipng({
            optimizationLevel: 3
        }),
        gifmin = imageminGifsicle();
    gulp.src(srcImage)
        .pipe(imagemin({
            use: [jpgmin, pngmin, gifmin]
        }))
        .pipe(gulp.dest(dstImage));
});

//把所有html页面扔进dist文件夹(不作处理);
//命令行使用gulp html启用此任务;
gulp.task('html', function(){
    var srcHtml = '../src/*.html',
        dstHtml = '../dist';
    gulp.src(srcHtml)
    .pipe(gulp.dest(dstHtml));
});

//服务器任务:以dist文件夹为基础,启动服务器;
//命令行使用gulp server启用此任务;
gulp.task('server', function() {
    browserSync.init({
        server: "../dist"
    });
});

//监控改动并自动刷新任务;
//命令行使用gulp auto启动;
gulp.task('auto', function() {
    gulp.watch('../src/js/*.js', ['script']);
    gulp.watch('../src/css/*.css', ['css']);
    gulp.watch('../src/css/*.scss', ['sass']);
    gulp.watch('../src/img/*.*', ['imgmin']);
    gulp.watch('../src/*.html',['html']);
    gulp.watch('../dist/**/*.*').on('change', browserSync.reload);
});

//gulp默认任务(集体走一遍,然后开监控);
gulp.task('default', ['script', 'css', 'sass', 'imgmin', 'html', 'server', 'auto']);
