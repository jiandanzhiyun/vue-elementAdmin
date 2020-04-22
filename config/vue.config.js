module.exports = {
    baseUrl: './',
    assetsDir: 'static',
    productionSourceMap: false,
    devServer: {
        open: true,
        host: 'localhost',
        port: 5200,
        https: false,
        proxy: {
            '/api':{
                target:'https://sansheng.cdheshiyu.com',
                changeOrigin:true,
                secure: false,
                pathRewrite:{
                    '/api':''
                }
            }
        }
    }
}