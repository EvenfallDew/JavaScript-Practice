"use strict";

var btn = document.querySelectorAll(".page a");
var pic = document.querySelectorAll("img");
var picIndex = 0;
var timer;
sliderPlay(picIndex);
autoPlay();

var clickBtn = document.querySelectorAll(".click a");
sliderClick(clickBtn[0], false);
sliderClick(clickBtn[1], true);

//注册鼠标事件
for (let i = 0; i < btn.length; i++) {
    btn[i].addEventListener("mouseover", function () {  //鼠标移入
        sliderPlay(i);  //显示图片和页码
        picIndex = i;   //图片索引
        clearInterval(timer);   //清楚定时器暂停播放
    });
    btn[i].addEventListener("mouseout", function () {   //鼠标移出
        autoPlay(); //继续播放
    });
}

//图片显示
function sliderPlay(i) {
    for (let i = 0; i < btn.length; i++) {  //遍历所有页码
        btn[i].className = "";  //情况选中样式
    }
    btn[i].className = "on";    //样式设为on 显示
    for (let i = 0; i < pic.length; i++) {  //遍历所图
        pic[i].style.opacity = "0"; //全设定完全透明
    }
    pic[i].style.opacity = "1"; //该张设置为不透明
}

//自动播放
function autoPlay() {
    timer = setInterval(() => { //计时器
        picIndex = picIndex + 1;    //下一张
        sliderPlay(picIndex % 3)    //显示
    }, 2500);   //每2.5秒执行一次
}

//点击切图
function sliderClick(element, right) {
    element.addEventListener("click", function () { //注册点击事件
        for (let i = 0; i < pic.length; i++) {  //遍历图片
            if (pic[i].style.opacity == "1") {  //判断哪张图片不透明，即在显示
                if (right == true) {    //如果是向右
                    i = i + 1;  //索引+1下一张
                } else {    //否则向左
                    i = i - 1;  //上一张图的索引
                    if (i == -1) {  //如果索引减为了-1，不存在
                        i = 2;  //直接转到最后一张
                    }
                }
                sliderPlay(i % 3);  //轮播
            }
        }
    });
}