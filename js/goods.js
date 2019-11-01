
window.onload=function(){
    new GoodsLoading().init();
}
class GoodsLoading{
    constructor(){
        this.goodsList=$(".goodsList");
        this.uname=decodeURIComponent(location.search.substr(1).split("=")[1]);//获取登录状态时的用户名
        this.deleteChck=$(".sta_1_2");//删除选中的商品
    }
    init(){
     
        this.login();
        this.goodsShow();
        
    }
    


    login(){//通过token得到uName
        var uname = this.getCookie("token");
        $.post("../app.php",
        {
            name:uname
        },function(data,status){//data值为后台通过查询token的value值返回的uname
            if(!!uname&&!location.search){//若url不显示用户名则自动补齐
                location.href="goods.html?uName="+data;
            }else{
            }
        });
    }
    getCookie(name){//通过name得到指定cookie的value值
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr=document.cookie.match(reg))
            return unescape(arr[2]);
        else
            return null;
        }

    goodsShow(){
        var _this=this;
        //var uname=_this.getSearchName();
        if(!!localStorage.getItem(this.uname+"goods")){
            var cartArr=JSON.parse(localStorage.getItem(this.uname+"goods"));
            console.log(cartArr);
        }
        $.getJSON("../goods.json",function(res){
            console.log(res);
            var cartStr="";
            $.each(res,function(i,gEle){
                $.each(cartArr,function(index,cEle){
                    if(gEle.bid==cEle.bid){
                        cartStr+=`
                            <div class="sub clearfix">
                                <div class="sub_0">
                                    <div>
                                        <input type="checkbox" class="one">
                                    </div>

                                </div>
                                <input type="hidden" value="${cEle.bid}" class="gBid"/>
                                <div class="sub_1">
                                    <a href="#" title="彩虹数据线"><img src="${gEle.img}"></a>
                                </div>
                                <div class="sub_2">
                                    <a href="#">${gEle.name1}</a>
                                    <span>${gEle.name2}</span>
                                </div>
                                <div class="sub_3">
                                    <span>¥</span>
                                    <span>${gEle.pirce}</span>
                                </div>
                                <div class="sub_4">
                                    <span class="sub_4_1 minus" onselectstart="return false;"><i
                                            class="iconfont icon-jianhao"></i></span>
                                    <span class="sub_4_2" onselectstart="return false;">${cEle.num}</span>
                                    <span class="sub_4_1  sub_4_3 add" onselectstart="return false;"><i
                                            class="iconfont icon-jiahao"></i></span>

                                </div>
                                <div class="sub_5">
                                    <span>¥</span>
                                    <span class="oneprice">${gEle.pirce*cEle.num}.00</span>
                                    <p>已优惠 <span>¥</span><span>0.00</span></p>
                                </div>
                                <div class="sub_6">
                                    <span class="delete"><i class="iconfont icon-shanchu"></i></span>
                                </div>
                            </div>
                        `;
                    }
                })
            });
            _this.goodsList.html(cartStr);
            new ComputeCart(_this.uname).init();;
        })
    }
    // getSearchName(){//获取登录状态时的用户名
    //     var s=decodeURIComponent(location.search)
    //     console.log(s);
    //     if(!!s){
    //         var arr=s.substr(1).split("&");
    //         console.log(arr);
    //         var uname=arr[0].split("=")[1];
            
    //     }
    //     return uname;
    // }

}

class ComputeCart{
    constructor(uname){
        this.minus=$(".minus");
        this.add=$(".add");
        this.uname=uname;
        this.all=$(".all");//全选
		this.one=$(".one");//单个
        this.unAll=$(".unAll");//全不选
        this.one=null;
        this.allNum=$(".allNum");
        this.allPrice=$(".allPrice");
        this.sub=null;
        this.allSum=$(".allSum");
    }
    init(){
        this.getEle();
        this.subClick();
        this.addClick();
        this.allCheckbox();
        this.unAllCheckbox();
        this.checkOne();
        this.deleteChecked();//删除选中的商品
        this.del();
        this.allSum.html(this.computeAllNum());
        this.subCss();
    }
    getEle(){
        this.one=$(".one");
        this.sub=$(".sub");
    }

    subClick(){//点击减号事件
        var _this=this;
        this.minus.click(function(){
            var num=_this.computeSum($(this));
            var gBid=$(this).parent().parent().find(".gBid").val();
            //console.log(num);
            _this.updateGoods(gBid,num);
            _this.allNum.html(_this.computeNum());
            _this.allPrice.html(_this.computePrice()+".00");
            if(num==1){
                $(this).css({
                    "cursor":"not-allowed",
                    "background":"#ccc"
                });
                return false;
            }
            _this.allSum.html(_this.computeAllNum());
        })
    }
    subCss(){
        this.sub.each(function(index,ele){
            if($(ele).find(".sub_4_2").html()==1){
                $(ele).find(".sub_4_2").prev().css({
                    "cursor":"not-allowed",
                    "background":"#ccc"
                })
            }else{
                $(ele).find(".sub_4_2").prev().css({
                    "cursor":"pointer",
                    "background":"#fff"
                })
            }
        })
    }
    addClick(){//点击加号事件
        var _this=this;
        this.add.click(function(){
            var gBid=$(this).parent().parent().find(".gBid").val();
            //console.log(gBid);
            $(this).prev().prev().css({
                "cursor":"pointer",
                "background":"#fff"
            });
            var num=Number($(this).parent().find(".sub_4_2").html())+1;
            _this.updateGoods(gBid,num);
            $(this).parent().find(".sub_4_2").html(num);
            var price=$(this).parent().prev().find("span").eq(1).html()*num;
            $(this).parent().next().find("span").eq(1).html(price+".00");
            _this.allNum.html(_this.computeNum());
            _this.allPrice.html(_this.computePrice()+".00");
            _this.allSum.html(_this.computeAllNum());
        })
    }
    computeSum(obj){//计算单击加号和减号单个的数量和价格
        var num;
        if(obj.parent().find(".sub_4_2").html()==1){
            num=1;
        }else{
            num=Number(obj.parent().find(".sub_4_2").html())-1;
        }
        
        obj.parent().find(".sub_4_2").html(num);
        var price=obj.parent().prev().find("span").eq(1).html()*num;
        console.log(price);
        obj.parent().next().find("span").eq(1).html(price+".00");
        return num;
    }
    updateGoods(bid,num){
        var goodsCart=JSON.parse(localStorage.getItem(this.uname+"goods"));
        //console.log(goodsCart);
        for(var i=0;i<goodsCart.length;i++){
            if(goodsCart[i].bid==bid){
                goodsCart[i].num=num;
                break;
            }
        }
        localStorage.setItem(this.uname+"goods",JSON.stringify(goodsCart));
    }
    //全选
    allCheckbox(){
        var _this=this;
        this.all.click(function(){
            _this.one.prop("checked", true);
            //选择后禁止点击
            $(this).prop("disabled", true);
            //全选点击后解除全不选禁止状态和可以选择的状态
            _this.unAll.prop("disabled", false).prop("checked", false);
            _this.allNum.html(_this.computeNum());
            _this.allPrice.html(_this.computePrice()+".00");
        });
    }
    //全不选
    unAllCheckbox(){
        var _this=this;
        this.unAll.click(function(){
            _this.one.prop("checked", false);
            //选择后禁止点击
            $(this).prop("disabled", true);
            //全不选点击后解除全选禁止状态和可以选择的状态
            _this.all.prop("disabled", false).prop("checked", false);
            _this.allNum.html(_this.computeNum());
            _this.allPrice.html(_this.computePrice()+".00");
        });
    }

    //单个选择
    checkOne(){
        var _this=this;
        this.one.click(function(){
            var checkOK=false;//所有的都没被选中了
            var checkNO=false;//所有的都被选中
            _this.one.each(function(index,ele){
                if($(ele).prop("checked")){
                    checkOK=true;
                }else{
                    checkNO=true;
                }
            });
            if(checkOK){
                _this.unAll.prop("disabled",false).prop("checked",false);
            }else{
                _this.unAll.prop("cheked",false);
            }
            if(!checkNO){//所有的都被选中了
                _this.all.prop("disabled",true).prop("checked",true);
            }else{//最少有一个未被选中
                _this.all.prop("disabled",false).prop("checked",false);
            }
            _this.allNum.html(_this.computeNum());
            _this.allPrice.html(_this.computePrice()+".00");
        })
    }

    del() {
        var _this = this;

        $(".delete").click(function() {
            var gBid = $(this).parent().parent().find(".gBid").val();
            //console.log(gBid);
            _this.removeCarts(gBid)
            $(this).parent().parent().remove();
            _this.getEle();//重新获取元素
            _this.allNum.html(_this.computeNum());
            _this.allPrice.html(_this.computePrice()+".00");
            _this.allSum.html(_this.computeAllNum());
        });
        //localStorage.setItem(this.uname + "goods");
    }
    removeCarts(bid) {
        var goodsCart = JSON.parse(localStorage.getItem(this.uname + "goods"));
        //console.log(goodsCart);
        for (var i = 0; i < goodsCart.length; i++) {
            if (goodsCart[i].bid == bid) {
                goodsCart.splice(i, 1);
                break;
            }
        }
        localStorage.setItem(this.uname + "goods", JSON.stringify(goodsCart));
    }

    deleteChecked(){
        var _this=this;

        $(".sta_1_2").click(function(){
            for(var i=0;i<$(".one").length;i++){
                if(_this.one.eq(i).prop("checked")){
                    _this.one.eq(i).parent().parent().parent().remove();
                    
                    console.log(i)
                    _this.removeCarts(_this.one.eq(i).parent().parent().parent().find(".gBid").val());
                }
            }
            _this.getEle();
            _this.allNum.html(0);
            _this.allPrice.html(0.00);
            _this.allSum.html(_this.computeAllNum());
        });
    }

    computeNum(){//计算选中的数量
        var numSum=0;
        this.one.each(function(index,ele){
            //console.log($(this).parent().parent().parent().find(".sub_4_2").html())
            if($(ele).prop("checked")){
                numSum+=Number($(this).parent().parent().parent().find(".sub_4_2").html());
            }
        })
        return numSum;
    }

    computePrice(){//计算总价
        var tPrice=0;
        this.one.each(function(index,ele){
            if($(ele).prop("checked")){
                tPrice+=Number($(this).parent().parent().parent().find(".oneprice").html());
                //console.log("1"+tPrice);
            }
        })
        return tPrice;
    }
    computeAllNum(){//计算所有商品
        var allSum=0;
        this.sub.each(function(index,ele){
            //console.log($(".sub_4_2").html())
            allSum+=Number($(ele).find(".sub_4_2").html());
        })
        return allSum;
    }

}
