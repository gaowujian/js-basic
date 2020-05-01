var unsorted = [2, 4, 5, 1, 3, 7, 6];
// 从小到大进行排序
// function bubbling1(arr) {
//   for (let i = 0; i < arr.length; i++) {
//     for (let j = i + 1; j < arr.length; j++) {
//       if (arr[i] > arr[j]) {
//         var swap = arr[i];
//         arr[i] = arr[j];
//         arr[j] = swap;
//       }
//     }
//   }
//   return arr;
// }
// const result = bubbling1(unsorted);
// console.log(result);

// function bubbling2(arr) {
//   for (let i = 0; i < arr.length; i++) {
//     for (let j = arr.length - 1; j > i; j--) {
//       if (arr[j - 1] > arr[j]) {
//         let temp = arr[j];
//         arr[j] = arr[j - 1];
//         arr[j - 1] = temp;
//       }
//     }
//   }
//   return arr;
// }

// const result = bubbling2(unsorted);
// console.log(result);

// function selectSort(arr) {
//   for (let i = 0; i < arr.length; i++) {
//     let min = i;
//     for (let j = i + 1; j < arr.length; j++) {
//       if (arr[j] < arr[min]) {
//         min = j;
//       }
//     }
//     if (min != i) {
//       temp = arr[i];
//       arr[i] = arr[min];
//       arr[min] = temp;
//     }
//   }
//   return arr;
// }
// const result = selectSort(unsorted);
// console.log(result);

var unsorted = [2, 4, 5, 1, 3, 7, 6];
// function insertSort(arr) {
//   let i, j;
//   // 默认第一个有序
//   for (i = 1; i < arr.length; i++) {
//     let temp = arr[i];
//     for (j = i - 1; arr[j] > temp; j--) {
//       arr[j + 1] = arr[j];
//     }
//     arr[j + 1] = temp;
//     console.log(arr);
//   }
//   return arr;
// }

// function insertSort(arr) {
//   for (let i = 1; i < arr.length; i++) {
//     if (arr[i - 1] > arr[i]) {
//       var temp = arr[i];
//       for (var j = i - 1; arr[j] > temp; j--) {
//         arr[j + 1] = arr[j];
//       }
//       arr[j + 1] = temp;
//     }
//   }

//   return arr;
// }

// const result = insertSort(unsorted);
// console.log(result);
