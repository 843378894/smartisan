<?php
	include("public.php");//导入文具文件 链接数据源
	$db=getConnect("smartisan");//调用链接方法
	$cook=$_POST["name"];  //获取get请求的用户名
	//echo $uname.",".$pwd;
	$con=mysqli_connect("localhost","root","");  //连接数据源
	 mysqli_select_db($con,"smartisan");  //连接数据库
	 mysqli_query($con,"set names utf8");  //设置字符编码
	$sql1 = "SELECT * FROM `user` WHERE cookie='$cook'";
	$result=mysqli_query($con,$sql1);
	$arr=mysqli_fetch_array($result);
	//echo $cook;
	if($arr["uname"]){
		$uname=$arr["uname"];
		//echo "<script>alert('欢迎回来'+$uname);location.href='index.html?uName=$uname';</script>";
		echo $uname;
	}else{
			echo "<script>location.href='index.html';</script>";
	}

?>