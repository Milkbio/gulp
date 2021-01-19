const gulp = require('gulp');
const chalk = require('chalk');
const plugins = require('gulp-load-plugins')();

const {
  outputPath,
  htmlFilesPath,
  revFilesPath
} = require('../filesPath');

module.exports = function () {
  console.log(chalk.bgYellow.black('执行html任务'));
  return gulp.src([revFilesPath, htmlFilesPath])
    .pipe(plugins.revCollector())
    .pipe(plugins.htmlmin({
      collapseWhitespace: true,
      removeComments: true, // 清除HTML注释
      collapseBooleanAttributes: true, // 省略布尔属性的值 <input checked="true"/> ==> <input />
      removeEmptyAttributes: true, // 删除所有空格作属性值 <input id="" /> ==> <input />
      removeScriptTypeAttributes: true, // 删除<script>的type="text/javascript"
      removeStyleLinkTypeAttributes: true // 删除<style>和<link>的type="text/css"
    }))
    .pipe(gulp.dest(outputPath))
}
