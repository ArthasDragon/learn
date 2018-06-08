//第二章  this   apply   call
//2.1 this    start
//1.对象的方法调用
var obj = {
  a: 1,
  getA: function() {
    console.log(this === obj) // 输出：true
    console.log(this.a) // 输出: 1
  }
}
obj.getA()

//2.普通函数调用
function Person() {
  this.name = 'john'
  this.getName = function() {
    return this.name
  }
}
var getName = new Person().getName
console.log(getName())
console.log(new Person().getName())

//3.构造器调用
function MyPerson1() {
  this.name = 'person'
  return 'haha'
}
function MyPerson2() {
  this.name = 'person'
  return {
    name: 'haha'
  }
}
console.log(new MyPerson1().name)
console.log(new MyPerson2().name)

//4.  Function.prototype.call 或 Function.prototype.apply 调用
var myObj = {
  name: 'myobj',
  getName: function() {
    console.log(this.name)
  }
}
var haha = { name: 'hehe' }
myObj.getName.call(haha)

//this    end

//2.2  call  apply   bind
Function.prototype.bind = function() {
  //bind   js实现
  var self = this
  var context = [].shift.call(arguments)
  var args = [].slice.call(arguments)
  return function() {
    return self.apply(context, [].concat.call(args, [].slice.call[arguments]))
  }
}

//第三章   闭包和高阶函数
//3.1  闭包
//变量的搜索由内而外
