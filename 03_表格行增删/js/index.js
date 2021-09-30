"use strict";

// 预设数据
const dataList = [
	{
		num: 1,
		name: "黄滑",
		age: 10,
		intro: "嘤嘤嘤",
	},
	{
		num: 2,
		name: "红滑",
		age: 20,
		intro: "呜呜呜",
	},
];

// 获取元素
let content = document.querySelector("#content");
let addBox = document.querySelector("#addBox");
let addCont = document.querySelector("#addCont");
let inps = document.querySelectorAll(".inp");
let dataHTML = "";
let deleteHTML = '<button id="deleteBtn" class="delete-btn" type="button">删除</button>';
let confirmNum = 0;

// 渲染预设
const dataShow = () => {
	dataList.forEach((v) => {
		dataHTML += `
            <tr>
                <td>${v.num}</td>
                <td>${v.name}</td>
                <td>${v.age}</td>
                <td>${v.intro}</td>
                <td>${deleteHTML}</td>
            </tr>
        `;
	});
	content.innerHTML = dataHTML;
};
dataShow();

// 打开弹窗
document.querySelector("#addBtn").addEventListener("click", () => {
	addBox.style.display = "block";
	// 清空上次输入内容
	addCont.reset();
});

// 关闭弹窗
document.querySelector("#closeBtn").addEventListener("click", () => {
	addBox.style.display = "none";
});

// 提交内容
document.querySelector("#submitBtn").addEventListener("click", () => {
	// 获取内容并判断
	getContent();
	// 如果通过验证
	if (confirmNum == inps.length) {
		addBox.style.display = "none";
		// 执行添加
		addTr(content, getContent());
	}
	confirmNum = 0;
});

// 删除内容
content.addEventListener("click", (e) => {
	// 找到删除按钮
	if (e.target.id == "deleteBtn") {
		// 找到按钮所在的行，并删除该行
		e.path[2].remove();
	}
});

// 获取内容
const getContent = () => {
	let inpArr = [deleteHTML];
	// 获取输入的内容
	inps.forEach((v, i) => {
		checkInp(v.value.trim(), i);
		// 添加进数组
		inpArr.splice(-1, 0, v.value);
	});
	return inpArr;
};

// 添加行
const addTr = (targetElement, inputArray) => {
	// 创建一个行
	let tr = document.createElement("tr");
	// 创建单元格数组
	let tdArr = [];
	// 遍历输入的数组，创建数组内元素数量的单元格td
	inputArray.forEach((v, i) => {
		tdArr[i] = document.createElement("td");
		// 把数组内每个元素的值赋给td生成单元格
		tdArr[i].innerHTML = v;
		// 单元格们放入该行内
		tr.appendChild(tdArr[i]);
	});
	// 目标元素里添加tr
	targetElement.appendChild(tr);
};

// 简单非空验证
const checkInp = (val, i) => {
	if (val != "") {
		document.querySelectorAll(".inp-info")[i].style.display = "none";
		confirmNum = confirmNum + 1;
	} else {
		// 若为空显示提示信息
		document.querySelectorAll(".inp-info")[i].style.display = "block";
	}
};

// 复杂验证 晚上再写
