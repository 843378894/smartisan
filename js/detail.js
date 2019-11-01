$(document).ready(function(){
	class Detail{
		constructor(){
			this.pic=document.getElementById("pic");
			this.bigPic=document.getElementById("bigPic");
			this.mask=document.getElementById("mask");
			this.bigimg=document.getElementById("bigimg");
			this.color=$(".color");
			this.content=$(".content");
			this.circle=$(".circle");
			this.addtoshop=$(".addtoshop");
			this.uname=decodeURIComponent(location.search.substr(1).split("=")[1]);
		}
		init(){
			this.price;		
			//把content按钮传给购物车
			this.c;
			//动态更换手机的型号
			this.changeColor();
			//放大镜	
			this.picMousedown();
			//默认选中颜色黑色，容量为6G+64G
			this.morenClick()
			//数量选择
			this.numberClick();
			//加入购物车
			this.addtoshopClick();
			this.login();
			//this.getCookie(this.uname);
			
		}
		picMousedown(){
			var _this=this;
			
			this.pic.onmousedown=function(e){
				var e=window.event;
				_this.mask.style.display="block";
				_this.bigPic.style.display="block";
				
				
				_this.picMousemove();
				_this.picMouseup();
			}
		}
		picMousemove(){
			var _this=this;
			this.x;
			this.y;
			this.maxL=this.pic.clientWidth-this.mask.clientWidth;
			this.maxT=this.pic.clientHeight-this.mask.clientHeight;
			this.l;
			this.t;
			this.le;
			this.ri;
			document.onmousemove=function(e){
				//var e=window.event;
				_this.x=_this.mask.clientWidth;
				_this.y=_this.mask.clientHeight/2;
				
				//console.log(_this.mask.clientWidth)
				_this.l=e.clientX-_this.pic.offsetLeft-_this.x;
				_this.t=e.clientY-_this.pic.offsetTop-_this.y;				
								
				_this.l=_this.l<0?0:(_this.l>_this.maxL?_this.maxL:_this.l);
				_this.t=_this.t<0?0:(_this.t>_this.maxT?_this.maxT:_this.t);
				
				_this.le=_this.l*(_this.bigimg.clientWidth-_this.bigPic.clientWidth)/(_this.pic.clientWidth-_this.mask.clientWidth);
				_this.ri=_this.t*(_this.bigimg.clientHeight-_this.bigPic.clientHeight)/(_this.pic.clientHeight-_this.mask.clientHeight);
				
				_this.bigimg.style.left=-_this.le+"px";
				_this.bigimg.style.top=-_this.ri+"px";
				
				_this.mask.style.left=_this.l+"px";
				_this.mask.style.top=_this.t+"px";
				window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();			
			}	
		}
		
		picMouseup(){
			var _this=this;	
			document.onmouseup=function(){
				document.onmousemove=null;
				_this.mask.style.display="none";
				_this.bigPic.style.display="none";
			}
		}
		morenClick(){
			$(".black").attr("checked","true");
			//console.log(this.price);

		};
		colorClick(){
			var _this=this;
			this.color.on("click","ul>li>a",function(){
				//$(this).attr("class");
				$(this).css({
					borderColor:"#666"
				}).parent().siblings().find("a").css({
					borderColor:"#B6B6B6"
				});
				$("#pic>img").attr({
					src:"../images/klf-"+$(this).attr("class")+".webp",
				});
				$("#bigPic>img").attr({
					src:"../images/klf-"+$(this).attr("class")+"-big.webp",
				});
				$(".scolor").html($(this).next("i").html());
				
			});
		};
		contentClick(){
			var _this=this;
			this.cbid;
			this.content.on("click","ul>li",function(){
				$(".scontent").html($(this).find("i").html());
				_this.c=$(this).find("i").attr("class");

				$(".circle i").html(1);
				//获取cbid
				_this.cbid=$(this).find("input").val();
				//alert(_this.cbid);

				//alert(_this.c);
				$(this).css({
					border: "1px solid blue",
					borderRadius: "8px",
				}).siblings().css({
					border: "1px solid #E8E8E8",
					borderRadius: "8px",
				});
				
				if($(this).find("i").html()=="4G+64GB"){
					_this.price=1798;
				}else if($(this).find("i").html()=="6G+64GB"){
					_this.price=1998;
				}else{
					_this.price=2298;
				}
				_this.allMoney();
			});
			return this.price;
		};
		numberClick(){
			var _this=this;
			this.circle.on("click","span",function(e){
				// _this.setLocal();
				//alert($(".circle i").html());
				if($(".circle i").html()>1 && $(this).attr("class")=="lower"){
					$(".circle i").html(Number($(".circle i").html())-1);
					if($(".circle i").html()<2){
						$(this).css({
						   cursor:"no-drop",
						   background:"#fff"
						});
				   }
				   
			   };	
				if($(this).attr("class")=="upper"){
					$(".circle i").html(Number($(".circle i").html())+1);
				}
				window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
				_this.allMoney();
			});
			$(".lower").mouseover(function(){
				if($(".circle i").html()==1){
					$(this).css({
					   cursor:"no-drop",
					   background:"#fff"
					})
			   }else{
				$(this).css({
					cursor:"pointer",
					background:"#E8E8E8"
				 })
			   };
			});
			
		}

		allMoney(){
			
			$(".goods>p>i").html(this.price*Number($(".circle i").html()));
			$(".goods-right>i>span").html(this.price*Number($(".circle i").html()));
			//console.log(this.price,this.change);
		}
		addtoshopClick(){
			var _this=this;
			this.addtoshop.click(function(){
				$("#buy").show("slow").delay(2000).fadeOut(500);
				document.cookie="dname="+$(".title h1").html()+",dprice="+_this.c+",dnum="+$(".circle>i").html();
				//console.log(document.cookie);
				_this.setLocal(_this.uname);
			});
		}

		setLocal(uname){
			var goodsArr=[
                {
                    // goodsName:goodsName,
                    bid:this.cbid,
                    num:Number($(".circle i").html())
                }
			];
			//!!localStorage.getItem(uname + "goods")
			
			if(!!localStorage.getItem(uname+"goods")){  //当有localstorage
				var cartGoods=JSON.parse(localStorage.getItem(uname+"goods"));

				var flag=false; //bid不存在
				for(var i=0;i<cartGoods.length;i++){
					if(cartGoods[i].bid==this.cbid){  //bid存在时
						cartGoods[i].num+=Number($(".circle i").html());
						flag=true;
						//alert(cartGoods[i].num);						
					} 
								
				}
				if(!flag){ //bid不存在，把序列push进cartGoods中	
					cartGoods.push({bid:this.cbid,num:Number($(".circle i").html())});
				}
				localStorage.setItem(uname+"goods",JSON.stringify(cartGoods));
			}else{//localstorage不存在，则要setlocalstorage
				localStorage.setItem(uname+"goods",JSON.stringify(goodsArr));
			}
			
			
		}
		login(){//通过token得到uName
			var uname = this.getCookie("token");
			$.post("../app.php",
			{
				name:uname
			},function(data,status){//data值为后台通过查询token的value值返回的uname
				if(!!uname&&!location.search){//若url不显示用户名则自动补齐
					location.href="detail.html?uName="+data;
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
		changeColor(){
			this.change=localStorage.getItem("k-color");
			// console.log(localStorage.getItem("k-color"));
			if(this.change=="klfr1-blue"){
				this.pro1();
				this.r1contentClick();
				this.r1colorClick();
			}else{
				this.contentClick();
				this.colorClick();
			}
		}
		pro1(){
			//放大镜改变
			$("#pic>img").attr({
				src:"../images/klfr1-blue.webp",
			});
			$("#bigPic>img").attr({
				src:"../images/klfr1-blue-big.webp",
			});
			//价格改变
			$(".content .c1").html("6G+64GB");
			$(".content .c2").html("6G+128GB");
			$(".content .c3").html("8G+128GB");
			$(".color ul").css({
				height:90
			});
			$(".goods-right>i>span").html("2999");
			$(".red").parent().css({
				display:"none",
			})
			$(".white").parent().css({
				marginTop:0,
			});
			$(".title h1").html("坚果&ensp;Pro&ensp;R1");
			$(".scolor").html("蓝色");
			$(".goods>p>span").html("坚果&ensp;Pro&ensp;R1");
			$(".title h2").html("次世代旗舰手机，内藏来自未来的“电脑”");
			$(".content .c2").parent().css({
				border: "none"
			});
			$(".content .c1").parent().css({
				border: "1px solid blue",
			})
			$(".content li").eq(0).find("input").val(4);
			$(".content li").eq(1).find("input").val(5);
			$(".content li").eq(2).find("input").val(6);
		}
		r1contentClick(){
			var _this=this;
			this.content.on("click","ul>li",function(){
				$(".scontent").html($(this).find("i").html());
				_this.c=$(this).find("i").attr("class");
				_this.cbid=$(this).find("input").val();
				
				$(".circle i").html(1);
				$(this).css({
					border: "1px solid blue",
					borderRadius: "8px",
				}).siblings().css({
					border: "1px solid #E8E8E8",
					borderRadius: "8px",
				});
				
				if($(this).find("i").html()=="6G+64GB"){
					_this.price=2999;
				}else if($(this).find("i").html()=="6G+128GB"){
					_this.price=3299;
				}else{
					_this.price=3799;
				}
				_this.allMoney();
			});
			return this.price;
		}
		r1colorClick(){
			var _this=this;
			this.color.on("click","ul>li>a",function(){
				//$(this).attr("class");
				$(this).css({
					borderColor:"#666"
				}).parent().siblings().find("a").css({
					borderColor:"#B6B6B6"
				});
				$("#pic>img").attr({
					src:"../images/klfr1-"+$(this).attr("class")+".webp",
				});
				$("#bigPic>img").attr({
					src:"../images/klfr1-"+$(this).attr("class")+"-big.webp",
				});
				$(".scolor").html($(this).next("i").html());
				
			});
		}


		
	}
	
	
	
	
	
	
	new Detail().init();

	jQuery.cookie = function (name, value, options) {
        if (typeof value != 'undefined') { // name and value given, set cookie
            options = options || {};
            if (value === null) {
                value = '';
                options = $.extend({}, options); // clone object since it's unexpected behavior if the expired property were changed
                options.expires = -1;
            }
            var expires = '';
            if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
                var date;
                if (typeof options.expires == 'number') {
                    date = new Date();
               
                    date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
                } else {
                    date = options.expires;
                }
                expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
            }
            // NOTE Needed to parenthesize options.path and options.domain
            // in the following expressions, otherwise they evaluate to undefined
            // in the packed version for some reason...
            var path = options.path ? '; path=' + (options.path) : '';
            var domain = options.domain ? '; domain=' + (options.domain) : '';
            var secure = options.secure ? '; secure' : '';
            document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
        } else { // only name given, get cookie
            var cookieValue = null;
            if (document.cookie && document.cookie != '') {
                var cookies = document.cookie.split(';');
                for (var i = 0; i < cookies.length; i++) {
                    var cookie = jQuery.trim(cookies[i]);
                    // Does this cookie string begin with the name we want?
                    if (cookie.substring(0, name.length + 1) == (name + '=')) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
        }
    };
});


//window.onload=function(){
	
	// class Detail{
	// 	constructor(){
	// 		this.pic=document.getElementById("pic");
	// 		this.bigPic=document.getElementById("bigPic");
	// 		this.mask=document.getElementById("mask");
	// 		this.bigimg=document.getElementById("bigimg");
	// 		this.color=$(".color");
	// 	}
	// 	init(){
	// 		//放大镜	
	// 		this.picMousedown();
	// 		//换颜色
	// 		this.colorClick()
	// 	}
	// 	picMousedown(){
	// 		var _this=this;
			
	// 		this.pic.onmousedown=function(e){
	// 			var e=window.event;
	// 			_this.mask.style.display="block";
	// 			_this.bigPic.style.display="block";
				
				
	// 			_this.picMousemove();
	// 			_this.picMouseup();
	// 		}
	// 	}
	// 	picMousemove(){
	// 		var _this=this;
	// 		this.x;
	// 		this.y;
	// 		this.maxL=this.pic.clientWidth-this.mask.clientWidth;
	// 		this.maxT=this.pic.clientHeight-this.mask.clientHeight;
	// 		console.log(this.maxL,this.maxT)
	// 		this.l;
	// 		this.t;
	// 		this.le;
	// 		this.ri;
	// 		document.onmousemove=function(e){
	// 			//var e=window.event;
	// 			_this.x=_this.mask.clientWidth;
	// 			_this.y=_this.mask.clientHeight/2;
				
	// 			//console.log(_this.mask.clientWidth)
	// 			_this.l=e.clientX-_this.pic.offsetLeft-_this.x;
	// 			_this.t=e.clientY-_this.pic.offsetTop-_this.y;				
	// 			// _this.l=e.clientX-_this.pic.offsetLeft-_this.x;
	// 			// _this.t=e.clientY-_this.pic.offsetTop-_this.y;
	// 			//console.log(_this.l,_this.t);
								
	// 			_this.l=_this.l<0?0:(_this.l>_this.maxL?_this.maxL:_this.l);
	// 			_this.t=_this.t<0?0:(_this.t>_this.maxT?_this.maxT:_this.t);
				
	// 			_this.le=_this.l*(_this.bigimg.clientWidth-_this.bigPic.clientWidth)/(_this.pic.clientWidth-_this.mask.clientWidth);
	// 			_this.ri=_this.t*(_this.bigimg.clientHeight-_this.bigPic.clientHeight)/(_this.pic.clientHeight-_this.mask.clientHeight);
	// 			console.log(_this.le,_this.ri);
				
	// 			_this.bigimg.style.left=-_this.le+"px";
	// 			_this.bigimg.style.top=-_this.ri+"px";
				
	// 			_this.mask.style.left=_this.l+"px";
	// 			_this.mask.style.top=_this.t+"px";
	// 			window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();			
	// 		}	
	// 	}
		
	// 	picMouseup(){
	// 		var _this=this;	
	// 		document.onmouseup=function(){
	// 			document.onmousemove=null;
	// 			_this.mask.style.display="none";
	// 			_this.bigPic.style.display="none";
	// 		}
	// 	}
	// 	colorClick(){
	// 		var _this=this;
	// 		alert("1");
	// 		this.color.on("click","ul>li>a",function(){
	// 			alert("1");
	// 		})
	// 	}
	// }
	
	
	
	
	
	// new Detail().init();
//}