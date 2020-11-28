const gulp = require('gulp') // gulp
const less = require('gulp-less') // 编译less
const watch = require('gulp-watch') // 监听文件
const rename = require('gulp-rename') // 重命名文件

// 将pages目录下的所有less文件编译成wxss，并输出到同级目录下
gulp.task('pages',() => {
    return gulp.src(['pages/**/*.less'])
        .pipe(watch(['pages/**/*.less']))
        .pipe(less())
        .pipe(rename((path) => {
            path.extname = '.wxss'
        }))
        .pipe(gulp.dest('pages/'))
})

// 将分包目录下的所有less文件编译成wxss，并输出到同级目录下
// gulp.task('packageA',() => {
//     return gulp.src(['packageA/pages/**/*.less'])
//         .pipe(watch(['packageA/pages/**/*.less']))
//         .pipe(less())
//         .pipe(rename((path) => {
//             path.extname = '.wxss'
//         }))
//         .pipe(gulp.dest('packageA/pages/'))
// }) 

// 将comps目录下的所有less文件编译成wxss，并输出到同级目录下
// gulp.task('comps',() => {
//     return gulp.src(['comps/**/*.less'])
//         .pipe(watch(['comps/**/*.less']))
//         .pipe(less())
//         .pipe(rename((path) => {
//             path.extname = '.wxss'
//         }))
//         .pipe(gulp.dest('comps/'))
// })

// 定义一个总任务，用来执行整个项目中的less编译
// gulp.task('less',gulp.parallel('pages','packageA','comps',() => {
gulp.task('less',gulp.parallel('pages',() => {
    console.log('less转wxss')
})) 