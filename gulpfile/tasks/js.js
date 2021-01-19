const gulp = require('gulp');
const chalk = require('chalk');
const del = require('del');
const plugins = require('gulp-load-plugins')();

const {outputPath, jsFilesPath} = require('../filesPath');

module.exports = async function () {
  console.log(chalk.white.bgBlack('执行js任务'));

  console.log(chalk.red('开始清理dist/js目录'));
  await del(`${outputPath}js/`).then(() => {
    console.log(chalk.red.underline('清理dist/js目录完毕'));
  })

  return gulp.src(jsFilesPath)
    .pipe(plugins.babel({
      // 插件集合，最新特性的全部打包，不写这个转换没有效果
      presets: ['@babel/preset-env']
    }))
    .pipe(plugins.concat('js/bundle.js'))
    .pipe(plugins.uglify({
      mangle: { toplevel: true }
    }))
    .pipe(plugins.rev()) // 文件名加MD5后缀
    .pipe(gulp.dest(outputPath))
    .pipe(plugins.rev.manifest('rev-js-manifest.json')) //生成一个rev-manifest.json
    .pipe(gulp.dest(outputPath + 'rev')); //将 rev-manifest.json 保存到 rev 目录内
}
