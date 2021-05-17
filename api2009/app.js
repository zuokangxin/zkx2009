var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'api2009'
});
 
connection.connect();
 //拼装sql语句
 let sql="select *from p_users order by user_id desc limit 10"

connection.query(sql, function (error, results, fields) {
//    console.log(error)
   console.log(results)
});
 
connection.end();