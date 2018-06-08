class Animal {
  show = () => {
    console.log('animal')
  }
}

class Duck extends Animal {
  show = () => {
    console.log('duck')
  }
}
class Dog extends Animal {
  show = () => {
    console.log('dog')
  }
}
class Pig extends Animal {}

new Duck().show()
new Dog().show()
new Pig().show()
