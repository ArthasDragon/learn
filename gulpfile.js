const gulp = require("gulp");
const babel = require("gulp-babel");
const autoprefixer = require("autoprefixer");
const path = require("path");
const fs = require("fs");

gulp.task("jsToEs5", function() {
	gulp
		.src("learning_space/*.js")
		.pipe(babel())
		// .pipe(react()) //这里就是新加入的模块, 解析jsx用
		.pipe(gulp.dest("dist"));
});
