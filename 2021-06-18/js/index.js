"use strict";

function backToTop(element, speed, appear = false, appearValue = 0) {
    element.addEventListener("click", function () { //注册点击事件
        var y = scrollY;    //获取滚动条此时y值
        var timer = setInterval(function () {   //创建定时器
            y = y - speed;  //滚动条每10毫秒减少speed值 即向上滚动的值
            scrollTo(0, y);   //滚起来
            if (y <= 0) {   //滚动条y值小于等于0 即到顶
                clearInterval(timer);   //清空计时器
            }
        }, 10);
    });
    if (appear == true) {    //如果要到位置出现
        addEventListener("scroll", function () {    //注册滚动条事件
            if (scrollY > appearValue) {    //当前位置y值大于出现位置值
                element.style.display = "block";    //出现
            } else {
                element.style.display = "none";     //否则不出现
            }
        });
    }
}

var returnTop = document.querySelector(".return-top");
backToTop(returnTop, 50, true, 300);