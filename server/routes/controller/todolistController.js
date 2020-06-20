var sql = require('../model/todolistModel');
var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  port: '3306',
  database : 'todolist'
});
 
connection.connect();

connection.query("show tables like 'todo'",function(err, result){
    if (err) {
        console.log(err.message);
       return;
   }
   if(result.length==0){
    connection.query(sql, function (err, results, fields) {
        if (err) {
             console.log('create error - ', err.message);
            return;
        }
        console.log('--------------------------CREATE----------------------------');       
        console.log('CREATE TABLE:', results);        
        console.log('------------------------------------------------------------\n\n');  
    });
    
   }
})

var response = {}

exports.getAllList=function(req, res) {
    const sql = `SELECT * FROM todo`;
    connection.query(sql, (err, result) => {
      if (err) res.send(err);
      response.code=4;
      response.data=result
      return res.json(response)
    })
}

exports.addItem=function(req,res){
    console.log(00)
    let param = req.body
    let mess =param.msg;
    if(mess == ''){
        response.code=1;
        response.msg = '任务为空';
        return res.json(response);
    }else{
         console.log(33)
         const addSql = 'INSERT INTO todo(id,msg,active,isChecked) VALUES(0,?,?,?)';
         const addSqlParams = [param.msg,param.active,param.isChecked];
         connection.query(addSql,addSqlParams,function (err, result) {
            if (err) res.send(err);    
               console.log('--------------------------INSERT----------------------------');
                //console.log('INSERT ID:',result.insertId);        
               console.log('INSERT ID:',result);        
               console.log('-----------------------------------------------------------------\n\n');  
               response.code=4;
               response.msg = '添加成功';
               response.data = result;
               console.log(response)
                return res.json(response);
            });
}
}

exports.updateItem=function(req,res){
    let id = req.body.id || '';
    let msg = req.body.msg || '';
    let active = req.body.active;
    let isChecked = req.body.isChecked;
    var modSql = 'UPDATE todo SET msg = ?,active = ?,isChecked=? WHERE id = ?';
    var modSqlParams = [msg,active,isChecked,id];
    connection.query(modSql,modSqlParams,function (err, result) {
        if (err) return res.send(err);
        else{
            response.code=4;
            response.data=result
            return res.json(response)
        }
       
    });
}


exports.deleteItem=function(req,res){
    let id = req.body.id || '';
    var delSql = `DELETE FROM todo where id=${id}`;
//删
connection.query(delSql,function (err, result) {
    if (err) res.send(err);     
    response.code=4;
    response.data=result
    return res.json(response)
});
 
}