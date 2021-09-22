"use strict";

// 预设数据
const titleList = ["学号", "姓名", "年龄", "介绍", "操作"];
const dataList = [
	{
		num: 1,
		name: "黄滑",
		age: 30,
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
let title = document.querySelector("#title");
let content = document.querySelector("#content");
let addBox = document.querySelector("#addBox");
let addCont = document.querySelector("#addCont");
let deleteBtn = document.querySelector("#deleteBtn");

let titleHTML = "";
let dataHTML = "";
let deleteHTML = '<button id="deleteBtn" class="delete-btn" type="button">删除</button>';
let isConfirm = false;

// 渲染预设
const dataShow = () => {
	titleList.forEach((v) => {
		titleHTML += `
            <th>${v}</th>
        `;
	});
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
	title.innerHTML = titleHTML;
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
	addBox.style.display = "none";
	// 获取内容并执行添加
	addTr(content, getContent());
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
	let inpArr = [];
	// 获取输入的内容
	document.querySelectorAll(".inp").forEach((v) => {
		inpArr.push(v.value);
	});
	inpArr.push(deleteHTML);
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
