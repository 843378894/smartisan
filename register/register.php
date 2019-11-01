<?php
	include("../public.php");//导入文具文件 链接数据源
	$db=getConnect("smartisan");//调用链接方法
	$uname=$_GET["uname"];  //获取get请求的用户名
	$pwd=$_GET["repwd"];  //获取get请求的用户密码
	//echo $uname.",".$pwd;
	$con=mysqli_connect("localhost","root","");  //连接数据源
	mysqli_select_db($con,"smartisan");  //连接数据库
	mysqli_query($con,"set names utf8");  //设置字符编码
	$sql1 = "SELECT * FROM `user` WHERE uname='$uname'";
	$result=mysqli_query($con,$sql1);
	$arr=mysqli_fetch_array($result);
	if($arr["uname"]){
		echo "<script>alert('注册失败,用户名已存在!');location.href='../register/register.html';</script>";

	}else{
		$sql2 ="INSERT INTO user(uname,upwd,cookie) VALUES('$uname','$pwd','');";  //设置sql语句
		//若插入数据成功返回1,插入失败返回空
		$row=mysqli_query($con,$sql2);
		if($row){
			echo "<script>alert('注册成功');location.href='../login/login.html';</script>";
		}else{
			echo "<script>alert('注册失败');location.href='../register/register.html';</script>";
		} 
	}

?>