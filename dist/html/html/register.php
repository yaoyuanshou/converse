<?php
header('content-type:text/html;charset="utf-8"');
$phone = $_POST["phone"];
$email = $_POST["email"];
$password = $_POST["password"];
$link = mysql_connect("localhost","root","123456");
if(!$link){
    echo "数据库链接失败";
    exit;
}
mysql_set_charset("utf8");
mysql_select_db("converse");
$sql = "insert into users(phone,email,password) values('{$phone}','{$email}','{$password}')";
$res = mysql_query($sql);
//判断是否插入成功
if(!$res){
    echo "插入失败";
}else{
    echo "注册成功";
}
mysql_close($link);
?>