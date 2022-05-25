class Subject {
  constructor() {
    this.subs = new Map();
  }
  addSubscriber(key, callback) {
    if (!this.subs.has(key)) {
      this.subs.set(key, []);
    }
    this.subs.get(key).push(callback);
  }
  trigger(message) {
    if (this.subs.size > 0) {
      for (let [key, callbacks] of this.subs) {
        callbacks.forEach(callback => {
          let customizedMessage = `Hi,${key.name},${message}`;
          callback(customizedMessage);
        });
      }
    }
  }
}

function Person(name) {
  this.name = name;
}

const sub = new Subject();
const p1 = new Person("tony");
const p2 = new Person("kevin");
const p3 = new Person("ally");

sub.addSubscriber(p1, message => {
  console.log(message);
});
sub.addSubscriber(p2, message => {
  console.log(message);
});
sub.addSubscriber(p2, message => {
  console.log(`第二个callback: ${message}`);
});
sub.addSubscriber(p3, message => {
  console.log(message);
});

sub.trigger("Welcome to my pattern");
