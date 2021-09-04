"use strict";
// 图片列表
const imgList = [
	{ pic: "./images/001.jpg" },
	{ pic: "./images/002.jpg" },
	{ pic: "./images/003.jpg" },
	{ pic: "./images/004.jpg" },
	{ pic: "./images/005.jpg" },
];
// 切换间隔
const intervalTime = 2000;
const animateTime = 12;

// 获取 元素
let swiperBox = document.querySelector("#swiperBox");
let imgListBox = document.querySelector("#imgListBox");
let indicatorBox = document.querySelector("#indicatorBox");
let arrowLeft = document.querySelector("#arrowLeft");
let arrowRight = document.querySelector("#arrowRight");
// 动态预设
imgListBox.style.width = (imgList.length + 1) * 100 + "%";
let imgHTML = "";
let indicatorHTML = "";
// 获取 宽度
let swiperBoxWidth = swiperBox.offsetWidth;
// 定时器
let timer = null;
// 当前索引
let index = 0;
// 节流阀
let isPlay = true;
// 渲染预设
swiperShow();

// 获取 图片
let images = document.querySelectorAll(".image");
// 图片 克隆第一张放到最后
imgListBox.appendChild(images[0].cloneNode(true));
// 获取 指示器
let indicators = document.querySelectorAll(".indicator");
// 指示器 第一个添加激活效果
indicators[0].classList.add("active");

// 预设 渲染
function swiperShow() {
	for (let i = 0; i < imgList.length; i++) {
		imgHTML += `
                <li class="image">
                    <img src="${imgList[i].pic}" alt="swiper_pic">
                </li>
            `;
		indicatorHTML += `
                <li class="indicator"></li>
            `;
	}
	imgListBox.innerHTML = imgHTML;
	indicatorBox.innerHTML = indicatorHTML;
	// 自动轮播
	swiperPlay();
}

// 轮播 开始
function swiperPlay() {
	timer = setInterval(() => {
		arrowRight.click();
	}, intervalTime);
}

// 鼠标 移入显示翻页按钮
swiperBox.addEventListener("mouseover", () => {
	arrowLeft.style.display = "block";
	arrowRight.style.display = "block";
	// 轮播 暂停
	clearInterval(timer);
});

// 鼠标 移出隐藏翻页按钮
swiperBox.addEventListener("mouseout", () => {
	arrowLeft.style.display = "none";
	arrowRight.style.display = "none";
	// 轮播 继续
	swiperPlay();
});

// 图片 切换
function changeItems(num = 1) {
	if (isPlay == true) {
		isPlay = false;
		// 当切换到复制的这一张图片时，不通过动画的方式快速切换到第一张
		if (num == -1 && index == 0) {
			index = imgList.length;
			imgListBox.style.left = -swiperBoxWidth * index + "px";
		}
		if (num == 1 && index == imgList.length) {
			index = 0;
			imgListBox.style.left = 0;
		}
		// 图片 切换动画
		index = index + num;
		animate(imgListBox, -index * swiperBoxWidth, () => {
			isPlay = true;
		});
		// 指示器 清除所有的样式
		for (let i = 0; i < indicators.length; i++) {
			indicators[i].classList.remove("active");
		}
		// 指示器 如果最后一张图后 给第一个添加激活样式
		if (index == indicators.length) {
			indicators[0].classList.add("active");
		} else {
			// 指示器 当前的添加激活样式
			indicators[index].classList.add("active");
		}
	}
}

// 翻页 上一张图
arrowLeft.addEventListener("click", () => {
	changeItems(-1);
});

// 翻页 下一张图
arrowRight.addEventListener("click", () => {
	changeItems();
});

// 指示器 点击切换图片
for (let i = 0; i < indicators.length; i++) {
	indicators[i].addEventListener("click", () => {
		// 指示器 清除所有的样式
		for (let j = 0; j < indicators.length; j++) {
			indicators[j].classList.remove("active");
		}
		// 指示器 当前的添加激活样式
		indicators[i].classList.add("active");
		// 图片 切换
		animate(imgListBox, -i * swiperBoxWidth);
		// 更新索引
		index = i;
	});
}

// 图片 切换动画
function animate(obj, target, callback) {
	// 清除上一个定时器 防止多次触发
	clearInterval(obj.timer);
	obj.timer = setInterval(() => {
		let step = (target - obj.offsetLeft) / 10;
		// 盒子向右移动时向上取整
		if (step > 0) {
			step = Math.ceil(step);
		} else {
			// 向左移动时向下取整
			step = Math.floor(step);
		}
		obj.style.left = obj.offsetLeft + step + "px";
		// 盒子到达指定位置
		if (obj.offsetLeft == target) {
			// 停下
			clearInterval(obj.timer);
			// 到达目标点再执行函数
			callback && callback();
		}
	}, animateTime);
}
