const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
  ctx.body = 'koa run to port 3000';
});

app.listen(3000);