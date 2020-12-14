const tree = {
  value: "-",
  left: {
    value: "+",
    left: {
      value: "a",
    },
    right: {
      value: "*",
      left: {
        value: "b",
      },
      right: {
        value: "c",
      },
    },
  },
  right: {
    value: "/",
    left: {
      value: "d",
    },
    right: {
      value: "e",
    },
  },
};

// // 树的反转 在遍历的过程中实现一次左右子树的互换，任意一种遍历方式都可以添加
// function reverseTree(root) {
//   let result = "";
//   if (root) {
//     function next(node) {
//       result += node.value;
//       if (node.left || node.right) {
//         let temp = node.left;
//         node.left = node.right;
//         node.right = temp;
//       }
//       if (node.left) {
//         next(node.left);
//       }
//       if (node.right) {
//         next(node.right);
//       }
//     }
//     next(root);
//   }
//   return result;
// }
// console.log(reverseTree(tree));

// 层序遍历  -+/a*debc
// 思路：利用队列的先进先出特性
// function levelRec(root) {
//   let result = "";
//   if (root) {
//     const queue = [root];
//     while (queue.length > 0) {
//       const element = queue.shift();

//       result += element.value;

//       if (element.left) {
//         queue.push(element.left);
//       }
//       if (element.right) {
//         queue.push(element.right);
//       }
//     }
//   }
//   return result;
// }
// console.log(levelRec(tree));

// 后序遍历 递归版 abc*+de/-
// function postOrder(root) {
//   let result = "";
//   function next(node) {
//     if (node) {
//       if (node.left) {
//         next(node.left);
//       }
//       if (node.right) {
//         next(node.right);
//       }
//       result += node.value;
//     }
//   }
//   next(root);
//   return result;
// }

// console.log(postOrder(tree));

// 后序遍历 非递归版 左右根  abc*+de/-
// 思路: 最难的一种 之后实现？？？

// function postOrder(root) {}

// console.log(postOrder(tree));

// // 中序遍历递归版
// a+b*c-d/e
// function inOrder(root) {
//   let result = "";
//   function next(tree) {
//     if (tree) {
//       if (tree.left) {
//         next(tree.left);
//       }
//       result += tree.value;
//       if (tree.right) {
//         next(tree.right);
//       }
//     }
//   }
//   next(root);
//   return result;
// }

// 中序遍历非递归 左根右
// // 思路: 借助栈或者队列, 我们先一直压左子树，只要有就压，当左子树为空的时候，
// // 当前节点即为根，缓存结果，并查看是否有右子树
// function inOrder(node) {
//   let result = "";

//   if (node) {
//     const stack = [node];
//     while (stack.length !== 0) {
//       if (node.left) {
//         stack.push(node.left);
//         node = node.left;
//       } else {
//         node = stack.pop();
//         result += node.value;

//         if (node.right) {
//           stack.push(node.right);
//           node = node.right;
//         }
//       }
//     }
//   }

//   return result;
// }

// const result = inOrder(tree);
// console.log(result);

// //先序遍历 递归
// function preOrder(treeNode) {
//   let result = "";
//   function next(tree) {
//     if (tree) {
//       result += tree.value;
//       if (tree.left) {
//         next(tree.left);
//       }
//       if (tree.right) {
//         next(tree.right);
//       }
//     }
//   }
//   next(treeNode);
//   return result;
// }

//先序遍历 非递归
// 思路：栈 先进后出  队列 先进先出
// 在遍历一个元素的时候放进去
// 1. 如果是队列 左树 右树 左树出 左子树进 然后是右树
// 2. 如果是栈 左树 右树 右树出 左子树进 然后是左子树和右子树压入 然后右子树
// 3. 如果是栈 右树 左树 左树出 右子树进 然后是左子树进 然后左子树出

// function preOrder(tree) {
//   let result = "";
//   if (tree !== null) {
//     const stack = [tree];
//     while (stack.length > 0) {
//       const node = stack.pop();
//       result += node.value;
//       if (node.right) {
//         stack.push(node.right);
//       }
//       if (node.left) {
//         stack.push(node.left);
//       }
//     }
//   }
//   return result;
// }

// const result = preOrder(tree);
// console.log(result);
