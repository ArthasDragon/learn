class SingleLinkedList {
  constructor(next, value) {
    this.value = value;
    this.next = next;
  }
}

class DoubleLinkedList {
  constructor(value, pre, next) {
    this.value = value;
    this.next = next;
    this.pre = pre;
  }
}

const generateDoubleLinkedList = values => {
  let head = new DoubleLinkedList(values[0]);
  let temp = head;
  const len = values.length;
  for (let i = 1; i < len; i++) {
    temp.next = new DoubleLinkedList(values[i], temp);
    temp = temp.next;
  }
  return head;
};
