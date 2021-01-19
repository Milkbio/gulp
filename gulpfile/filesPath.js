const outputPath = 'dist/';
const jsFilesPath = 'src/**/*.js';
const cssFilesPath = 'src/**/*.+(scss|sass)';
const imgFilesPath = 'src/**/*.+(jpg|jpeg|png|bmp)';
const htmlFilesPath = 'src/*.html'
const revFilesPath = `${outputPath}rev/*.json`;

module.exports = {
  outputPath,
  jsFilesPath,
  cssFilesPath,
  imgFilesPath,
  htmlFilesPath,
  revFilesPath
}
