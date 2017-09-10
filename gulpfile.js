const gulp = require("gulp"),
    less = require("gulp-less"),
    rename = require("gulp-rename"),
    path = require("path"),
    ts = require('gulp-typescript'),
    connect = require("gulp-connect"),
    uglify = require("gulp-uglify"),
    pump = require("pump"),
    minimist = require("minimist");

const knownOptions = {
    string: "path",
}

const tsProject = ts.createProject('tsconfig.json', { noImplicitAny: true });

gulp.task("less", function() {
    return gulp.src("src/less/index.less")
    .pipe(less())
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload())
});

gulp.task('ts', function() {
    const options = minimist(process.argv.slice(1), knownOptions)
    const tsFilePath = options.path;
    let tsFile = 'index.ts';
    if (tsFilePath) {
        tsFile = /(?:\.[ts|js]$)/.test(tsFilePath) ? tsFilePath : tsFilePath + '/index.ts';
    }
    return gulp.src([`src/${tsFile}`])
    .pipe(rename('app.ts'))
    .pipe(tsProject())
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload());
});

gulp.task("data",function(){
    return gulp.src("data/**.csv")
    .pipe(gulp.dest("data"))
    .pipe(connect.reload())
})

gulp.task("html", function(){
    gulp.src("public/*.html")
    .pipe(connect.reload())
})

gulp.task("watch", () => {
    // src/**/*.*的意思是 src文件夹下的 任何文件夹 的 任何文件
    gulp.watch("public/*.html", ["html"])
    gulp.watch("src/less/*.less", ["less"])
    gulp.watch("src/**/*.ts", ["ts"])
    gulp.watch("data/*.*", ["data"])
});

gulp.task("default", ["watch", "html","less","ts","data"], () => {    // 这里的watch，是自定义的，写成live或者别的也行
    connect.server({
        livereload: true
    })
})
