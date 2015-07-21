var gulp = require("gulp");
var browserSync = require("browser-sync").create();
var inject = require("gulp-inject");

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
    gulp.src("./index.html")
        .pipe(
        inject(
            gulp.src(paths.scripts, { read: false })
        )
    )
        .pipe(gulp.dest("./"));
})

gulp.task("watch", function() {
    console.log("Refresh!");
    browserSync.reload();
});