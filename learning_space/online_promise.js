var final = function(status, value) {
  var promise = this,
    fn,
    st

  if (promise._status !== 'PENDING') return

  // 所以的执行都是异步调用，保证then是先执行的
  setTimeout(function() {
    promise._status = status
    st = promise._status === 'FULFILLED'
    queue = promise[st ? '_resolves' : '_rejects']

    while ((fn = queue.shift())) {
      value = fn.call(promise, value) || value
    }

    promise[st ? '_value' : '_reason'] = value
    promise['_resolves'] = promise['_rejects'] = undefined
  })
}

//参数是一个函数，内部提供两个函数作为该函数的参数,分别是resolve 和 reject
var Promise = function(resolver) {
  if (!(typeof resolver === 'function'))
    throw new TypeError(
      'You must pass a resolver function as the first argument to the promise constructor'
    )
  //如果不是promise实例，就new一个
  if (!(this instanceof Promise)) return new Promise(resolver)

  var promise = this
  promise._value
  promise._reason
  promise._status = 'PENDING'
  //存储状态
  promise._resolves = []
  promise._rejects = []

  //
  var resolve = function(value) {
    //由於apply參數是數組
    final.apply(promise, ['FULFILLED'].concat([value]))
  }

  var reject = function(reason) {
    final.apply(promise, ['REJECTED'].concat([reason]))
  }

  resolver(resolve, reject)
}

Promise.prototype.then = function(onFulfilled, onRejected) {
  var promise = this
  // 每次返回一个promise，保证是可thenable的
  return new Promise(function(resolve, reject) {
    function handle(value) {
      // 這一步很關鍵，只有這樣才可以將值傳遞給下一個resolve
      var ret =
        (typeof onFulfilled === 'function' && onFulfilled(value)) || value

      //判断是不是promise 对象
      if (ret && typeof ret['then'] == 'function') {
        ret.then(
          function(value) {
            resolve(value)
          },
          function(reason) {
            reject(reason)
          }
        )
      } else {
        resolve(ret)
      }
    }

    function errback(reason) {
      reason =
        (typeof onRejected === 'function' && onRejected(reason)) || reason
      reject(reason)
    }

    if (promise._status === 'PENDING') {
      promise._resolves.push(handle)
      promise._rejects.push(errback)
    } else if (promise._status === FULFILLED) {
      // 状态改变后的then操作，立刻执行
      callback(promise._value)
    } else if (promise._status === REJECTED) {
      errback(promise._reason)
    }
  })
}

Promise.prototype.catch = function(onRejected) {
  return this.then(undefined, onRejected)
}

Promise.prototype.delay = function(ms, value) {
  return this.then(function(ori) {
    return Promise.delay(ms, value || ori)
  })
}

Promise.delay = function(ms, value) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve(value)
      console.log('1')
    }, ms)
  })
}

Promise.resolve = function(arg) {
  return new Promise(function(resolve, reject) {
    resolve(arg)
  })
}

Promise.reject = function(arg) {
  return Promise(function(resolve, reject) {
    reject(arg)
  })
}

Promise.all = function(promises) {
  if (!Array.isArray(promises)) {
    throw new TypeError('You must pass an array to all.')
  }
  return Promise(function(resolve, reject) {
    var i = 0,
      result = [],
      len = promises.length,
      count = len

    //这里与race中的函数相比，多了一层嵌套，要传入index
    function resolver(index) {
      return function(value) {
        resolveAll(index, value)
      }
    }

    function rejecter(reason) {
      reject(reason)
    }

    function resolveAll(index, value) {
      result[index] = value
      if (--count == 0) {
        resolve(result)
      }
    }

    for (; i < len; i++) {
      promises[i].then(resolver(i), rejecter)
    }
  })
}

Promise.race = function(promises) {
  if (!Array.isArray(promises)) {
    throw new TypeError('You must pass an array to race.')
  }
  return Promise(function(resolve, reject) {
    var i = 0,
      len = promises.length

    function resolver(value) {
      resolve(value)
    }

    function rejecter(reason) {
      reject(reason)
    }

    for (; i < len; i++) {
      promises[i].then(resolver, rejecter)
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

function newPromise_resolve() {
  return new Promise((resolve, reject) => {
    resolve() //这里调resolve方法，则then方法会被调用
    console.log('resolve里面的log')
  })
  //先输出 resolve里面的log
  //后输出 then方法
  //这里很好地体现了 Promise实现了 node.js的异步机制
}

newPromise_resolve().then(() => {
  console.log('then方法')
})

function promise_forEach_then() {
  let ids = [1, 2, 3]
  let promise = Promise.resolve()
  ids.forEach(id => {
    promise
      .then(() => {
        return id
      })
      .then(consoleLogId)
  })
}

function consoleLogId(id) {
  console.log('promise_forEach_then---' + id)
}

promise_forEach_then()
