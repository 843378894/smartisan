<?php
	header("Content-type:text/html;charset=utf-8");  //响应头信息设置字符编码
	function getConnect($dataBase){  //$dataBase形参传递数据库名称
		$db=mysqli_connect("localhost","root","");  //连接数据源
		mysqli_select_db($db,$dataBase);  //连接数据库
		mysqli_query($db,"set names utf8");  //设置字符编码
		return $db;//返回数据源对象
	};
	
?>