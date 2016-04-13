/**
 * gulp的主文件，用于注册任务
 * @Author: lily
 * @Last Modified by:   lily
 * @Last Modified time: 2016-04-13 16:56:34
 */

 //node执行的代码
var gulp = require('gulp');  //载入gulp包
var less = require('gulp-less');  //载入less包
var cssnano = require('gulp-cssnano');  //载入css压缩的包
var concat = require('gulp-concat');  //载入js合并的包
var uglify = require('gulp-uglify');  //载入js压缩混淆的包
var htmlmin = require('gulp-htmlmin');  //载入html压缩的包
var browserSync = require('browser-sync');  //载入浏览器实时同步的包
// var reload = browserSync.reload;  

//less编译、压缩、合并
gulp.task('style',function (){  //注册一个style(自定义)任务，当gulp执行时就执行以下任务
	//找到的有的less文件，不包括以_开头的less，如:_part1.less
	gulp.src(['src/css/*.less','!src/css/_*.less'])  
		.pipe(less())      //编译less为css
		.pipe(cssnano())   //压缩css代码
		.pipe(gulp.dest('dist/css'))   //把css放到项目下的dist下面的css文件夹下
		.pipe(browserSync.reload({stream: true}));  //文件改变时浏览器实时刷新
});

//js合并、压缩混淆
gulp.task('script',function (){  //注册script(自定义)任务
	gulp.src('src/js/*.js')    //找到所有的js文件
		.pipe(concat('all.js'))      //把所有合并到all.js这一个文件里
		.pipe(uglify())         //压缩混淆合并后js
		.pipe(gulp.dest('dist/js'))   //把css放到项目下的dist下面的js文件夹下
		.pipe(browserSync.reload({stream: true}));  //文件改变时浏览器实时刷新
});

//图片复制
gulp.task('image',function (){  //注册image(自定义)任务
	gulp.src('src/images/*.*')    //找到所有的图片文件
		.pipe(gulp.dest('dist/images'))   //把图片复制放到项目下的dist下面的images文件夹下
		.pipe(browserSync.reload({stream: true}));  //文件改变时浏览器实时刷新
});

//html合并、压缩混淆
gulp.task('html',function (){  //注册html(自定义)任务
	gulp.src('src/*.html')    //找到所有的html文件
		.pipe(htmlmin({
			collapseWhitespace: true,  //去掉空白
			removeComments:true      //去掉注释
			//其它参数：https://github.com/kangax/html-minifier
		 }))         //压缩混淆合并后js
		.pipe(gulp.dest('dist'))   //把html文件放到项目下的dist下
		.pipe(browserSync.reload({stream: true}));  //文件改变时浏览器实时刷新
});

//启动静态服务器，监听文件的变化
gulp.task('serve',function (){  //注册server(自定义)任务
	browserSync({ //并提供一个URL来查看网站
			server: {
				baseDir:['dist/']  //从这个项目的dist目录启动服务器
			},
		}, function(err, bs) {
    		console.log(bs.options.getIn(["urls", "local"]));
	});
	//监听文件的改变
	gulp.watch("src/css/*.less", ['style']);
	gulp.watch("src/js/*.js", ['script']);
	gulp.watch("src/images/*.*", ['image']);
	gulp.watch("src/*.html", ['html']);
});

//合并多个任务,default为默认任务，$gulp时会自动执行
gulp.task('default', ['style','script','image','html','serve']); 
