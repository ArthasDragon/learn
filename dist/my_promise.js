var _typeof =
	typeof Symbol === "function" && typeof Symbol.iterator === "symbol"
		? function(obj) {
			return typeof obj;
		  }
		: function(obj) {
			return obj &&
					typeof Symbol === "function" &&
					obj.constructor === Symbol &&
					obj !== Symbol.prototype
				? "symbol"
				: typeof obj;
		  };

//怎么加入microtask   ?????

function Promise(fn) {
	var self = this;
	this.tasks;
	this._status = "pending"; //fulfilled   rejected
	this._resolves = [];
	this._rejects = [];
	this._value;
	this._reason;

	function resolve(value) {
		self._status = "fulfilled";
		while ((fn = self._resolves.shift())) {
			value = fn(value);
		}
		self._value = value;
		self._resolves = [];
	}
	function reject(reason) {
		if (Promise.prototype._catchback) {
			Promise.prototype._catchback(reason);
			return (Promise.prototype._catchback = null);
		}
		self._status = "rejected";
		while ((fn = self._rejects.shift())) {
			reason = fn(reason);
		}
		self._reason = reason;
		self._rejects = [];
	}
	fn(resolve, reject);
}

Promise.prototype.then = function(onFulfilled, onRejected) {
	var self = this;

	function final(value, cb, resolve, reject) {
		var result = typeof cb === "function" ? cb(value) : value;
		if (result instanceof Promise) {
			result.then(
				function(value) {
					resolve(value);
				},
				function(value) {
					reject(value);
				}
			);
		} else {
			resolve(result);
		}
	}
	return new Promise(function(resolve, reject) {
		function handle(value) {
			final(value, onFulfilled, resolve, reject);
		}
		function errback(reason) {
			final(reason, onRejected, resolve, reject);
		}

		if (self._status === "pending") {
			self._resolves.push(handle);
			self._rejects.push(errback);
		} else if (self._status === "fulfilled") {
			handle(self._value);
		} else {
			errback(self._reason);
		}
	});
};

Promise.prototype.catch = function(errback) {
	Promise.prototype._catchback = errback;
};

Promise.all = function(args) {
	if (!Array.isArray(args)) {
		return console.error(
			"the all args should be array but find " +
				(typeof args === "undefined" ? "undefined" : _typeof(args))
		);
	}
	return Promise(function(resolve, reject) {
		var promises = args;
		var len = promises.length;
		var num = promises.length;
		var results = new Array(len);
		for (var i = 0; i < len; ++i) {
			(function(i) {
				var cur_promise = promises[i];
				if (cur_promise instanceof Promise) {
					cur_promise.then(
						function(val) {
							results[i] = val;
							--num === 0 && resolve(results);
						},
						function(reas) {
							reject(reas);
						}
					);
				} else {
					results[i] = cur_promise;
					--num === 0 && resolve(results);
				}
			})(i);
		}
	});
};

export default Promise;

// p1()
//   .then(p2)
//   .then(p3, function(data) {
//     console.log(data)
//     return data
//   })
//   .then(
//     function(data) {
//       console.log('data: ' + data)
//     },
//     function(data) {
//       console.log(data)
//     }
//   )

// function p1() {
//   return new Promise(function(resolve, reject) {
//     console.log('p1 resolved')
//     resolve(123)
//   })
// }

// function p2() {
//   return new Promise(function(resolve, reject) {
//     console.log('p2 rejected')
//     reject(456)
//   })
// }

// function p3() {
//   return new Promise(function(resolve, reject) {
//     console.log('p3 resolved')
//     resolve(789)
//   })
// }

// function runAsync1() {
//   var p = new Promise(function(resolve, reject) {
//     //做一些异步操作
//     setTimeout(function() {
//       console.log('异步任务1执行完成')
//       resolve('随便什么数据1')
//     }, 1000)
//   })
//   return p
// }
// function runAsync2() {
//   var p = new Promise(function(resolve, reject) {
//     //做一些异步操作
//     setTimeout(function() {
//       console.log('异步任务2执行完成')
//       resolve('随便什么数据2')
//     }, 2000)
//   })
//   return p
// }
// function runAsync3() {
//   var p = new Promise(function(resolve, reject) {
//     //做一些异步操作
//     setTimeout(function() {
//       console.log('异步任务3执行完成')
//       resolve('随便什么数据3')
//     }, 2000)
//   })
//   return p
// }

// Promise.all([runAsync1(), 2, 3, 4]).then(function(val) {
//   console.log(val)
// })

// runAsync1()
//   .then(function(data) {
//     console.log(data)
//     return runAsync2()
//   })
//   .then(function(data) {
//     console.log(data)
//     return '直接返回数据' //这里直接返回数据
//   })
//   .then(function(data) {
//     console.log(data)
//   })
// setTimeout(() => {
//   console.log(1)
// }, 0)
// new Promise(r => {
//   console.log(2)
//   r()
// }).then(() => {
//   console.log(3)
// })
setTimeout(function() {
	console.log("timeout1");
});

new Promise(function(resolve) {
	console.log("promise1");
	for (var i = 0; i < 1000; i++) {
		i == 99 && resolve();
	}
	console.log("promise2");
}).then(function() {
	console.log("then1");
});

console.log("global1");
