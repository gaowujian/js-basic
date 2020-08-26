function Set() {
  const items = {};
  this.has = function (value) {
    //只检查自己，不检查原型链
    return items.hasOwnProperty(value);
  };
  this.add = function (value) {
    if (!this.has(value)) {
      items[value] = value;
      return true;
    }
    return false;
  };
  this.remove = function (value) {
    if (this.has(value)) {
      delete items[value];
      return true;
    }
    return false;
  };
}

function HashSet() {
  var set = new Set();
  var loseloseHashCode = function (key) {
    var hash = 0;
    for (var i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i);
      return hash % 37;
    }
  };
  this.put = function (key, value) {
    var position = loseloseHashCode(key);
    // 在hashset中，不需要添加键值对，只需要插入值
    set.add(position, value);
  };
  this.get = function (key) {
    const hashVal = loseloseHashCode(key);
    return set.get(hashVal);
  };
  this.remove = function (key) {
    const hashVal = loseloseHashCode(key);
    set.remove(hashVal);
  };
}
