$(document).ready(function(){//商品详情页跳转
    $(".content").on("click","ul>li",function(){
        if($(this).find("a").attr("class")=="klfr1-blue"){
            localStorage.setItem("k-color","klfr1-blue");
            //alert($(this).find("a").attr("class"))
        }else if($(this).find("a").attr("class")=="klf-black"){
            localStorage.setItem("k-color","klf-black");
        }
    });
    // setTimeout(() => {
    //     localStorage.clear();
    // }, 5000);
});
$(document).ready(function(){
    //addCard();
    new addCard().init();
})
class addCard{
    constructor(){
        this.ch_add=$(".ch_add");
    }
    init(){
        this.addClick();
        this.login();
    }
    login(){//通过token得到uName
        var uname = this.getCookie("token");
        $.post("app.php",
        {
            name:uname
        },function(data,status){//data值为后台通过查询token的value值返回的uname
            if(!!uname&&!location.search){//若url不显示用户名则自动补齐
                location.href="index.html?uName="+data;
            }else{
            }
        });
        //alert(uname);
    }
    getCookie(name){//通过name得到指定cookie的value值
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
    }
	addClick(){//加入购物车
	//点击加入购物车按钮先加入到本地保存因为没有购物车数量显示所以这里不做处理
	//在点击购物车进入购物车页面的时候就会刷新数据无需多做处理
	this.ch_add.click(function(){
		//点击购物车按钮先获取bid
		var  bid=$(this).parent().parent().find("input").val();
		var  addArr=[{
			bid:bid,
			num:1,
		}];
		if(!!localStorage.getItem("goods")){//执行这里说明有数据存在
			//有数据存在也分两种情况把bid去出来进行判断
			//从任何数据库拿的数据都是JSON格式的字符串要用的话要进行转码
			var hqGoods=JSON.parse(localStorage.getItem("goods"));//转化为对象
			
			for (var i = 0; i < hqGoods.length; i++) {
			if(hqGoods[i].bid==bid){
			//第一种已近选择过的商品在数据上进行添加
				hqGoods[i]num++;
				
				break
			}else{
			//第二种没有的商品要push进去
				hqGoods.push({
			bid:bid,
			num:1,
		})
			}	
			}
			localStorage.setItem("goods",JSON.stringify(hqGoods))
		}else{//还没有保存过商品数据
		localStorage.setItem("goods",addArr);
			
		}
		
		
	});
	
	
	
	
	
	
	}
	
	
	
// 
//     addClick(){//加入购物车
//         var _this=this;
//         this.ch_add.click(function(){
//             var uname=_this.getSearchName();
//             console.log(uname);
//             //var goodsName=$(this).parent().parent().find("h4").html();
//             var bid=$(this).parent().parent().find("input").val();
//             //console.log(bid);
//             var goodsArr=[
//                 {
//                     // goodsName:goodsName,
//                     bid:bid,
//                     num:1
//                 }
//             ];
//             //console.log(goodsArr);
//             //console.log(JSON.stringify(goodsArr))
//             //localStorage.setItem("goods",JSON.stringify(goodsArr));
//             if(!!localStorage.getItem(uname+"goods")){
//                 var cartArr=JSON.parse(localStorage.getItem(uname+"goods"));
//                 var flag=false;//默认该商品还没有加入购物车
//                 for(var i=0;i<cartArr.length;i++){
//                     if(cartArr[i].bid==bid){
//                         cartArr[i].num++;
//                         flag=true;//加入购物车;
//                         break;
//                     }
//                 }
//                 if(!flag){//该商品没有加入购物车就新加进去
//                     cartArr.push({bid:bid, num:1});
//                 }
//                 // if(!!uname){
//                 //     localStorage.setItem(uname+"goods",JSON.stringify(cartArr));
//                 // }else{
//                 //     localStorage.setItem("goods",JSON.stringify(cartArr));
//                 // }
//                 localStorage.setItem(uname+"goods",JSON.stringify(cartArr));
//                 
//             }else{
//                 // if(!!uname){
//                 //     localStorage.setItem(uname+"goods",JSON.stringify(goodsArr));
//                 // }else{
//                 //     localStorage.setItem("goods",JSON.stringify(goodsArr));
//                 // }
//                 localStorage.setItem(uname+"goods",JSON.stringify(goodsArr));
//             }
//             _this.showWord($(this));
//             return false;
// 
//         })
//         
//     }
// 
//     showWord(the){
//         //console.log(the);
//         the.parent().parent().find(".buy").fadeIn("slow").delay(500).fadeOut("slow");
//         //console.log(the.parent().parent().find(".buy").html());
//     }
//     getSearchName(){
//         var s=decodeURIComponent(location.search)
//         console.log(s);
//         if(!!s){
//             var arr=s.substr(1).split("&");
//             console.log(arr);
//             var uname=arr[0].split("=")[1];
//             //console.log(uname);
//             //this.userHead.find("dt").html(uname);
//         }
//         return uname;
//     }

}