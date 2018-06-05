function Promise(fn) {
  var self = this
  this._status = 'pending' //fulfilled   rejected
  this._resolves = []
  this._rejects = []
  this._value
  this._reason

  function resolve(value) {
    self._status = 'fulfilled'
    while ((fn = self._resolves.shift())) {
      value = fn(value)
    }
    self._value = value
  }
  function reject(reason) {}
  setTimeout(function() {
    fn(resolve, reject)
  }, 0)
}

Promise.prototype.then = function(onFulfilled, onRejected) {
  let self = this
  return new Promise(function(resolve, reject) {
    function handle(value) {
      let result =
        typeof onFulfilled === 'function' ? onFulfilled(value) : value
      if (result instanceof Promise) {
        result.then(
          function(value) {
            resolve(value)
          },
          function(value) {
            reject(value)
          }
        )
      } else {
        resolve(result)
      }
    }
    function errback(reason) {
      reason = typeof onRejected === 'function' ? onRejected(reason) : reason
      reject(reason)
    }

    if (self._status === 'pending') {
      self._resolves.push(handle)
      self._rejects.push(errback)
    } else if (self._status === 'fulfilled') {
      handle(self._value)
    } else {
      errback(self._reason)
    }
  })
}

function runAsync1() {
  var p = new Promise(function(resolve, reject) {
    //做一些异步操作
    setTimeout(function() {
      console.log('异步任务1执行完成')
      resolve('随便什么数据1')
    }, 1000)
  })
  return p
}
function runAsync2() {
  var p = new Promise(function(resolve, reject) {
    //做一些异步操作
    setTimeout(function() {
      console.log('异步任务2执行完成')
      resolve('随便什么数据2')
    }, 2000)
  })
  return p
}
function runAsync3() {
  var p = new Promise(function(resolve, reject) {
    //做一些异步操作
    setTimeout(function() {
      console.log('异步任务3执行完成')
      resolve('随便什么数据3')
    }, 2000)
  })
  return p
}

runAsync1()
  .then(function(data) {
    console.log(data)
    return runAsync2()
  })
  .then(function(data) {
    console.log(data)
    return '直接返回数据' //这里直接返回数据
  })
  .then(function(data) {
    console.log(data)
  })
