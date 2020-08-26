// 定义一个加法

// 定义一个数字
<Number> = "0"|"1"| ... "9"

{/* 定义一个十进制数 */}
<DecimalNumber> = "0" | ("0"|"1"| ... "9")<Number>*

    {/* 定义一个加法 */}
<Expression> = <DecimalNumber> "+" </DecimalNumber>

<Expression> = <DecimalNumber> | <Expression> "+" <DecimalNumber> 