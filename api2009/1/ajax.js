const express = require('express');
var mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express()
const port = 3001
app.use(bodyParser.json())
var connection = mysql.createConnection({
    host     : 'localhost',         //数据库地址
    user     : 'root',              //数据库用户名
    password : 'root',            // 数据库密码
    database : 'api2009'              // 数据库名
});

app.all("*",function(req,res,next){
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin","*");
    // //允许的header类型
    res.header("Access-Control-Allow-Headers","content-type");
    // //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");

    next();
});
connection.connect();
//查询
app.get("/user/list",(req,res)=> {
    req.method;
    let sql = "select * from p_cart order by goods_id desc limit 5";
     connection.query(sql,function (error, results, fields) {
              res.send(results)
    })
})
//删除
app.delete("/user/delete",(req,res)=> {
    let goods_id = req.query.goods_id
    let sql = `delete from p_cart where goods_id=${goods_id}`
    connection.query(sql,function (error,results,field) {
        res.send("删除成功")
    })
})
//修改加一
app.put("/user/upd",(req,res)=>{
    let goods_id = req.query.goods_id
    let number = req.query.number
    let sql =  `update p_cart set number=number+1 where goods_id=${goods_id}`
    connection.query(sql,function (error,results,field) {
         res.send("修改成功")
    })
})
//修改减一
app.put("/user/upda",(req,res)=>{
    let goods_id = req.query.goods_id
    let number = req.query.number
        let sql  =  `update p_cart set number=number-1 where goods_id=${goods_id}`
        connection.query(sql,function (error,results,field) {
            res.send("修改成功")
        })
})

app.put("/user/updas",(req,res)=>{
     let goods_id = req.query.goods_id
     let number = req.body.number
     console.log(number)
     let sql = `update p_cart set  number=${number} where  goods_id=${goods_id}`
     console.log(sql)
     connection.query(sql,function (error,response,field) {
           res.send("西瓜")
     })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})