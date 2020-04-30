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
                target:process.env.VUE_APP_BASE_API,
                changeOrigin:true,
                secure: false,
                pathRewrite:{
                    '/api':''
                }
            }
        }
    }
}
