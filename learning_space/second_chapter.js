//this   apply   call

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
