'use strict'

var Koa = require('koa')

var app = new Koa()

app.use(function *() {
    var echo = this.query.echo

    if(!echo) {
        this.body = 'NaN'
    } else {
        this.body = echo
    }
})

app.listen(80)

console.log('成功启动服务, 端口80')