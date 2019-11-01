<?php
	include("../public.php");//导入文具文件 链接数据源
	date_default_timezone_set('prc');//设置时区
	$db=getConnect("smartisan");//调用链接方法
	$uname=$_GET["uname"];  //获取get请求的用户名
	$pwd=$_GET["pwd"];  //获取get请求的用户密码
	$check=$_GET["ch"];
	//echo $uname.",".$pwd;
	$con=mysqli_connect("localhost","root","");  //连接数据源
	mysqli_select_db($con,"smartisan");  //连接数据库
	mysqli_query($con,"set names utf8");  //设置字符编码
	$sql ="SELECT * FROM `user` WHERE uname='$uname';";  //设置sql语句
    $result=mysqli_query($db,$sql);//执行查询语句
	$arr=mysqli_fetch_array($result);//解析一行数据
	//$time = strtotime(date('Y-d-m'));
	$time = strtotime(date("Y-m-d H:i:s"));
	$sql2 = "UPDATE `user` SET `cookie`=$time WHERE uname='$uname';";
	$result=mysqli_query($db,$sql2);
	$t = "t";
	//echo $arr["upwd"],$check;
 	if($arr){//如果数据存在,说明用户名存在
		if($arr["upwd"]==$pwd){//判断密码是否相等
			//密码相等说明登录成功,跳转到学生信息页
			//echo $check;
			if($check==$t){
				echo "<script>alert('登录成功');location.href='../index.html?uName=$uname';var date = new Date();date.setDate(date.getDate()+7);document.cookie ='token=$time;expires='+date+';path=/';</script>";
			}else{
				echo "<script>alert('登录成功');location.href='../index.html';</script>";
				
			}
		}else{
			//密码不等,密码有误,需要重新登录,跳转到登录页
			echo "<script>alert('密码有误，请重新登录');location.href='login.html';</script>";
		}
	}else{//用户名不存在,需要重新登录,跳转到登录页
			echo "<script>alert('用户不存在，请重新登录');location.href='login.html';</script>";
	}
	
?>