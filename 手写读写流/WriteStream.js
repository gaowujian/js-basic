const EventEmitter = require("events");
const fs = require("fs");
class WriteStream extends EventEmitter {
  constructor() {
    this.path = path;
    this.flags = options.flags || "w";
    this.encoding = options.encoding || "utf8";
    this.mode = options.mode || 0o666;
    this.emitClose = options.emitClose || true;
    this.start = options.start || 0;
    this.highWaterMark = options.highWaterMark || 16 * 1024;

    //
    this.writing = false; // 默认不是正在写入，第一次调用wirte的时候需要执行fs.write方法
    this.len = 0; // 此长度指向写入的个数，写入后需要进行较少
    this.needDrain = false; // 是否触发drain事件
    this.offset = 0;
    this.cache = [];

    this.open();
  }
}

module.exports = WriteStream;
