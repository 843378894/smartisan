$(document).ready(function(){
        $(function() {
            //代码初始化
            var len = $(".img li").length;
            for (var i = 1; i <= len; i++) {
                var li = document.createElement('li');
                $(".num").append(li);
            };
            //手动控制轮播效果
            $(".img li").eq(0).show();
            $(".num li").eq(0).addClass("active");
            $(".num li").mouseover(function() {
                    $(this).addClass("active").siblings().removeClass("active");
                    var index = $(this).index();
                    i = index;
                    $(".img li").eq(index).fadeIn(300).siblings().fadeOut(300);
                })
                //自动
            var i = 0;
            var t = setInterval(move, 1500);
            //核心向左的函数
            function moveLeft() {
                i--;
                if (i == -1) {
                    i = len - 1;
                }
                $(".num li").eq(i).addClass("active").siblings().removeClass("active");
                $(".img li").eq(i).fadeIn(300).siblings().fadeOut(300);
            }
            //核心向右的函数
            function move() {
                i++;
                if (i == len) {
                    i = 0;
                }
                $(".num li").eq(i).addClass("active").siblings().removeClass("active");
                $(".img li").eq(i).fadeIn(300).siblings().fadeOut(300);
            }
            //定时器的开始与结束
            $(".out").hover(function() {
                    clearInterval(t);
                }, function() {
                    t = setInterval(move, 1500)
                })
                //左边按钮的点击事件
            $(".out .left").click(function() {
                    moveLeft();
                })
                //右边按钮的点击事件
            $(".out .right").click(function() {
                move();
            })

        })
});