20190308优达学城ES6（ES2015）整个课程复习总结（上）

1.
全课分为语法，函数，内置功能，专业开发者功能四个部分。


2.
语法syntax部分：

let and const;
模板字面量；
解构destructuring;
对象字面量；
迭代；
展开...运算符spread operator;
...剩余参数rest parameter；


//let and const:
var 定义的变量会被提升到函数作用域的顶部。
而let,const作用域在"块"，{}。
前者用于声明会变的变量，后者用于不会变的变量。

使用 let 声明的变量可以重新赋值，但是不能在同一作用域内重新声明。
使用 const 声明的变量必须赋初始值，但是不能在同一作用域内重新声明，也无法重新赋值。



//模板字面量
在 ES6 之前，将字符串连接到一起的旧方法是使用字符串连接运算符 (+)。
模板字面量本质上是包含嵌入式表达式的字符串字面量。

模板字面量用倒引号 ( ``)（而不是单引号 ( '' ) 或双引号( "" )）表示，
可以包含用 ${expression} 表示的占位符。

模板字面量中的嵌入式表达式不仅仅可以用来引用变量。你可以在嵌入式表达式中进行运算、调用函数和使用循环！

模板字面量输出的格式，就是写入的格式。



//解构
在 ES6 中，你可以使用_解构_从数组和对象中提取值并赋给独特的变量。
包括解构数组，和解构对象。

解构数组按位置来，解构对象按名称的对应来。

以下解构数组：
const point = [10, 25, -34];

const [x, y, z] = point;

console.log(x, y, z);
Prints: 10 25 -34

在此示例中，方括号 [ ] 表示被解构的数组，x、y 和 z 表示要将数组中的值存储在其中的变量。
注意，你不需要指定要从中提取值的索引，因为索引可以暗示出来。

提示：在解构数组时，还可以忽略值。例如，const [x, , z] = point; 忽略了 y 坐标。


以下解构对象：
const gemstone = {
  type: 'quartz',
  color: 'rose',
  karat: 21.29
};

const {type, color, karat} = gemstone;

console.log(type, color, karat);

解构对象时，关于this的问题：
你认为调用 getArea() 后会返回什么？//NaN在解构该对象并将 getArea() 方法存储到 getArea 变量中时，
                              //它无法再访问 circle 对象中的 this，得出面积 NaN。

const circle = {
  radius: 10,
  color: 'orange',
  getArea: function() {
    return Math.PI * this.radius * this.radius;
  },
  getCircumference: function() {
    return 2 * Math.PI * this.radius;
  }
};

let {radius, getArea, getCircumference} = circle;


//对象字面量
let type = 'quartz';
let color = 'rose';
let carat = 21.29;

const gemstone = {
  type,
  color,
  carat,
  calculateWorth() {
    // 将根据类型(type)，颜色(color)和克拉(carat)计算宝石(gemstone)的价值
  }
};



//迭代
ES6针对迭代推出了两个新的内容，
一是
iterator：allows javascript objects to define or customize their iteration behavior
二是
for ... of loop ： a loop that iterates over iterable objects

for...of 循环是最新添加到 JavaScript 循环系列中的循环。
它结合了其兄弟循环形式 for 循环和 for...in 循环的优势，可以循环任何可迭代（也就是遵守可迭代协议）类型的数据。
默认情况下，包含以下数据类型：String、Array、Map 和 Set，注意不包含 Object 数据类型（即 {}）。
默认情况下，对象不可迭代(除非通过接口自定义迭代规则）。
                                                                                                                                         
普通for循环的缺点：需要计数器和结束条件
for .. in：依然需要Index来访问数据，而且会遍历到对象所继承的父级的属性和方法。
                                                                                                                                         
不用担心向对象中添加新的属性。for...of 循环将只循环访问对象中的值。                                                                                                                                    
练习：将每一天的首字母大写后再输出。
                                                                                                                                         
const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

// your code goes here
for( let day of days){
    
    console.log(`${day[0].toUpperCase()}${day.slice(1)}`);
}



//展开运算符
用三个连续的点 ( ... ) 表示）是 ES6 中的新概念，使你能够将字面量对象展开为多个元素。

我们通过几个示例看看它的原理。
         
const books = ["Don Quixote", "The Hobbit", "Alice in Wonderland", "Tale of Two Cities"];
console.log(...books);
Prints: Don Quixote The Hobbit Alice in Wonderland Tale of Two Cities

const primes = new Set([2, 3, 5, 7, 11, 13, 17, 19, 23, 29]);
console.log(...primes);
Prints: 2 3 5 7 11 13 17 19 23 29

会发现数组和集合都扩展开了单个元素。这有什么用？

注意：集合是 ES6 中的全新内置对象。我们将在未来的 ES6 第 3 节课详细讲解集合。

使用 concat 方法结合数组
展开运算符的一个用途是结合数组。

如果你需要结合多个数组，在有展开运算符之前，必须使用 Array 的 concat() 方法。

const fruits = ["apples", "bananas", "pears"];
const vegetables = ["corn", "potatoes", "carrots"];
const produce = fruits.concat(vegetables);
console.log(produce);
Prints: ["apples", "bananas", "pears", "corn", "potatoes", "carrots"]

/*
 * Instructions: Use the spread operator to combine the `fruits` and `vegetables` arrays into the `produce` array.
 */

const fruits = ["apples", "bananas", "pears"];
const vegetables = ["corn", "potatoes", "carrots"];

const produce = [...fruits,...vegetables];

console.log(produce);



//剩余参数
如果你可以使用展开运算符将数组展开为多个元素，那么肯定有一种方式将多个元素绑定到一个数组中吧？

实际上，的确有！叫做剩余参数，它是 ES6 中新加的另一个运算符。

剩余参数
剩余参数也用三个连续的点 ( ... ) 表示，使你能够将不定数量的元素表示为数组。它在多种情形下都比较有用。

一种情形是将变量赋数组值时。例如，

const order = [20.17, 18.67, 1.50, "cheese", "eggs", "milk", "bread"];
const [total, subtotal, tax, ...items] = order;
console.log(total, subtotal, tax, items);
Prints: 20.17 18.67 1.5 ["cheese", "eggs", "milk", "bread"]

该代码将 order 数组的值分配给单个变量。数组中的前三个值被分配给了 total、subtotal 和 tax，但是需要重点注意的是 items。

通过使用剩余参数，数组中剩余的值（作为数组）被分配给了 items。


另一种情形
剩余参数用于可变参数的函数

function sum(...nums) {
  let total = 0;  
  for(const num of nums) {
    total += num;
  }
  return total;
}





                                                                                                                                         const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'                                                                                                                             不用担心向对象中添加新的属性。for...of 循环将只循环访问对象中的值。
                                                                                                                                         
                                                                                                                                         