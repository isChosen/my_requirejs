
/* 符合 AMD 规范编程 */
/* Commone Method */

// common.js 模块依赖配置
require.config({
	baseUrl: 'js/',
	paths: {
		'jquery': 'lib/jquery-1.12.3.min',
	}
});

// 定义 common 模块
define(['jquery', 'exports'], function($, exports) {
	// 加载头部导航栏
	function loadNavigator() {
		$.ajax({
			url: './tmp/htm.html',
			type: 'GET',
			dataType: 'html'
		})
		.fail(function() {
			console.log("html fragment load  error !");
		})
		.done(function(result) {
			//console.log(result);
			$('#nav').html(result);
		});
	}
		exports.loadNavigator = loadNavigator;

});