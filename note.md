# 前后端的流式文件读取

## node

node 使用 fs.open 先去打开文件，然后声明一块 buffer 空间用于保存一个切片，使用 fs.read 来向
buffer 中存入一个切片大小的内容 fs.read(fd,buffer,offset,length,position,callback),之后
一直去递归调用这个 fs.read 直到 callback 中获取不到内容，就说明文件已经读取完毕了。

从 fd 指定的文件中读取数据。
buffer 是数据（从 fd 读取）要被写入的 buffer。
offset 是 buffer 中开始写入的偏移量。
length 是整数，指定要读取的字节数。
position 参数指定从文件中开始读取的位置。
如果 position 为 null，则从当前文件位置读取数据，并更新文件位置。
如果 position 是整数，则文件位置会保持不变。
回调有三个参数 (err, bytesRead, buffer)。

let buf = Buffer.alloc(xx)
fs.read(fd,buf,0,xx,fileOffset,callback)
表示我从 fd 文件的 fileOffset 位置，读取了 xx 长度的内容，准备从 buf 的 0 号位置开始写入

## 浏览器

const file = e.target.files[0]
file 对象

```
{
    lastModified: 1596605507121
    lastModifiedDate: Wed Aug 05 2020 13:31:47 GMT+0800 (中国标准时间) {}
    name: "任务 5：5.react_setstate.mp4"
    size: 107760204
    type: "video/mp4"
}
```

file reader 是为了要把文件数据输出才创建，如果不涉及到二进制的输出没必要创建 file reader 对象
fileReader 有

- readAsText,
- readAsDateURL,
- readAsBinaryString,
- readAsArrayBuffer

```
let SLICE_SIZE = 1024 \* 1024;
let fileSize = file.size;

if (fileSize > SLICE_SIZE){
    // 计算需要分几份
    let sliceCount = Math.ceil(fileSize / SLICE_SIZE);
    for (let i = 0; i < sliceCount; ++i) {
        // 计算分片起始位置
        let start = i \* SLICE_SIZE;

        // 计算分片结束位置
        let end = start + SLICE_SIZE;

        // 最后一片特殊处理
        if (end > fileSize) {
            end = fileSize;
        }
        let newBlob = file.slice(start, end);
        // balabala 业务代码
        // ajax 把分片数据上传到服务器
    }
    return
}
```
