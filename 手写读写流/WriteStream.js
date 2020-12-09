const EventEmitter = require("events");
const fs = require("fs");
const { emit } = require("process");
class WriteStream extends EventEmitter {
  constructor(path, options) {
    super();
    this.path = path;
    this.flags = options.flags || "w";
    this.encoding = options.encoding || "utf8";
    this.mode = options.mode || 0o666;
    this.emitClose = options.emitClose || true;
    this.start = options.start || 0;
    this.highWaterMark = options.highWaterMark || 16 * 1024;

    //
    this.writing = false; // 默认不是正在写入，第一次调用write的时候需要执行fs.write方法,之后的先放在内存
    this.len = 0; // 此长度表示写入的个数，写入后需要进行进行消费，并减少
    this.needDrain = false; // 是否需要触发drain事件
    this.offset = 0; //表示已经写入的文件大小
    this.cache = []; //缓存空间

    this.open();
  }

  destroy(err) {
    if (err) {
      this.emit("error", err);
    }
  }
  open() {
    fs.open(this.path, this.flags, this.mode, (err, fd) => {
      if (err) {
        this.destroy();
      }
      this.fd = fd;
      this.emit("open", fd);
    });
  }
  //假写入，在这里做排队处理
  write(chunk, encoding = this.encoding, cb = () => {}) {
    chunk = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
    this.len += chunk.length;

    const result = this.len < this.highWaterMark;
    // 当超过或者满足预期就需要去触发needDrain
    this.needDrain = !result;

    //需要判断是否正在写入
    //正在写入缓存数据，否则写入文件
    if (this.writing) {
      this.cache.push({ chunk, encoding, cb });
    } else {
      this.writing = true;
      this._write();
    }
    return result;
  }
  // 真写入，写入到文件
  _write(chunk, encoding, cb) {
    //同步调用write还是拿不到fd
    if (typeof this.fd !== "number") {
      return this.once("open", () => {
        this._write(chunk, encoding, cb);
      });
    }
    console.log("this.fd:", this.fd);
    console.log("this.cache:", this.cache);
  }
}

module.exports = WriteStream;
