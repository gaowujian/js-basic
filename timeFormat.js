// 实现一个通用的timeFormat方法

const timeString = "2020-4-6 14:18:20";
// 格式化为 2020年04月6日14时18分20秒

String.prototype.timeFormat = function (
  template = "{0}年{1}月{2}日{3}时{4}分{5}秒"
) {
  const reg = /\d+/g;
  const timeArr = this.match(reg);
  //   console.log("String.prototype.timeFormat -> timeArr", timeArr);
  const reg2 = /\{(\d+)\}/g;
  return template.replace(reg2, (content, $1) => {
    let time = timeArr[$1] || "00";
    time.length < 2 ? (time = "0" + time) : null;
    return time;
  });
};

console.log(timeString.timeFormat());
console.log(timeString.timeFormat("{0}年{1}月{2}日"));
console.log(timeString.timeFormat("{1}月{2}日{3}时{4}分{5}秒"));
