const gulp = require("gulp"),
    less = require("gulp-less"),
    rename = require("gulp-rename"),
    path = require("path"),
    connect = require("gulp-connect"),
    uglify = require("gulp-uglify"),
    pump = require("pump"),
    minimist = require("minimist"),
    rollup = require('rollup'),
    rollupTypescript = require('rollup-plugin-typescript2');
    
const knownOptions = {
    string: "path",
}


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
        tsFile = /(?:\.[ts|js])/.test(tsFilePath) ? tsFilePath : (tsFilePath + '/index.ts');
    }
    return rollup.rollup({
        input: `./src/${tsFile}`,
        plugins: [
          rollupTypescript({
            tsconfig: "./tsconfig.json"
        }),
        ],
      })
        .then(function (bundle) {
          bundle.write({
            format: "umd",
            name: "app",
            sourcemap: true,
            file: "./dist/app.js", 
            external: ['d3'] // 🐶 indicate which modules should be treated as external
          });
        });
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
    gulp.watch("src/**/*.ts", ["ts", "html"])
    gulp.watch("data/*.*", ["data"])
});

gulp.task("default", ["watch", "html","less","ts","data"], () => {    // 这里的watch，是自定义的，写成live或者别的也行
    connect.server({
        livereload: true
    })
})
