// 青蛙领养计划
class Frog {
  constructor({ name, gender, weight }) {
    this.name = name;
    this.gender = gender;
    this.weight = weight;
  }

  jump() {
    console.log("jumped");
  }

  setHabitat(habitat) {
    this.habitat = habitat;
  }
}

class Toad extends Frog {
  constructor(options) {
    super(options);
  }

  leap() {
    console.log("leaped");
  }
}

class Person {
  constructor() {
    this.id = createId();
  }
  setName(name) {
    this.name = name;
    return this;
  }
  setGender(gender) {
    this.gender = gender;
    return this;
  }
  setAge(age) {
    this.age = age;
    return this;
  }
}

function createId() {
  var idStrLen = 32;
  var idStr = (Math.floor(Math.random() * 25) + 10).toString(36) + "_";
  idStr += new Date().getTime().toString(36) + "_";
  do {
    idStr += Math.floor(Math.random() * 35).toString(36);
  } while (idStr.length < idStrLen);

  return idStr;
}

class FrogAdoptionFacility {
  constructor(name, description, location) {
    this.name = name;
    this.description = description;
    this.location = location;
    this.contracts = {};
    this.adoptions = {};
  }

  createContract(employee, client) {
    const contractId = createId();
    this.contracts[contractId] = {
      id: contractId,
      preparer: employee,
      client,
      signed: false,
    };
    return this.contracts[contractId];
  }

  signContract(id, signee) {
    this.contracts[id].signed = true;
  }

  setAdoption(frogOwner, frogOwnerLicense, frog, contract) {
    const adoption = {
      [frogOwner.id]: {
        owner: {
          firstName: frogOwner.owner.name.split(" ")[0],
          lastName: frogOwner.owner.name.split(" ")[1],
          id: frogOwner.id,
        },
        frog,
        contract,
        license: {
          id: frogOwnerLicense.id,
        },
      },
    };
    this.adoptions[contract.id] = adoption;
  }

  getAdoption(id) {
    return this.adoptions[id];
  }
}

class FrogParadiseLicense {
  constructor(frogOwner, licensePreparer, frog, location) {
    this.id = createId();
    this.client = {
      firstName: frogOwner.name.split(" ")[0],
      lastName: frogOwner.name.split(" ")[1],
      id: frogOwner.id,
    };
    this.preparer = {
      firstName: licensePreparer.name.split(" ")[0],
      lastName: licensePreparer.name.split(" ")[1],
      id: licensePreparer.id,
    };
    this.frog = frog;
    this.location = `${location.street} ${location.city} ${location.state} ${location.zip}`;
  }
}

class FrogParadiseOwner {
  constructor(frogOwner, frogOwnerLicense, frog) {
    this.id = createId();
    // this.owner = {
    //   id: frogOwner.id,
    //   firstName: frogOwner.name.split(" ")[0],
    //   lastName: frogOwner.name.split(" ")[1],
    // };
    this.owner = frogOwner;
    this.license = frogOwnerLicense;
    this.frog = frog;
  }

  createDocument() {
    return JSON.stringify(this, null, 2);
  }
}

// =======================================

const facilityTitle = "Frog Paradise";
const facilityDescription =
  "Your new one-stop location for fresh frogs from the sea! " +
  "Our frogs are housed with great care from the best professionals all over the world. " +
  "Our frogs make great companionship from a wide variety of age groups, from toddlers to " +
  "senior adults! What are you waiting for? " +
  "Buy a frog today and begin an unforgettable adventure with a companion you dreamed for!";
const facilityLocation = {
  address: "1104 Bodger St",
  suite: "#203",
  state: "NY",
  country: "USA",
  zip: 92804,
};

const frogParadise = new FrogAdoptionFacility(
  facilityTitle,
  facilityDescription,
  facilityLocation
);

const mikeTheToad = new Toad({
  name: "mike",
  gender: "male",
  weight: 12.5,
});

const sally = new Person();
sally.setName("sally tran").setGender("female").setAge(27);

const richardTheEmployee = new Person();
richardTheEmployee.setName("richard rodriguez").setGender("male").setAge(77);

const contract = frogParadise.createContract(richardTheEmployee, sally);

frogParadise.signContract(contract.id, sally);

const sallysLicense = new FrogParadiseLicense(
  sally,
  richardTheEmployee,
  mikeTheToad,
  facilityLocation
);

const sallyAsPetOwner = new FrogParadiseOwner(
  sally,
  sallysLicense,
  mikeTheToad
);

frogParadise.setAdoption(sallyAsPetOwner, sallysLicense, mikeTheToad, contract);

const adoption = frogParadise.getAdoption(contract.id);
// console.log(JSON.stringify(adoption, null, 2));

// =====================================

const parseFunction = require("parse-function");

const app = parseFunction({
  ecmaVersion: 2017,
});

class DIC {
  constructor() {
    this.dependencies = {};
    this.factories = {};
  }

  register(name, dependency) {
    this.dependencies[name] = dependency;
  }

  factory(name, factory) {
    this.factories[name] = factory;
  }

  get(name) {
    if (!this.dependencies[name]) {
      const factory = this.factories[name];
      if (factory) {
        this.dependencies[name] = this.inject(factory);
      } else {
        throw new Error("No module found for: " + name);
      }
    }
    return this.dependencies[name];
  }

  inject(factory) {
    const fnArgs = app.parse(factory).args.map((arg) => this.get(arg));
    console.log(factory);
    console.log(fnArgs);
    return new factory(...fnArgs);
  }
}

class Client extends Person {
  setName(name) {
    this.name = name;
  }
}

const dic = new DIC();
// 注册依赖
dic.register("frogOwner", Client);
dic.register("frogOwnerLicense", sallysLicense);
dic.register("frog", mikeTheToad);
// 添加工厂
dic.factory("frog-owner", FrogParadiseOwner);
// 返回所需依赖，如果没有依赖，就先拿到工厂，然后把工厂通过inject方法注入进去，生成依赖
const frogOwner = dic.get("frog-owner");
console.log(frogOwner);

// You insert any classes or functions you want to be resolved by the DIC by passing
// it into the .factory() method which gets stored into the .factory property.

// 创建一个dic容器，把需要被解析的类或者函数通过factory方法传递进去，并保存到.factory属性上去

// For each of those functions passed into .factory you would have to register their arguments
// using .register() so that they can be picked up when the container is initializing the requested function

// 对于每一个传递进factory的方法，我们都需要通过register方法把这些方法的参数注册一下，这样的话，在这些方法
// 被调用的时候，这些参数可以从dependency属性提取出来。我们也可以使用dependencies方法去添加依赖

// When you want to retrieve something, you use .get with some key. It uses the key to look through its
//  dependencies and if it finds something there it will return it. Otherwise, it will proceed to
//  look through its factories and if it finds something it will treat it as a function that you want it to resolve.

// 当我们想要去解析一些东西的时候，我们可以通过get方法传递进去一个key值，它会去查看dependencies属性，如果找到东西就返回，
// 否则他会进一步去查询container的factories，如果没有找到，抛出异常，如果找到了东西，会把它当作一个函数去对待，去创建依赖

// Then it passes the invocation to .inject in which it reads the names of the function's dependencies (arguments)
// and grabs them from its .dependencies property, invoking the function and injecting its arguments, returning the result.

// 通过inject这个函数，在这个方法内，他会去读取一个函数的依赖，即arguments，然后从dependencies属性中获取所有的依赖，最后使用这些依赖
// 项目去调用这个函数，并返回结果
