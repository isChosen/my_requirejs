
/*	create by lcs 2017-8-24 23:26:00
	version: RequireJS 2.3.5
*/

/*入口脚本 main.js*/

/*	comments:
	1.	符合 AMD 规范编程: main.js, common.js, otherMethod2.js;
		不符合 AMD 规范编程: method.js, otherMethod.js

	2.	a.	符合 AMD 的依赖：使用 require.config() 方法的两个属性：baseUrl 和 paths 即可完成依赖关系;
		b.	另一种依赖模块：如 line96;
		依赖关系：main <-----> common <-----> otherMethod2

	3.	定义模块后两种导出模块的方式：return 和 exports 分别见 common.js 和 otherMethod2.js,
		return 作为常规导出方式，用 exports 导出方式时，在定义模块时需要依赖其预定义模块 exports;

	4.	符合 AMD 的 js 可以依赖 不符合 AMD 的 js: 使用属性 shim;

	5.	不符合 AMD 的 js 在被依赖进同一个 js(如：main.js) 的情况下，可以相互引用(method.js 可以用 otherMethod.js 的方法),
		换种说法: main 依赖 method, method 用到 otherMethod 中的 consolePrint 方法，就可以依赖 otherMethod 进来;

	6.	依赖关系：
																	<被依赖进一个AMD脚本后>
		main <-----> common <-----> otherMethod2 <----- method <—— —— —— —— —— —— —— —— —— —— ——> otherMethod;

	7.	某个 js 中的全局变量，为了其变量可操作，都应该放在一个全局对象内。

	*说明：
		1.	此项目用到 ajax, 需要在服务器上运行，本人用的 xampp 本地服务器;
		2.	参考文章：http://www.cnblogs.com/HCJJ/p/6611669.html

*/

// 主模块 main.js 模块依赖配置
require.config({
	baseUrl: 'js/',
	paths: {
		'jquery': 'lib/jquery-1.12.3.min',
		'common': 'common'
	},
	shim: {
		'method': {
			deps: ['otherMethod'], // method 用到 otherMethod 中的一个打印方法，在此处引入
			init: function() {
				return {
					'v': v, // method 中的全局对象
					'showColor': showColor, // method 中的全局函数，以下同
					'showWeight': showWeight,
					'sayHello': sayHello
				}
			}
		}
	}
});

require(['jquery', 'common', 'method'], function($, common, method) {
	// (即使 method.js 没有在 config 里配置而是单独引进来，也会与 baseUrl 拼接)

	$(function() {
		// 页面初始化加载头部导航栏
		common.loadNavigator();

		// 头部导航栏点击切换Tab(请求加载回来的片段，事件同样需要挂代理)
		$('#nav').on('click', '#ulItem li', function() {
			$(this).addClass('active').siblings().removeClass('active');
		});

		// 点击 request data 按钮, 加载 mock 数据列表
		$("#cont .show_mock_data").click(function() {
			$.ajax({
				url: './mocks/myData.json',
				type: 'GET',
				dataType: 'json'
			})
			.fail(function() {
				console.log("mockData load  error !");
			})
			.done(function(result) {
				//console.log(result);
				var olHtml = '';
				$.each(result.resJson, function(index, item) {
					olHtml += "<li style='font-size: "+ method.showWeight(item.dataNo).s +";"+
								"font-weight: "+ method.showWeight(item.dataNo).w +"; color: "+
								method.showColor(item.status).color +"'>"+ item.content +"</li>";
				});
				$("#cont .other ol").html(olHtml);
			});
			
		});
		
		// 页面初始化，打印 method.js 中初始化的 v.variable
		console.log("初始化的 method.v.variable: "+ method.v.variable);


		// 执行非 AMD 编程标准模块中的方法
		method.sayHello('world', 'javascript', 'require');

		// 符合 AMD 标准的 otherMethod2 的另一种依赖方式
		require(['otherMethod2'], function(otM) {
			otM.amazingHa();
		});

		// 执行完 request data 按钮的点击事件后，variable 的值发生改变;
		// 点击 print method global variable 按钮，打印 method 中的全局变量 variable
		$("#cont .print_mess").click(function() {
			console.log("改变后的 method.v.variable: "+ method.v.variable);
		});
	})
});