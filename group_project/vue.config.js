const { defineConfig } = require('@vue/cli-service')
module.exports = {
  pages:{
    loginPanel:{
      entry:"./src/pages/loginPanel/loginPanel.js",
      template:"./src/pages/loginPanel/loginPanel.html",
      filename:"login.html",
      title:"Login"
    },
    main:{
      entry:"./src/pages/main/main.js",
      template:"./src/pages/main/main.html",
      filename:"main.html",
      title:"main"
    }
  }
}

