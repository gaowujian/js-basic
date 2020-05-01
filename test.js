const promise = new Promise((resolve, reject) => {
  resolve(10);
});

promise
  .then(
    (value) => {
      aa;
    },
    (error) => {
      console.log(error);
    }
  )
  .catch((error) => {
    console.log(error);
  });
