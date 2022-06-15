const fs = require("fs-extra");

const path = require("path");

const PUBLIC_DIR = path.resolve(__dirname, "public");
const TEMP_DIR = path.resolve(__dirname, "temp");

function splitChunks(filename) {
  const rs = fs.createReadStream(path.resolve(PUBLIC_DIR, filename), {
    autoClose: true,
  });
  fs.mkdir(path.resolve(TEMP_DIR, filename), () => {
    let i = 0;
    rs.on("data", (chunk) => {
      i++;
      fs.writeFileSync(
        path.resolve(TEMP_DIR, filename, `${filename}-${i}`),
        chunk
      );
      console.log("第" + i + "片写入成功");
    });
    rs.on("end", () => {
      console.log("分割完成");
      rs.close();
    });
  });
}

splitChunks("tom.jpeg");

function mergeChunks(filename) {
  fs.readdir(path.resolve(TEMP_DIR, filename), (err, files) => {
    const result = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const content = fs.readFileSync(path.resolve(TEMP_DIR, filename, file));
      result.push(content);
    }
    const finalContent = Buffer.concat(result);
    fs.removeSync(path.resolve(TEMP_DIR, filename));
    fs.writeFile(
      path.resolve(PUBLIC_DIR, `${Math.random()}-${filename}`),
      finalContent,
      (err) => {
        console.log("合成完毕");
      }
    );
  });
}

setTimeout(() => {
  mergeChunks("tom.jpeg");
}, 3000);
