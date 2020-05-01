class Node {
  constructor(val) {
    this.value = val;
    this.next = null;
  }
}

class LinkedList {
  constructor(node) {
    this.head = node;
  }
  findByValue(value) {
    let currentNode = this.head.next;
    while (currentNode) {
      if (currentNode.value != value) {
        currentNode = currentNode.next;
      } else {
        return currentNode;
      }
    }
    return null;
  }
  // 在尾节点插入
  append(item) {
    // 1. 找到尾节点（尾节点的特点，.next为空）
    // 预防链表是空，先拿到头节点，判断有没有第一个节点，然后指针向下移动
    let currentNode = this.head;
    while (currentNode.next != null) {
      currentNode = currentNode.next;
    }
    // 2. 插入新节点
    const newNode = new Node(item);
    currentNode.next = newNode;
  }
  display() {
    // 头节点是否为null，不为null，每次打印当前value
    // 方式1
    let currentNode = this.head;
    while (currentNode.next) {
      currentNode = currentNode.next;
      console.log(currentNode.value);
    }
    // 方式2
    // let currentNode = this.head.next; // 忽略头指针的值
    // while (currentNode !== null) {
    //   console.log(currentNode.value);
    //   currentNode = currentNode.next;
    // }
  }
  insertAfter(target, value) {
    let currentNode = this.head;
    while (currentNode.next) {
      currentNode = currentNode.next;
      if (currentNode.value == target.value) {
        // 创建新节点
        const newNode = new Node(value);
        newNode.next = currentNode.next;
        currentNode.next = newNode;
      }
      // currentNode = currentNode.next;
    }
    return -1;
  }
  // 从0开始
  getElementAt(position) {
    if (position < 0) {
      return -1;
    }
    let currentNode = this.head.next;
    for (let i = 0; i < position; i++) {
      currentNode = currentNode.next;
    }
    return currentNode;
  }
}

const list = new LinkedList(new Node("头节点"));

list.append("chen1");
list.append("chen2");
list.append("chen3");
// list.display();

const element = list.getElementAt(0);
console.log(element);

list.insertAfter(element, "chen4");
list.display();
