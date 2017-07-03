const gulp = require("gulp"),
    less = require("gulp-less"),
    rename = require("gulp-rename"),
    connect = require("gulp-connect"),
    uglify = require("gulp-uglify"),
    pump = require("pump"),
    minimist = require("minimist")

const knownOptions = {
    string: "chapter",
    default: { chapter: "main" }
}

const options = minimist(process.argv.slice(1), knownOptions)
const chapter = options.chapter === "main" ? "main" : "chapter" + options.chapter



gulp.task("less", function() {
    return gulp.src("app/less/main.less")
    .pipe(less())
    .pipe(gulp.dest("app/css"))
    .pipe(connect.reload())
})

gulp.task("data",function(){
    return gulp.src("data/**.csv")
    .pipe(gulp.dest("data"))
    .pipe(connect.reload())
})

gulp.task("js", function(cb) {
    pump([
        gulp.src(`app/scripts/${chapter}.js`),
        rename("index.js"),
        uglify(),
        gulp.dest("app"),
        connect.reload()
    ],
    cb
  )
})

gulp.task("watch", function(){
    gulp.src("app/index.html")
    .pipe(connect.reload())
})

gulp.task("default", ["watch","less","js","data"], function() {    // 这里的watch，是自定义的，写成live或者别的也行
    
    connect.server({
        livereload: true
    })

    // app/**/*.*的意思是 app文件夹下的 任何文件夹 的 任何文件
    gulp.watch("app/index.html", ["watch"])
    gulp.watch("app/less/*.less", ["less"])
    gulp.watch("app/scripts/*.js", ["js"])
    gulp.watch("data/*.*", ["data"])
})