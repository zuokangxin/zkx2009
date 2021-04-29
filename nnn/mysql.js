// 引入 mysql 模块
var mysql      = require('mysql');
// 链接数据库
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'api2009'
});
 
connection.connect();
 
// 执行查询
let = "select * from p_goods where goods_id>10 limit 10"

connection.query(sql, function (error, results, fields) {
  console.log(error)
  console.log(results)
});
 
connection.end();