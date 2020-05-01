function wait() {
    return new Promise(resolve => setTimeout(resolve, 10 * 400));
  }
  
  async function main() {
    console.time();
    const x = await wait(); // 每个都是都执行完才结,包括setTimeout（10*1000）的执行时间
    const y = await wait(); // 执行顺序 x->y->z 同步执行，x 与 setTimeout 属于同步执行
    const z = await wait();
    console.log(x, y, z);
    console.timeEnd(); // default: 30099.47705078125ms
  
    // console.time();
    // const x1 = wait(); // x1,y1,z1 同时异步执行， 包括setTimeout（10*1000）的执行时间
    // const y1 = wait(); // x1 与 setTimeout 属于同步执行
    // const z1 = wait();
    // await x1;
    // await y1;
    // await z1;
    // console.log(x1, y1, z1);
    // console.timeEnd(); // default: 10000.67822265625ms
  
    // console.time();
    // const x2 = wait(); // x2,y2,z2 同步执行，但是不包括setTimeout（10*1000）的执行时间
    // const y2 = wait(); // x2 与 setTimeout 属于异步执行
    // const z2 = wait();
    // x2, y2, z2;
    // console.log(x2, y2, z2);
    // console.timeEnd(); // default: 0.065185546875ms
  }
  main();
  