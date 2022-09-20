module.exports = {
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: []
    }
  },
  devServer:{
      host:'localhost',
      port:8080,
      proxy:{
          '/api':{
              target:'http://mall-pre.springboot.cn',
              changeOrigin:true,
              pathRewrite:{
                  '/api':''
              }
          }
      }
  }
}
