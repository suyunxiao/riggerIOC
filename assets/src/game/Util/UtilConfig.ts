// var gulp = require('gulp');
// var fs = require('fs');
// var path = require('path');
// var less = require('gulp-less');
// var sass = require('gulp-sass');
// var minifycss = require('gulp-minify-css');
// var concat = require('gulp-concat');
// var uglify = require('gulp-uglify');
// var rename = require('gulp-rename');
// var del = require('del');
// var tinylr = require('tiny-lr');
// var server = tinylr();
// var port = 1234;
 
// // browser-sync
// var browserSync = require('browser-sync');

// // 创建多层目录
// function mkdirs(dirname, mode, callback){
//     fs.exists(dirname, function (exists){
//         if(exists){
//             callback();
//         }else{
//             //console.log(path.dirname(dirname));
//             mkdirs(path.dirname(dirname), mode, function (){
//                 fs.mkdir(dirname, mode, callback);
//             });
//         }
//     });
// }
 
// // 拷贝文件
// function copyfile(oldPath, newPath) {
//     console.log('复制'+oldPath+' -> '+newPath);
     
//     var stat = fs.lstatSync(oldPath);
//     if(stat.isDirectory()) {
//         console.log(oldPath+'是目录');
//         return false;
//     }
     
//     var readStream = fs.createReadStream(oldPath);
//     var writeStream = fs.createWriteStream(newPath);
//     readStream.pipe(writeStream);
//     readStream.on('end', function () {
//         console.log('copy end');
//     });
//     readStream.on('error', function () {
//         console.log('copy error');
//     });
// }
 
// gulp.task('default', function() {
     
// });
 
// gulp.task('css', function() {
//     return gulp.src('src/*.css')      //压缩的文件
//         .pipe(gulp.dest('target/css'))   //输出文件夹
//         .pipe(minifycss());   //执行压缩
// });
 
// // 编译Sass
// gulp.task('sass', function() {
//     gulp.src('./src/css/*.scss')
//         .pipe(sass())
//         .pipe(rename({ suffix: '.min' }))
//         .pipe(minifycss())
//         .pipe(gulp.dest('target/css'));
// });
 
// gulp.task('js', function() {
//     return gulp.src('./src/js/*.js')
//         .pipe(gulp.dest('target/js'))    //输出main.js到文件夹
//         .pipe(rename({suffix: '.min'}))   //rename压缩后的文件名
//         .pipe(uglify())    //压缩
//         .pipe(gulp.dest('target/js'));  //输出
// });
 
// gulp.task('html', function() {
//     return gulp.src('./src/*.php')
//         .pipe(gulp.dest('target/'));  //输出
// });
 
// // 监听任务 运行语句 gulp watch
// gulp.task('watch',function(){
//     server.listen(port, function(err){
//         if (err) {
//             return console.log(err);
//         }
         
//         console.log(" watch List Dis");
        
 
//         // 监听sass
//         gulp.watch('src/css/*.scss', function(){
//             gulp.run('sass');
//         });
 
//         // 监听js
//         gulp.watch('./src/js/*.js', function(){
//             gulp.run('js');
//         });
         
//         // 监听html
//         gulp.watch('./src/*.php', function(){
//             gulp.run('html');
//         });
         
//     });

      
// });