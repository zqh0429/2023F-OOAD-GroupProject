module.exports = {
  pages: {
    login: {
      // 入口文件，相当于单页面的 main.js
      entry: './src/module/login/login.js',
      // 模板文件
      template: './src/module/login/login.html',
      // 编译后 dist 目录下输出的文件，可以包含子目录
      filename: 'login.html'
    },
    main: {
      entry: './src/module/main/main.js',
      template: './src/module/main/main.html',
      filename: 'main.html'
    }
  }
}
