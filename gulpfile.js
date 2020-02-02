const gulp = require("gulp");

gulp.task("copy-index", function(){
    return gulp.src("index.html")
    .pipe(gulp.dest("dist/"))
    .pipe(connect.reload());
})

gulp.task("copy-html", function(){
    return gulp.src("html/*.html")
    .pipe(gulp.dest("dist/html"))
    .pipe(connect.reload());
})

gulp.task("images", function(){
    return gulp.src("images/**/*")
    .pipe(gulp.dest("dist/images"))
    .pipe(connect.reload());
})

gulp.task("js", function(){
    return gulp.src("js/*")
    .pipe(gulp.dest("dist/js"))
    .pipe(connect.reload());
})

gulp.task("data", function(){
    return gulp.src("data/*")
    .pipe(gulp.dest("dist/data"))
    .pipe(connect.reload());
})

gulp.task("build",["copy-index", "copy-html", "images", "js", "data","sass","tool","goodsList","goodsDetails","carts"], function(){
    console.log("编译成功")
})

const sass = require("gulp-sass");
const minifyCSS = require("gulp-minify-css");
const rename = require("gulp-rename");

// gulp.task("sass", function(){
//     return gulp.src("stylesheet/index.scss")
//     .pipe(sass())
//     .pipe(gulp.dest("dist/css"))
//     .pipe(minifyCSS())
//     .pipe(rename("index.min.css"))
//     .pipe(gulp.dest("dist/css"))
//     .pipe(connect.reload());
// })

gulp.task("sass", function(){
    return gulp.src("stylesheet/index.scss")
    .pipe(sass())
    .pipe(gulp.dest('dist/css/'))
    .pipe(minifyCSS())
    .pipe(rename('index.min.css'))
    .pipe(gulp.dest('dist/css'))
    .pipe(connect.reload())
})
gulp.task("goodsList",function(){
    return gulp.src("stylesheet/goosList.scss")
    .pipe(sass())
    .pipe(gulp.dest("dist/css"))
    .pipe(minifyCSS())
    .pipe(rename("goodsList.min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload())
})
gulp.task("goodsDetails",function(){
    return gulp.src("stylesheet/goodsDetails.scss")
    .pipe(sass())
    .pipe(gulp.dest("dist/css"))
    .pipe(minifyCSS())
    .pipe(rename("goodsDetails.min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload())
})
gulp.task("carts",function(){
    return gulp.src("stylesheet/carts.scss")
    .pipe(sass())
    .pipe(gulp.dest("dist/css"))
    .pipe(minifyCSS())
    .pipe(rename("carts.min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload())
})

const uglify = require("gulp-uglify"); 
gulp.task("tool", function(){
    return gulp.src("js/*.js")
    .pipe(gulp.dest("dist/js"))
    .pipe(connect.reload());
})

gulp.task("watch", function(){
    gulp.watch("index.html", ["copy-index"])
    gulp.watch("html/*.html", ["copy-html"])
    gulp.watch("images/**/*", ["images"])
    gulp.watch("js/*", ["js"])
    gulp.watch("data/*", ["data"])
    gulp.watch("js/*.js", ["tool"])
    gulp.watch("stylesheet/index.scss", ["sass"])
    gulp.watch("js/*.js", ["tool"])
   gulp.watch("stylesheet/goosList.scss",["goodsList"])
   gulp.watch("stylesheet/goodsDetails.scss",["goodsDetails"])
   gulp.watch("stylesheet/carts.scss",["carts"])
})

//服务器
const connect = require("gulp-connect");
gulp.task("server", function(){
    connect.server({
        root:"dist",
        port:8888,
        livereload:true
    })
})

//设置默认gulp
gulp.task("default", ["watch", "server"]);