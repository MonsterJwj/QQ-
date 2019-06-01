$(function () {
    //****************轮播图片****************
    var page = -1;  //设置第一个播放页
    var stop = false;  //控制轮播的播放
    var liWid = $(".silde>li")[0].offsetWidth;  //获取li的宽度
    var len = $(".silde>li").length;  //获取ul的长度

    //播放图片
    function slide(){
        // 如果非false  执行动画
        if (!stop){
            page++;
            // 如果page的值等于li的长度  就让page还从0开始
            if (page == len){
                page = 0;
                $(".silde").animate({"left":"0"},300);
            }
            $(".silde").animate({"left":"-"+liWid*page+"px"},500);
            $(".silde-page>li").removeClass("on");
            $(".silde-page>li").eq(page).addClass("on");
        }
        //每间隔三秒执行这个播放动画的函数
        setTimeout(slide,3000);
    }
    slide();

    //鼠标移入标题
    $(".silde-page>li").on("mouseover",function () {
        page = $(this).index();  //获取下标
        $(".silde").stop(true,true).animate({"left":"-"+page*liWid+"px"},300);
        $(".silde-page>li").removeClass("on");
        //为相应下表的li添加样式
        $(".silde-page>li").eq(page).addClass("on");
    });

    //鼠标移入与移出到轮播图
    $(".focus").hover(function () {
        stop = true;  //停止播放
    },function () {
        stop = false;   //开始播放
    });

    /*  利用scrollLeft来控制 但scrollLeft只能作用在他们的父级，下面的标题也会随之移动
    var focus = document.getElementsByClassName("focus")[0];
    var silde = document.getElementsByClassName("silde")[0];
    var lis = silde.getElementsByTagName("li");
    setInterval(function () {
        focus.scrollLeft++;
        if (focus.scrollLeft >= lis[0].offsetWidth*lis.length){
            focus.scrollLeft = 0;
        }
    },10);
    */




    //***************左侧菜单栏二级导航**********************
    $(".sec-mainNav>li").hover(function () {
        $(this).find(".menu-panel").show();
        //为其添加类名hover  改变它的背景色
        $(this).addClass("hover");
    },function () {
        $(this).find(".menu-panel").hide();
        //删除类名
        $(this).removeClass("hover");
    });

   //*********************高级搜索***************
    //高级搜索菜单的显示与隐藏
   $(".login").hover(function () {
       $(this).find(".search-all").css("overflow","visible");
       $(this).find(".search-all").stop(true,true).animate({opacity:"1",height:"140px"},500);
   },function () {
       $(this).find(".search-all").css("overflow","hidden");
       $(this).find(".search-all").stop(true,true).animate({opacity:"0",height:"0"},500);
       //a标签的二级菜单是可见时  当鼠标移开高级搜索菜单栏时 将a标签的二级菜单隐藏
       $(".search-all .btm:visible").hide();
   });
   //点击a标签时 显示二级菜单
   $(".search-all>a").on("click",function () {
       //如果元素是可见的  点击就让它隐藏；若不可见，点击让它显示并改变它的层级
       /*因为父元素设的overflow为hidden，当点击下面的a标签时，会把a标签的子菜单给隐藏掉；
       所以当让a标签的子元素显示出来的同时也让它的overflow设为可见（visible）*/
       if ($(this).find(".btm").is(":visible")){
           $(this).find(".btm").hide("fast");
           $(this).parent().css("overflow","hidden");
           $(this).css("zIndex","1");
       }else {
           //当这个a标签的二级菜单可见，点击另一个a标签时使这个a标签二级菜单隐藏
           $(".search-all .btm:visible").hide();
           $(this).find(".btm").show("fast");
           $(this).parent().css("overflow","visible");
           $(this).css("zIndex","5");
           //同时让它的同级的层级变小
           // $(this).siblings().css("zIndex","1");
       }
   });

    //*****************右侧广告、右侧菜单*******************
    //监听滚动条
    $(window).scroll(function () {
        //获取滚动条的垂直位置
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

        //*********右侧广告、右侧菜单的显示与隐藏**********
        if (scrollTop > 160){
            $(".ad").hide();
            $(".rightMenu").animate({bottom:"55px"},"slow");
        }else {
            $(".ad").show();
            //stop([clearQueue],[jumpToEnd]) 停止所有在指定元素上正在运行的动画。
            // 如果队列中有等待执行的动画(并且clearQueue没有设为true)，他们将被马上执行
            $(".rightMenu").stop(true).css("bottom","-134px");
        }
     });
    //返回顶部  事件
    $(".backTop").on("click",function () {
        //$("html,body") 实现整个页面的动画
        $("html,body").animate({"scrollTop":"0"},500);
    });

    //彩贝  微信的二级菜单
    $(".rightMenu .menu-edu").hover(function () {
        $(".edu-main").fadeIn("slow");
    },function () {
        $(".edu-main").fadeOut("slow")
    });
    $(".rightMenu .menu-wx").hover(function () {
        $(".edu-wx-img").fadeIn("slow");
    },function () {
        $(".edu-wx-img").fadeOut("slow")
    });
});