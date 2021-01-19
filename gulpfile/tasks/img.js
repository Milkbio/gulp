const gulp = require('gulp');
const chalk = require('chalk');
const plugins = require('gulp-load-plugins')();

const {outputPath, imgFilesPath} = require('../filesPath');

module.exports = function () {
  console.log(chalk.bgCyanBright('执行img任务'));
  return gulp.src(imgFilesPath)
    .pipe(plugins.rev()) // 文件名加MD5后缀
    .pipe(gulp.dest(outputPath))
    .pipe(plugins.rev.manifest('rev-img-manifest.json'))
    .pipe(gulp.dest(outputPath + 'rev')); //将 rev-manifest.json 保存到 rev 目录内
}
