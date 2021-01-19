const browserSync = require("browser-sync").get('rootServer');

function server() {
  browserSync.init({
    // 设置开屏右上角链接提示：false去掉
    notify: true,
    open: true,
    // 启动过后监听的文件，如果文件有修改就主动刷新
    // files: '../dist/*',
    // 核心配置
    server: {
      // 网站根目录：相对基于gulp命令当前执行路径的路径
      baseDir: 'dist',
      // 优先于baseDir，会先匹配这个配置，没有就会去baseBir中获取，如果引用的css，js文件中有不在dist文件夹里面的，可以匹配这个。如果没有可以不用写
      routes: {
        '/node_modules': 'node_modules'
      }
    }
  })
}

module.exports = server;
