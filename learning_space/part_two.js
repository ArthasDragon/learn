//设计模式

//第四章   单例模式
// let __instance = (function() {
// 	let instance = null;
// 	return function(new_value) {
// 		if (new_value) {
// 			instance = new_value;
// 		}
// 		return instance;
// 	};
// })();
// class Singleton {
// 	constructor(name) {
// 		this.name = name;
// 		if (__instance()) {
// 			return __instance();
// 		}
// 		return __instance(this);
// 	}
// }
// let a = new Singleton("111");
// let b = new Singleton("222");
// console.log(a === b);

class Singleton {
	constructor(props) {
		this.name = props;
	}
	static getInstance(props) {
		if (!Singleton.instance) {
			Singleton.instance = new Singleton(props);
		}
		return Singleton.instance;
	}
}
let a = Singleton.getInstance("111");
let b = Singleton.getInstance("222");
console.log(a === b);

//不用于创建对象的单例
// const getSingle = function(fn) {
//   let result = null
//   return function() {
//     return result || (result = fn.apply(this, arguments))
//   }
// }
// let bindEvent = getSingle(function() {
//   document.getElementById('div1').onclick = function() {
//     alert('click')
//   }
//   return true
// })
// let render = function() {
//   console.log('开始渲染列表')
//   bindEvent()
// }
// render()
// render()
// render()

// 第五章   策略模式
let strategies = {
	S: function(salary) {
		return salary * 4;
	},
	A: function(salary) {
		return salary * 3;
	},
	B: function(salary) {
		return salary * 2;
	}
};
let calculateBonus = function(level, salary) {
	return strategies[level](salary);
};
console.log(calculateBonus("S", 20000)); // 输出：80000
console.log(calculateBonus("A", 10000)); // 输出：30000

//第六章    代理模式
let mult = function() {
	let a = 1;
	for (let i = 0, len = arguments.length; i < len; ++i) {
		a *= arguments[i];
	}
	return a;
};

let cacheProxy = function(fn) {
	let cache = {};
	return function() {
		let arr = Array.prototype.slice(arguments);
		if (cache.hasOwnProperty(arr)) {
			return cache[arr];
		}
		return fn.apply(this, arguments);
	};
};
console.log(cacheProxy(mult)(1, 2, 3, 4));

//第七章    迭代器模式
let each = function(arr, fn) {
	let len = arr.length;
	let i = -1;
	while (++i < len) {
		fn.call(arr[i], arr[i], i);
	}
};
each([1, 2, 3, 4], function(item, i) {
	console.log(item, i);
});

//内部迭代器
// let compare = function(arr1,arr2){
// 	if(arr1.length !== arr2.length){
// 		throw new Error('arr1和arr2不相等')
// 	}
// 	each(arr1,function(item,i){
// 		if(item!==arr2[i]){
// 			throw new Error(`arr1和arr2不相等`)
// 		}
// 	})
// 	console.log('arr1和arr2相等')
// }
// compare([1,2,3],[1,2,4])

//外部迭代器
let Iterator = function(obj) {
	let curr_index = 0;
	let next = function() {
		return ++curr_index;
	};
	let isDone = function() {
		return curr_index >= obj.length;
	};

	let getCurrItem = function() {
		return obj[curr_index];
	};

	return {
		next: next,
		isDone: isDone,
		getCurrItem: getCurrItem
	};
};

let compare = function(iterator1, iterator2) {
	while (!iterator1.isDone() && !iterator2.isDone()) {
		if (iterator1.getCurrItem() !== iterator2.getCurrItem()) {
			return console.warn("iterator1 和 iterator2 不相等");
		}
		iterator1.next();
		iterator2.next();
	}
	console.log("iterator1 和 iterator2 相等");
};

let iterator1 = Iterator([1, 2, 3]);
let iterator2 = Iterator([1, 2, 4]);
compare(iterator1, iterator2);

//应用实例
// let getActiveUploadObj = function() {
// 	try {
// 		return new ActiveXObject("TXFTNActiveX.FTNUpload"); // IE 上传控件
// 	} catch (e) {
// 		return false;
// 	}
// };
// let getFlashUploadObj = function() {
// 	if (supportFlash()) {
// 		// supportFlash 函数未提供
// 		let str = '<object type="application/x-shockwave-flash"></object>';
// 		return $(str).appendTo($("body"));
// 	}
// 	return false;
// };
// let getFormUpladObj = function() {
// 	let str = '<input name="file" type="file" class="ui-file"/>'; // 表单上传
// 	return $(str).appendTo($("body"));
// };
// let iteratorUploadObj = function() {
// 	for (let i = 0, fn; (fn = arguments[i++]); ) {
// 		let uploadObj = fn();
// 		if (uploadObj !== false) {
// 			return uploadObj;
// 		}
// 	}
// };
// let uploadObj = iteratorUploadObj(
// 	getActiveUploadObj,
// 	getFlashUploadObj,
// 	getFormUpladObj
// );

//第八章    发布-订阅模式
//Dom事件绑定
//发布   订阅
//先发布再订阅的情况需要兼容   类似qq离线消息
//p121   全局事件可能存在命名冲突   必要时需要命名空间

let Event = (function() {
	let clientList = {};
	let listen = function(e_name, fn) {
		if (!clientList) {
			clientList[e_name] = [];
		}
		clientList[e_name].push(fn);
	};
	let trigger = function() {
		let e_name = Array.prototype.shift.call(arguments);
		let fns = clientList[e_name];
		if (!fns || !fns.length) {
			return false;
		}
		fns.map(fn => {
			fn.apply(this, arguments);
		});
	};
	let remove = function(e_name, fn) {
		if (!clientList.hasOwnProperty(e_name)) {
			return console.warn(`不存在该类型事件`);
		}
		let fns = clientList[e_name];
		if (!fn) {
			delete clientList[e_name];
		} else {
			fns = fns.filter(item => item !== fn);
		}
	};
	return {
		listen,
		trigger,
		remove
	};
})();

//第九章   命令模式
//命令队列    宏命令

// let ball = document.getElementById("ball");
// let pos = document.getElementById("pos");
// let moveBtn = document.getElementById("moveBtn");
// let cancelBtn = document.getElementById("cancelBtn");
// let MoveCommand = function(receiver, pos) {
// 	this.receiver = receiver;
// 	this.pos = pos;
// 	this.oldPos = null;
// };
// MoveCommand.prototype.execute = function() {
// 	this.receiver.start("left", this.pos, 1000, "strongEaseOut");
// 	this.oldPos = this.receiver.dom.getBoundingClientRect()[
// 		this.receiver.propertyName
// 	];
// 	// 记录小球开始移动前的位置
// };
// MoveCommand.prototype.undo = function() {
// 	this.receiver.start("left", this.oldPos, 1000, "strongEaseOut");
// 	// 回到小球移动前记录的位置
// };
// let moveCommand;
// moveBtn.onclick = function() {
// 	let animate = new Animate(ball);
// 	moveCommand = new MoveCommand(animate, pos.value);
// 	moveCommand.execute();
// };
// cancelBtn.onclick = function() {
// 	moveCommand.undo(); // 撤销命令
// };

//第十章    组合模式
/*
注意：
	1.并非父子关系    只是组合对象和叶对象具有相同的接口
	2.对叶对象操作需要一致性
	3.有时需要建立双向映射关系（可以引入中介者模式）
	4.用职责链模式提高组合模式性能
*/

/*
使用情况：
	1.表示对象的部分-整体层次结构
	2.用户希望统一对待树中的所有对象
*/

let Folder = function(name) {
	this.name = name;
	this.files = [];
	this.parent = null;
};
Folder.prototype.add = function(file) {
	file.parent = this;
	this.files.push(file);
};
Folder.prototype.scan = function() {
	console.log("开始扫描文件夹: " + this.name);
	for (let i = 0, file, files = this.files; (file = files[i++]); ) {
		file.scan();
	}
};
Folder.prototype.remove = function() {
	if (!this.parent) {
		return false;
	}
	this.parent.files = this.parent.files.filter(file => file !== this);
};
/******************************* File ******************************/
let File = function(name) {
	this.name = name;
	this.parent = null;
};
File.prototype.add = function() {
	throw new Error("文件下面不能再添加文件");
};
File.prototype.scan = function() {
	console.log("开始扫描文件: " + this.name);
};
File.prototype.remove = function() {
	if (!this.parent) {
		return false;
	}
	this.parent.files = this.parent.files.filter(file => file !== this);
};

let folder = new Folder("学习资料");
let folder1 = new Folder("JavaScript");
let file1 = new Folder("深入浅出 Node.js");
folder1.add(new File("JavaScript 设计模式与开发实践"));
folder.add(folder1);
folder.add(file1);
folder1.remove(); //移除文件夹
folder.scan();

//第十一章    模板方法模式
//严重依赖抽象类的设计模式   子类一定要有抽象类中的方法
/* 
	使用情况
	框架父类，子类进行实现
	钩子函数---customerWantsCondiments
*/

/* 咖啡和茶 */
class Beverage {
	//饮料类
	constructor() {}
	boilWater() {
		console.log("把水煮沸");
	}
	brew() {
		throw new Error("子类必须重写 brew 方法");
	}
	pourInCup() {
		throw new Error("子类必须重写 pourInCup 方法");
	}
	addCondiments() {
		throw new Error("子类必须重写 addCondiments 方法");
	}
	customerWantsCondiments() {
		return true;
	}
	init() {
		this.boilWater();
		this.brew();
		this.pourInCup();
		if (this.customerWantsCondiments()) {
			this.addCondiments();
		}
	}
}

class Coffee extends Beverage {
	constructor(props) {
		super(props);
	}
	brew() {
		console.log("用沸水冲泡咖啡");
	}
	pourInCup() {
		console.log("把咖啡倒进杯子");
	}
	addCondiments() {
		console.log("加糖和牛奶");
	}
}
new Coffee().init();

//第十二章   享元模式

/* 
	通常分为内部状态和外部状态
	内部状态存储于对象内部。
	内部状态可以被一些对象共享。
    内部状态独立于具体的场景，通常不会改变。
    外部状态取决于具体的场景，并根据场景而变化，外部状态不能被共享。
*/

/* 
	使用情况
	1.一个程序中使用了大量的相似对象
	2.对象的大多数状态可以变为外部状态
	3.可用相对较少的共享对象取代大量对象

	特殊情况
	1.没有内部或外部状态的享元

	相似方法-----对象池
*/

//第十三章   职责链模式

class Chain {
	constructor(fn) {
		this.do = fn;
	}
	next() {
		this.nextsuccessor && this.nextsuccessor.do(arguments);
	}
	setNextSuccessor(chain) {
		this.nextsuccessor = chain;
	}
}

let order500 = function(orderType, pay) {
	if (orderType === 1 && pay === true) {
		console.log("500 元定金预购，得到 100 优惠券");
	} else {
		this.next(orderType, pay);
	}
};

let order200 = function(orderType, pay) {
	if (orderType === 2 && pay === true) {
		console.log("200 元定金预购，得到 100 优惠券");
	} else {
		this.next(orderType, pay);
	}
};

let order300 = function(orderType, pay) {
	if (orderType === 3 && pay === true) {
		console.log("300 元定金预购，得到 100 优惠券");
	} else {
		this.next(orderType, pay);
	}
};

let chain200 = new Chain(order200);
let chain300 = new Chain(order300);
let chain500 = new Chain(order500);
chain200.setNextSuccessor(chain300);
chain300.setNextSuccessor(chain500);

chain200.do(2, true);

//AOP方式
Function.prototype.after = function(fn) {
	let self = this;
	return function() {
		let ret = self.apply(this, arguments);
		if (ret === "next") {
			return fn.apply(this, arguments);
		}
		return ret;
	};
};

//第十四章   中介者模式

//小游戏模拟
//也可以用es5实现    需要闭包

/* 
	迪米特法则（最少知识法则）
*/

class Player {
	constructor(name, teamColor, playDirector) {
		this.name = name;
		this.teamColor = teamColor;
		this.playDirector = playDirector;
		this.state = "alive";
	}
	win() {
		console.log(`${this.name} won`);
	}
	lose() {
		console.log(`${this.name} lost`);
	}
	die() {
		this.state = "dead";
		this.playDirector.receiveMessage("playerDead", this);
	}
	remove() {
		this.playDirector.receiveMessage("removePlayer", this);
	}
	changeTeam(color) {
		this.playDirector.receiveMessage("changeTeam", this, color);
	}
}

class playDirector {
	constructor() {
		return (
			playDirector.cache ||
			(playDirector.cache = {
				receiveMessage: playDirector.receiveMessage
			})
		);
	}
	static addPlayer(player) {
		let teamColor = player.teamColor;
		this.players[teamColor] = this.players[teamColor] || [];
		this.players[teamColor].push(player);
	}
	static removePlayer(player) {
		let teamColor = player.teamColor;
		this.players[teamColor] = this.players[teamColor].filter(
			per => per !== player
		);
	}
	static changeTeam(player, newTeamColor) {
		this.removePlayer(player);
		player.teamColor = newTeamColor;
		this.addPlayer(player);
	}
	static playerDead(player) {
		let teamColor = player.teamColor;
		let teamPlayers = this.players[teamColor];
		let all_dead = teamPlayers.every(per => per.state === "dead");
		if (all_dead) {
			teamPlayers.map(per => per.lose());
			Object.keys(this.players).map(color => {
				if (color !== teamColor) {
					this.players[color].map(per => {
						per.win();
					});
				}
			});
		}
	}
	static receiveMessage() {
		let message = Array.prototype.shift.call(arguments);
		playDirector[message](...arguments);
	}
}
playDirector.cache = null;
playDirector.players = {};

let playerFactory = function(name, teamColor, pd) {
	let newPlayer = new Player(name, teamColor, pd); // 创造一个新的玩家对象
	pd.receiveMessage("addPlayer", newPlayer); // 给中介者发送消息，新增玩家
	return newPlayer;
};
// 红队：
let player1 = playerFactory("皮蛋1", "red", playDirector);
let player2 = playerFactory("皮蛋2", "red", playDirector);
let player3 = playerFactory("皮蛋3", "red", playDirector);
let player4 = playerFactory("皮蛋4", "red", playDirector);
let player5 = playerFactory("皮蛋5", "blue", playDirector);
let player6 = playerFactory("皮蛋6", "blue", playDirector);
let player7 = playerFactory("皮蛋7", "blue", playDirector);
let player8 = playerFactory("皮蛋8", "blue", playDirector);

player1.die();
player2.die();
player3.die();
player4.die();

//第十五章   装饰者模式
