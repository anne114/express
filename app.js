const express = require("express");
const path = require("path");
const public = path.join(__dirname, "public");
var cookieParser = require("cookie-parser");
const app = express();

const user = require("./servers/user.js");
//使用cookieParser中间件
app.use(cookieParser());
//访问静态文件
app.use(express.static(public));
//路径加载中间件，它之后的符合路径的路由，会先经过这里，如果有next()才会往下执行，这非常适合于鉴权，如果鉴权没通过则可以通过res返回给客户端
app.all(
  "*", //*表示所有路由
  (req, res, next) => {
    console.log("req.cookies::", req.cookies);
    if (req.cookies.user) {
      //cookies里是否有user
      console.log("step1");
      next(); //执行了next()才会继续往下执行
    } else {
      res.send("用户信息不存在"); //直接返回给客户端，没有next，不继续往下执行
    }
  },
  (req, res, next) => {
    console.log("step2");
    next();
  }
);
//访问根路由
app.get("/", function(req, res) {
  res.send("Hello from express");
});
//使用use挂载中间件方法到路径上
app.use("/user", (req, res, next) => {
  console.log(111);
  next();
});
//子路由挂载
app.use("/user", user);
const server = app.listen(8088, () => {
  let port = server.address().port;
  console.log(`应用实例，访问地址为 http://127.0.0.1:${port}`);
});
