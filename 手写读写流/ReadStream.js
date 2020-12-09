const fs = require("fs");
const path = require("path");
const EventEmitter = require("events");
class ReadStream extends EventEmitter {
  constructor(path, options) {
    super();
    this.path = path;
    this.flags = options.flags || "r";
    this.encoding = options.encoding || null;
    this.autoClose = options.autoClose || true;
    this.start = options.start || 0;
    this.end = options.end || undefined;
    this.highWaterMark = options.highWaterMark || 3;
    this.offset = 0; //表示已经读取的文件大小
    this.flowing = false;
    //创建流的时候直接去打开文件
    this.open();
    //需要在read之前判断用户是否监听了data事件，监听之后我再读取
    // read的时候必须确保文件已经打开，有了this.fd。
    this.on("newListener", (type) => {
      if (type === "data") {
        this.flowing = true;
        this._read();
      }
    });
  }
  destroy(err) {
    if (err) {
      this.emit("error", err);
    }
    if (typeof this.fd === "number") {
      this.emit("close");
    }
  }
  pause() {
    this.flowing = false;
  }

  resume() {
    if (!this.flowing) {
      this.flowing = true;
      this._read();
    }
  }

  open() {
    fs.open(this.path, this.flags, (err, fd) => {
      if (err) {
        this.destroy(err);
      }

      this.fd = fd;
      //只有在fs open的回调触发完成后,之后才能确保 this.fd = fd, 这时候在read函数内才能正确
      //拿到this.fd或者通过传参拿到fd
      this.emit("open", fd);
      //源码里是打开之后立即开始读取，现在的做法是先监听用户是否有data事件再去读取
      //   this._read(fd)
    });
  }

  //同步执行，虽然执行得快，但是数据没到，所以去订阅事件，等到时机恰当再重新调用该方法
  //开始真正的读取，但是因为没有fd所以要等待，直到open事件的回调拿到fd再回来，
  //为了不和open事件混淆，这里我们使用了一个名为fd的事件
  _read() {
    if (typeof this.fd !== "number") {
      return this.once("open", (fd) => {
        console.log("文件真正打开，有fd的时候,fd:", fd);
        this._read();
      });
    }
    //开始读写
    //不要去复用buffer
    let buffer = Buffer.alloc(this.highWaterMark);
    //计算每次需要写入的数据
    // 如果有end的值的之后，可能会出现读取的值，不足以一次的highWaterMark
    let howMuchToRead = this.end
      ? Math.min(this.highWaterMark, this.end - this.offset + 1)
      : this.highWaterMark;
    if (this.flowing) {
      fs.read(
        this.fd,
        buffer,
        0,
        howMuchToRead,
        this.offset,
        (err, bytesRead) => {
          //等价于源码中的this.push()
          //切割最后一次的buffer有用
          if (bytesRead > 0) {
            this.emit("data", buffer.slice(0, bytesRead));
            console.log(buffer.slice(0, bytesRead));
            this.offset += bytesRead;
            this._read();
          } else {
            this.emit("end");
            this.destroy();
          }
        }
      );
    }
  }
}

module.exports = ReadStream;
