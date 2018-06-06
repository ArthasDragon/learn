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

Promise.all([
  '1',
  new Promise(function(resolve, reject) {
    resolve('2')
  }),
  '3'
]).then(function(values) {
  console.log(values)
})

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

// function newPromise_resolve() {
//   return new Promise((resolve, reject) => {
//     resolve() //这里调resolve方法，则then方法会被调用
//     console.log('resolve里面的log')
//   })
//   //先输出 resolve里面的log
//   //后输出 then方法
//   //这里很好地体现了 Promise实现了 node.js的异步机制
// }

// newPromise_resolve().then(() => {
//   console.log('then方法')
// })

// function promise_forEach_then() {
//   let ids = [1, 2, 3]
//   let promise = Promise.resolve()
//   ids.forEach(id => {
//     promise
//       .then(() => {
//         return id
//       })
//       .then(consoleLogId)
//   })
// }

// function consoleLogId(id) {
//   console.log('promise_forEach_then---' + id)
// }

// promise_forEach_then()
