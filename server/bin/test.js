var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : '123456',
  database : 'todolist'
});
 
connection.connect();
 
connection.query('select * from todo where id=1', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results);
});