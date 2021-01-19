const gulp = require('gulp');
const chalk = require('chalk');
const plugins = require('gulp-load-plugins')();

const {outputPath, jsFilesPath} = require('../filesPath');

module.exports = function () {
  console.log(chalk.white.bgBlack('执行js任务'));
  return gulp.src(jsFilesPath)
    .pipe(plugins.concat('js/bundle.js'))
    .pipe(plugins.uglify({
      mangle: { toplevel: true }
    }))
    .pipe(plugins.rev()) // 文件名加MD5后缀
    .pipe(gulp.dest(outputPath))
    .pipe(plugins.rev.manifest('rev-js-manifest.json')) //生成一个rev-manifest.json
    .pipe(gulp.dest(outputPath + 'rev')); //将 rev-manifest.json 保存到 rev 目录内
}
