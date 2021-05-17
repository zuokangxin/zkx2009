const express = require('express')
const mysql   = require('mysql');      
const bodyParser = require('body-parser')
const app = express()
const port = 3000

app.use(bodyParser.json())


const connection = mysql.createConnection({
    host     : 'localhost',         
    user     : 'root',              
    password : 'root',            
    database : 'api2009'              
});


connection.connect();

app.all("*",function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","content-type");
    res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");

    next();
});


app.get('/', (req, res) => {

    let html = "<h2>Hello Vue</h2>"
    res.send(arr)
})

app.get('/test',(req,res)=>{
    console.log(req.query)
    res.send("访问了 /test接口")
})


app.get('/user/list',(req,res)=>{
    console.log(req.method)
    console.log(1111)
    
    let sql = "select user_id,user_name,email,password from p_users order by user_id desc limit 10"

    connection.query(sql, function (error, results, fields) {
        res.send(results)           
    });
})


app.post('/user/add',(req,res)=>{
    let uid = req.body.user_id
    let uname = req.body.user_name

    let sql = `insert into p_users (user_id,user_name) values (${uid},"${uname}")`
    console.log(sql)
    connection.query(sql, function (error, results, fields) {
        res.send("添加成功")
    });
})


app.delete('/user/delete',(req,res)=>{
    let uid = req.query.uid
    let sql = `delete from p_users where user_id=${uid}`
    connection.query(sql, function (error, results, fields) {
        res.send("删除成功")
    });

})


app.put('/user/update',(req,res)=>{
    console.log(req.body)
    let name = req.body.user_name
    let uid = req.body.user_id
    let sql = `update p_users set user_name='${name}' where user_id=${uid}`
    console.log(sql);
    connection.query(sql, function (error, results, fields) {
        console.log(error)
        res.send("修改成功")
    });

})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})