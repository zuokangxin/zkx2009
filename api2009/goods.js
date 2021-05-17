const express = require('express')
const mysql   = require('mysql');  //引入 mysql 类库
const app = express()
const bodyParser = require('body-parser');
const port = 3001
app.use(bodyParser.json())


const connection = mysql.createConnection({
    host     : 'localhost',  //数据库地址
    user     : 'root',       //数据库用户名
    password : 'root',       //数据库密码
    database : 'api2009'     //数据库名
  });

//建立连接
connection.connect();

app.all("*",function(req,res,next){
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin","*");
  // //允许的header类型
  res.header("Access-Control-Allow-Headers","content-type");
  // //跨域允许的请求方式
  res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");

  next();
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/goods/list', (req, res) => {
//拼装 spl 语句
  let sql = "select goods_id,goods_name,shop_price,number from p_cart order by goods_id asc limit 10";

    connection.query(sql, function (error, results, fields) {
        res.send(results)          //将数据库查询结果返回接口
    });
  })

//删除成功
app.delete('/goods/del',(req,res)=>{
    let goods_id = req.query.goods_id
    let sql = `delete from p_cart where goods_id=${goods_id}`
    connection.query(sql,function (error,results,field) {
           res.send("删除成功")
    })
  })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

