
/* 不符合 AMD 规范编程 */
/* independent method */

var v = {
	variable: 'initial variable !'
};
// 设置字体颜色
function showColor(statusCode) {
	var cObj = {};
	switch (statusCode) {
		case 1:
			cObj.color = "#82BAF3";
			v.variable = 'case1';
			break;
		case 2:
			cObj.color = "#f00";
			v.variable = 'case2';
			break;
		case 3:
			cObj.color = "#00f";
			v.variable = 'case3';
			break;
		case 4:
			cObj.color = "#f0f";
			v.variable = 'case4';
			break;
		default: cObj.color = "#333";
	}
	return cObj;
}

// 设置字号，粗细
function showWeight(num) {
	var wObj = {};
	switch (num % 2) {
		case 1: wObj.w = 500; wObj.s = "14px"; break;
		default: wObj.w = 600; wObj.s = "21px";
	}
	return wObj;
}

// 此方法还引用到了 otherMethod.js 中的 consolePrint 函数
function sayHello() {
	console.log("method.js 打印的一句话!");
	console.log("以下三句问候语来自：otherMethod.js !");
	for (var i = 0, len = arguments.length; i < len; i++) {
		consolePrint(arguments[i]);
	}
}