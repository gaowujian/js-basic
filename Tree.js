class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.parent = null;
  }
}

class BST {
  constructor() {
    this.root = null;
  }
  insert(value) {
    if (!this.root) {
      return (this.root = new Node(value));
    }
    let currentNode = this.root;

    function fn() {
      if (currentNode.value > value) {
        if (!currentNode.left) {
          const newNode = new Node(value);
          currentNode.left = newNode;
          newNode.parent = currentNode;
        } else {
          currentNode = currentNode.left;
          fn();
        }
      } else {
        if (!currentNode.right) {
          const newNode = new Node(value);

          currentNode.right = newNode;
          newNode.parent = currentNode;
        } else {
          currentNode = currentNode.right;
          fn();
        }
      }
    }
    fn();
  }
}

const bst = new BST();

bst.insert(10);
bst.insert(4);
bst.insert(8);
bst.insert(22);
bst.insert(34);
bst.insert(28);

console.dir(bst, { depth: 10 });
