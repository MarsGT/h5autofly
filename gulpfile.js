/*jshint node: true*/
//引入gulp及各种组件;
var gulp                        = require('gulp'),
    uglify                      = require('gulp-uglify'),
    minifyCSS                   = require('gulp-minify-css'),
    sass                        = require('gulp-sass'),
    imagemin                    = require('gulp-imagemin'),
    imageminJpegRecompress      = require('imagemin-jpeg-recompress'),
    imageminOptipng             = require('imagemin-optipng'),
    postcss                     = require('gulp-postcss'),
    //atImport                  = require("postcss-import"),
    sourcemaps                  = require('gulp-sourcemaps'),
    autoprefix                  = require('gulp-autoprefixer'),
    browserSync                 = require('browser-sync').create();

//设置各种输入输出文件夹的位置;
var srcScript                   = 'src/js/*.js',
    dstScript                   = 'dist/js',
    srcCss                      = 'src/css/*.css',
    dstCSS                      = 'dist/css',
    srcSass                     = 'src/css/*.scss',
    dstSass                     = 'dist/css',
    srcImage                    = 'src/img/*.*',
    dstImage                    = 'dist/img',
    srcHtml                     = 'src/*.html',
    dstHtml                     = 'dist';

//处理JS文件:压缩,然后换个名输出;
//命令行使用gulp script启用此任务;
gulp.task('script', function() {
    gulp.src(srcScript)
        .pipe(uglify())
        .pipe(gulp.dest(dstScript));
});

//自动给CSS文件添加各种前缀;
//命令行使用gulp prefix启用此任务;
gulp.task('prefix', function() {
    var prefix = autoprefix({
            browsers: ['Android', 'iOS'],
            cascade: true
        }),
        processors = [prefix];
    gulp.src(srcCss)
        .pipe(sourcemaps.init())
        .pipe(postcss(processors))
        .pipe(sourcemaps.write('.'))
        .pipe(dstCSS);
});

//处理CSS文件:压缩,然后换个名输出;
//命令行使用gulp css启用此任务;
gulp.task('css', function() {
    gulp.src(srcCss)
        .pipe(minifyCSS())
        .pipe(gulp.dest(dstCSS));
});

//SASS文件输出CSS,天生自带压缩特效;
//命令行使用gulp sass启用此任务;
gulp.task('sass', function() {
    gulp.src(srcSass)
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest(dstSass));
});

//PostCSS语法解析,目标是兼容并转换sass的一些基础语法;
//命令行使用gulp precss启用此任务;
gulp.task('precss', function() {
    gulp.src(srcCss)
        .pipe(postcss());
});

//图片压缩任务,主要支持JPEG及PNG文件;
//命令行使用gulp jpgmin启用此任务;
gulp.task('imgmin', function() {
    var jpgmin = imageminJpegRecompress({
            accurate: true, //高精度模式
            quality: "high", //图像质量:low, medium, high and veryhigh;
            method: "smallfry", //网格优化:mpe, ssim, ms-ssim and smallfry;
            min: 70, //最低质量
            loops: 0, //循环尝试次数, 默认为6;
            progressive: false, //基线优化
            subsample: "default" //子采样:default, disable;
        }),
        pngmin = imageminOptipng({
            optimizationLevel: 3 //优化级别(感觉没卵用...);
        });
    gulp.src(srcImage)
        .pipe(imagemin({
            use: [jpgmin, pngmin]
        }))
        .pipe(gulp.dest(dstImage));
});

//把所有html页面扔进dist文件夹(不作处理);
//命令行使用gulp html启用此任务;
gulp.task('html', function() {
    gulp.src(srcHtml)
        .pipe(gulp.dest(dstHtml));
});

//服务器任务:以dist文件夹为基础,启动服务器;
//命令行使用gulp server启用此任务;
gulp.task('server', function() {
    browserSync.init({
        server: "dist"
    });
});

//监控改动并自动刷新任务;
//命令行使用gulp auto启动;
gulp.task('auto', function() {
    gulp.watch(srcScript, ['script']);
    gulp.watch(srcCss, ['css']);
    gulp.watch(srcSass, ['sass']);
    gulp.watch(srcImage, ['imgmin']);
    gulp.watch(srcHtml, ['html']);
    gulp.watch('dist/**/*.*').on('change', browserSync.reload);
});

//gulp默认任务(集体走一遍,然后开监控);
gulp.task('default', ['script', 'css', 'sass', 'imgmin', 'html', 'server', 'auto']);