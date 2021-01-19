const {series, parallel, watch} = require('gulp');
const chalk = require('chalk');
const del = require('del');
const browserSync = require('browser-sync').create('rootServer');

const {
  outputPath,
  cssFilesPath,
  jsFilesPath,
  htmlFilesPath,
  imgFilesPath
} = require('./filesPath');

const {
  taskCss,
  taskJs,
  taskImg,
  taskHTML,
  taskServer
} = require('./tasks');

// 清理dist
async function clean() {
  console.log(chalk.yellow('开始清理dist目录'));
  await del(outputPath).then(() => {
    console.log(chalk.yellow.underline('清理dist目录完毕'));
  })
}

// 监控文件修改
async function taskWatch() {
  taskServer();
  watch(cssFilesPath, taskCss);
  watch(jsFilesPath, taskJs);
  watch(imgFilesPath, taskImg);
  watch(htmlFilesPath, taskHTML);
}


// tasks
Object.assign(exports, {
  taskClean: clean,
  taskCss,
  taskJs,
  taskImg,
  taskHTML
});
exports.default = series(clean, parallel(
  taskCss,
  taskJs,
  taskImg
), taskHTML, taskWatch);
