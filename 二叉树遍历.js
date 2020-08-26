//foreverz.cn/2016/10/19/%E4%BA%8C%E5%8F%89%E6%A0%91%E4%B8%8EJavaScript/
// 遍历一个树有深度优先和广度优先
// 深度优先级包括：前序，中序和后序
// 广度优先遍历值得是层级遍历
// 前序遍历：访问根–>遍历左子树–>遍历右子树;
// 中序遍历：遍历左子树–>访问根–>遍历右子树;
// 后序遍历：遍历左子树–>遍历右子树–>访问根;
// 广度遍历：按照层次一层层遍历;

// 前序，中序，后序都可以看作是DFS，用栈实现，因为他们都是在找到叶子节点前一直遍历。
// 层序遍历属于BFS，用堆实现，因为它们是一层一层遍历。

// 表达式 (a+b*c)-d/e

// 前序遍历：- + a * b c / d e
// 中序遍历：a + b * c - d / e
// 后序遍历：a b c + d e / -
// 广度遍历：- + / a d e b c
var tree = {
  value: "-",
  left: {
    value: "+",
    left: {
      value: "a"
    },
    right: {
      value: "*",
      left: {
        value: "b"
      },
      right: {
        value: "c"
      }
    }
  },
  right: {
    value: "/",
    left: {
      value: "d"
    },
    right: {
      value: "e"
    }
  }
};

let arr = [];
function preOrder(node) {
  if (node) {
    arr.push(node.value);
    preOrder(node.left);
    preOrder(node.right);
  }
}
preOrder(tree);
console.log("前序遍历");
console.log(arr);
arr.splice(0);

function inOrder(node) {
  if (node) {
    inOrder(node.left);
    arr.push(node.value);
    inOrder(node.right);
  }
}
inOrder(tree);
console.log("中序遍历");
console.log(arr);
arr.splice(0);

function postOrder(node) {
  if (node) {
    postOrder(node.left);
    postOrder(node.right);
    arr.push(node.value);
  }
}

postOrder(tree);
console.log("后序遍历");
console.log(arr);

// 先序非递归
var preListUnRec = []; //定义保存先序遍历结果的数组
var preOrderUnRecursion = function(node) {
  if (node) {
    //判断二叉树是否为空
    var stack = [node]; //将二叉树压入栈
    console.log(stack.length);
    while (stack.length !== 0) {
      //如果栈为空，则循环遍历
      node = stack.pop(); //从栈中取出一个结点
      preListUnRec.push(node.value); //将取出结点的值存入数组中
      if (node.right) stack.push(node.right); //如果存在右子树，将右子树压入栈
      if (node.left) stack.push(node.left); //如果存在左子树，将左子树压入栈
    }
  }
};
preOrderUnRecursion(tree);
console.log(preListUnRec);

// 中序非递归

var result = [];
function zhongxu(node) {
  if (node) {
    var stack = [];
    // 初始条件，栈为空的时候，需要知道node不为空
    while (stack.length !== 0 || node) {
      if (node) {
        stack.push(node);
        node = node.left;
      } else {
        node = stack.pop(); //关键点，currentNode已经到了左边的空，previousNode已经被存到了stack,这时候取出来的value就是根
        result.push(node.value);
        node = node.right;
      }
    }
  }
}
zhongxu(tree);
console.log(result);

function getHeight(node) {
  if (node == null) {
    return 0;
  }
  let leftHeight = getHeight(node.left);

  let rightHeight = getHeight(node.right);
  console.log([leftHeight, rightHeight]);
  return leftHeight > rightHeight ? leftHeight + 1 : rightHeight + 1;
}

console.log(getHeight(tree));
