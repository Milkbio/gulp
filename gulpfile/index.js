const {series, parallel, watch} = require('gulp');
const chalk = require('chalk');
const del = require('del');

const {
  outputPath,
  cssFilesPath,
  jsFilesPath,
  htmlFilesPath,
  imgFilesPath
} = require('./filesPath');

const taskCss = require('./tasks/css');
const taskJs = require('./tasks/js');
const taskImg = require('./tasks/img');
const taskHTML = require('./tasks/html');

// 清理dist
async function clean() {
  console.log(chalk.yellow('开始清理dist目录'));
  await del(outputPath).then(() => {
    console.log(chalk.yellow.underline('清理dist目录完毕'));
  })
}

// 监控文件修改
async function taskWatch() {
  watch(cssFilesPath, taskCss);
  watch(jsFilesPath, taskJs);
  watch(imgFilesPath, taskImg);
  watch(htmlFilesPath, taskHTML);
}

// tasks
exports.taskClean = clean;
exports.taskCss = taskCss;
exports.taskJs = taskJs;
exports.taskImg = taskImg;
exports.taskHTML = taskHTML;
exports.default = series(clean, parallel(
  taskCss,
  taskJs,
  taskImg
), taskHTML, taskWatch);
