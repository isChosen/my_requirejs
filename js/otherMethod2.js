

/*符合 AMD 规范编程*/
// 无依赖的模块定义
define(function() {

	function amazingHa() {
		console.log('这是来自 "otherMethod2.js amazingHa" 方法的一句话 !');
	};

	return {
		"amazingHa": amazingHa
	}
})