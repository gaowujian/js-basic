const EventEmitter = require("events");
const fs = require("fs"); 
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
    this.writing = false; // 表示是否可以往文件中写入，第一次调用write的时候需要执行fs.write方法,之后的先放在内存
    this.len = 0; // 表示还未写入文件，但是已经读取的文件大小, 缓存内的数据大小
    this.needDrain = false; // 是否需要触发drain事件
    this.offset = 0; //表示已经写入的总的文件大小
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
    // console.log(typeof chunk);
    chunk = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
    this.len += chunk.length;

    const result = this.len < this.highWaterMark;
    // 当超过或者满足预期就需要去触发needDrain
    this.needDrain = !result;

    //AOP
    const clearBuffer = () => {
      this.clearBuffer();
      cb();
    };

    //需要判断是否正在写入
    //正在写入缓存数据，否则写入文件
    if (this.writing) {
      this.cache.push({ chunk, encoding, clearBuffer });
    } else {
      this.writing = true;
      this._write(chunk, encoding, clearBuffer);
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
    fs.write(this.fd, chunk, 0, chunk.length, this.offset, (err, written) => {
      //在写入之后，要从len中删除
      this.len -= written;
      this.offset += written;
      //递归去处理缓存中的数据
      cb();
    });
    // console.log("this.cache:", this.cache);
  }
  //用于清理缓存，把cache中的第一个数据拿到,然后写入，然后再去递归
  clearBuffer() {
    const data = this.cache.shift();
    if (data) {
      this._write(data.chunk, data.encoding, data.clearBuffer);
    } else {
      //告诉后续的操作,第一次都是先往文件中去写
      this.writing = false;
      if (this.needDrain) {
        this.needDrain = false; //更新needDrain
        this.emit("drain");
      }
    }
  }
}

module.exports = WriteStream;
