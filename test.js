const Promise = require("./myPromise");
Promise.resolve()
  .then(() => {
    console.log("then1");
    new Promise((resolve, reject) => {
      resolve();
    })
      .then(() => {
        console.log("then1-1");
        return Promise.resolve();
      })
      .then(() => {
        console.log("then1-2");
      });
  })
  .then(() => {
    console.log("then2");
  })
  .then(() => {
    console.log("then3");
  })
  .then(() => {
    console.log("then4");
  })
  .then(() => {
    console.log("then5");
  });
