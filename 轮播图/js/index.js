"use strict";

window.addEventListener("load", () => {
	// 获取元素
	let swiperBox = document.querySelector("#swiperBox");
	let arrow_l = document.querySelector(".arrow_l");
	let arrow_r = document.querySelector(".arrow_r");
	let ul = swiperBox.querySelector("ul");
	let ol = swiperBox.querySelector("ol");

	// offsetWidth: 包含了边框和内边距的宽度
	let swiperBoxWidth = swiperBox.offsetWidth;

	// 鼠标移入时显示翻页按钮，否则隐藏翻页按钮
	swiperBox.addEventListener("mouseover", () => {
		arrow_l.style.display = "block";
		arrow_r.style.display = "block";
		// 鼠标移入时暂停轮播
		clearInterval(timer);
	});

	// 给swiperBox绑定鼠标移出事件
	swiperBox.addEventListener("mouseout", () => {
		arrow_l.style.display = "none";
		arrow_r.style.display = "none";
		timer = setInterval(() => {
			arrow_r.click();
		}, 2000);
	});

	// 2. 动态生成小圆点 当图片数量发生增减后，小圆点也会自动增减
	for (let i = 0; i < ul.children.length; i++) {
		// 创建小圆点里面的li
		let li = document.createElement("li");
		// 将创建的li添加到ol里面
		// appendChild: 父节点添加子节点
		ol.appendChild(li);
	}
	// 让第一个小圆点添加默认样式
	ol.children[0].className = "active";

	// 3. 点击右侧按钮 实现图片切换效果 以及 小圆圈的切换效果
	// 问题：因为我们是通过改变ul的左边偏移来实现图片切换的，而ul的宽度是固定的，总会切换到ul的尾部，如果这个时候再次点击箭头，就会出现空白
	// 解决方案一： 当已经去到ul的尾部时，再次点击箭头时，就强制让ul回到初始位置 但这种效果用户体验不好
	// 解决方案二： 通过无缝滚动的方式来实现
	// 实现思路：
	// 1. 将第一张图片复制一张放到最后
	// 2. 当切换到复制的这一张图片时，让ul不通过动画的方式快速切换到第一张
	// 3. 再通过动画的形式切换到第二张
	// 将第一张图片复制一张放到最后
	// cloneNode(): 克隆一个子节点 如果有参数true 就会将内容一起克隆
	let last = ul.children[0].cloneNode(true);
	ul.appendChild(last);
	let num = 0;
	let circle = 0;
	// 节流和防抖
	// 节流阀
	let flag = true;
	arrow_r.addEventListener("click", () => {
		if (flag) {
			flag = false;
			// 当切换到复制的这一张图片时，让ul不通过动画的方式快速切换到第一张
			if (num == ul.children.length - 1) {
				ul.style.left = 0;
				num = 0;
			}
			// 再通过动画的形式切换到第二张
			num++;
			animate(ul, -num * swiperBoxWidth, () => {
				flag = true;
			});
			// 小圆圈的切换效果
			// 先干掉其他
			for (let i = 0; i < ol.children.length; i++) {
				ol.children[i].className = "";
			}
			// 再给当前的小圆添加默认样式
			circle++;
			if (circle == ol.children.length) {
				circle = 0;
			}
			ol.children[circle].className = "active";
		}
	});
	// 4. 点击左侧箭头，实现图片切换和小圆点切换
	arrow_l.addEventListener("click", () => {
		// 当切换到第一张图片时，让ul不通过动画的方式快速切换到复制的那一张
		if (num == 0) {
			num = ul.children.length - 1;
			ul.style.left = -swiperBoxWidth * num + "px";
		}
		// 再通过动画的形式切换到倒数第二张
		num--;
		animate(ul, -num * swiperBoxWidth);
		// 小圆圈的切换效果
		// 先干掉其他
		for (let i = 0; i < ol.children.length; i++) {
			ol.children[i].className = "";
		}
		// // 再给当前的小圆添加默认样式
		circle--;
		if (circle < 0) {
			circle = ol.children.length - 1;
		}
		ol.children[circle].className = "active";
	});

	// 5. 点击小圆点实现图片切换
	for (let i = 0; i < ol.children.length; i++) {
		ol.children[i].addEventListener("click", () => {
			// 先干掉其他
			for (let j = 0; j < ol.children.length; j++) {
				ol.children[j].className = "";
			}
			// 给当前添加默认样式
			this.className = "active";
			// 图片跟随切换
			animate(ul, -i * swiperBoxWidth);
			// 点击切换小圆点之后，要将i赋值给num和circle
			num = i;
			circle = i;
		});
	}

	// 6. 自动切换轮播图
	let timer = setInterval(() => {
		//自动执行事件
		arrow_r.click();
	}, 1500);
});

function animate(obj, target, callback) {
	// 为了防止多次触发同一个定时器，应该先清掉上一个定时器，再开启新的定时器
	clearInterval(obj.timer);
	obj.timer = setInterval(() => {
		let step = (target - obj.offsetLeft) / 10;
		// 盒子向右移动时应该向上取整，向左移动时应该向下取整
		step = step > 0 ? Math.ceil(step) : Math.floor(step);
		obj.style.left = obj.offsetLeft + step + "px";
		// 当盒子去到指定位置时，就应该停下来
		if (obj.offsetLeft == target) {
			clearInterval(obj.timer);
			// 当到达目的地后，执行函数
			callback && callback();
		}
	}, 15);
}
