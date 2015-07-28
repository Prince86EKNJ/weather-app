var gulp = require("gulp");
var browserSync = require("browser-sync").create();
var inject = require("gulp-inject");
var mainBowerFiles = require("main-bower-files");

var paths = {
    scripts: ["modules/**/*.module.js", "modules/**/*.js"],
    html: "",
};

gulp.task("default", ["browser-sync", "inject"]);

gulp.task("browser-sync", function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch(["index.html", "styles/**/*.css", "modules/**/*.js"], ["watch"])
});

gulp.task("inject", function() {

    var moduleFiles = gulp.src(paths.scripts, { read: false });
    var bowerFiles = gulp.src(mainBowerFiles(), { read: false });

    gulp.src("./index.html")
        .pipe(inject(moduleFiles))
        .pipe(inject(bowerFiles, { name: "bower" }))
        .pipe(gulp.dest("./"));
})

gulp.task("watch", function() {
    console.log("Refresh!");
    browserSync.reload();
});