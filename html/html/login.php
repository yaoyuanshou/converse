<?php
header('content-type:text/html;charset="utf-8"');
$username = $_POST["username"];
$password = $_POST["password"];
$link = mysql_connect("localhost","root","123456");
if(!$link){
    echo "数据库链接失败";
    exit;
}
mysql_set_charset("utf8");
mysql_select_db("converse");
$sql = "select * from users where phone={$username} and password={$password}";

$res = mysql_query($sql);

$row = mysql_fetch_assoc($res);

if(!$row){
   echo "用户名或密码错误";
    exit;
}else{
    echo "登录成功";
    exit;
}

mysql_close($link);
?>