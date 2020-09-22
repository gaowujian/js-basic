class Vue {
  constructor(options) {
    for (const key in options) {
      if (options.hasOwnProperty(key)) {
        Vue.prototype[key] = options[key];
      }
    }
  }
}

const vm = new Vue({ router: 10 });
const vm1 = new Vue();
console.log(vm1);
for (const key in vm1) {
  const element = vm1[key];

  console.log(`key:${key}==>element:${element}`);
}
