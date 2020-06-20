var sql = `CREATE TABLE todo(
    id INT(10) AUTO_INCREMENT PRIMARY KEY NOT NULL ,
    msg VARCHAR(255),
    active TINYINT(1),
    isChecked TINYINT(1)
  )`
  
module.exports = sql;