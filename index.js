const serve = require('koa-static-server')
const Koa = require('koa')
const app = new Koa()

const PORT = 5001

app.use(serve({rootDir: 'static'}))

app.listen(PORT)

console.log(`app is running at http://localhost:${PORT}`)
