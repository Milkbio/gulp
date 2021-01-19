const gulp = require('gulp');
const chalk = require('chalk');
const plugins = require('gulp-load-plugins')();

const {outputPath, cssFilesPath} = require('../filesPath');

module.exports = function () {
  console.log(chalk.bgCyan('执行css任务'));
  return gulp.src(cssFilesPath)
    .pipe(plugins.sass())
    .pipe(plugins.concat('css/app.css'))
    .pipe(plugins.cleanCss())
    .pipe(plugins.rev())
    .pipe(gulp.dest(outputPath))
    .pipe(plugins.rev.manifest('rev-css-manifest.json')) //生成一个rev-manifest.json
    .pipe(gulp.dest(outputPath + 'rev')); //将 rev-manifest.json 保存到 rev 目录内
}
