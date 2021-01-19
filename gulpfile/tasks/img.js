const gulp = require('gulp');
const chalk = require('chalk');
const del = require('del');
const browserSync = require("browser-sync").get('rootServer');
const plugins = require('gulp-load-plugins')();

const {outputPath, imgFilesPath} = require('../filesPath');

module.exports = async function () {
  console.log(chalk.bgCyanBright('执行img任务'));

  console.log(chalk.bgRed('开始清理dist/images目录'));
  await del(`${outputPath}images/`).then(() => {
    console.log(chalk.bgRed.underline('清理dist/images目录完毕'));
  })

  return gulp.src(imgFilesPath)
    .pipe(plugins.rev()) // 文件名加MD5后缀
    .pipe(gulp.dest(outputPath))
    .pipe(plugins.rev.manifest('rev-img-manifest.json'))
    .pipe(gulp.dest(outputPath + 'rev')) //将 rev-manifest.json 保存到 rev 目录内
    .pipe(browserSync.reload({ stream: true })) // 以流的方式往浏览器推，每次任务执行完，都自动reload一下
}
