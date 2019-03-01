//20190227


1.

现在可以在 JavaScript 中使用两种新的方式来声明变量：let 和 const。

提升是浏览器解析 JavaScript 的结果。本质上，在执行任何 JavaScript 代码之前，所有变量都会被“提升”，也就是提升到函数作用域的顶部。因此在运行时，getClothing() 函数实际上看起来如下所示…

let 和 const
使用 let 和 const 声明的变量解决了这种提升问题，因为它们的作用域是到块，而不是函数。之前，当你使用 var 时，变量要么为全局作用域，要么为本地作用域，也就是整个函数作用域。

如果在代码块（用花括号 { } 表示）中使用 let 或 const 声明变量，那么该变量会陷入暂时性死区，直到该变量的声明被处理。这种行为会阻止变量被访问，除非它们被声明了。


你认为运行 getClothing(false) 后的输出是什么？

function getClothing01(isCold) {
  if (isCold) {
    var freezing = "Grab a jacket!";
  } else {
    var hot = "It's a shorts kind of day.";
    console.log(freezing);
  }
}   //undefined



function getClothing02(isCold) {
  if (isCold) {
    const freezing = "Grab a jacket!";
  } else {
    const hot = "It's a shorts kind of day.";
    console.log(freezing);
  }
}  //ReferenceError:freezing is not defined



//
//使用 let 声明的变量可以重新赋值，但是不能在同一作用域内重新声明。
//使用 const 声明的变量必须赋初始值，但是不能在同一作用域内重新声明，也无法重新赋值。

//最大的问题是何时应该使用 let 和 const？一般法则如下：
//
//当你打算为变量重新赋值时，使用 let，以及
//当你不打算为变量重新赋值时，使用 const。
//因为 const 是声明变量最严格的方式，我们建议始终使用 const 声明变量，因为这样代码更容易读懂，你知道标识符在程序的整个生命周期内都不会改变。如果你发现你需要更新变量或更改变量，则回去将其从 const 切换成 let。
//
//很简单吧？但是 var 呢？
//
//var 该怎么办？
//还有必要使用 var 吗？没有了。
//
//在某些情况下有必要使用 var，例如如果你想全局定义变量，但是这种做法通常都不合理，应该避免。从现在开始，建议放弃使用 var，改为使用 let 和 const。

2.

template literal模板字面量

模板字面量本质上是包含嵌入式表达式的字符串字面量。

模板字面量用倒引号 ( ``)（而不是单引号 ( '' ) 或双引号( "" )）表示，可以包含用 ${expression} 表示的占位符。这样更容易构建字符串。

下面是之前的示例使用模板字面量表示后的效果：

let note = teacher.name + ',\n\n' +
  'Please excuse ' + student.name + '.\n' +
  'He is recovering from the flu.\n\n' +
  'Thank you,\n' +
  student.guardian;


Returns:
Mrs. Wilson,

Please excuse Richard Kalehoff.
He is recovering from the flu.

Thank you,
Mr. Kalehoff


用模板字面量：


var note = `${teacther.name},

Please excuse ${student.name}.
He is recovering from the flu.

Thank you,
${student.guardian}`;


提示：模板字面量中的嵌入式表达式不仅仅可以用来引用变量。你可以在嵌入式表达式中进行运算、调用函数和使用循环！


const cheetah = {
    name: 'Cheetah',
    scientificName: 'Acinonyx jubatus',
    lifespan: '10-12 years',
    speed: '68-75 mph',
    diet: 'carnivore',
    summary: 'Fastest mammal on land, the cheetah can reach speeds of 60 or perhaps even 70 miles (97 or 113 kilometers) an hour over short distances. It usually chases its prey at only about half that speed, however. After a chase, a cheetah needs half an hour to catch its breath before it can eat.',
    fact: 'Cheetahs have “tear marks” that run from the inside corners of their eyes down to the outside edges of their mouth.'
};

// creates an animal trading card
function createAnimalTradingCardHTML(animal) {
    const cardHTML = `<div class="card"> 
        <h3 class="name">  ${animal.name}  </h3> 
        <img src="  ${animal.name}.jpg" alt="${animal.name}" class="picture"> 
        <div class="description"> +
            <p class="fact"> ${animal.fact} </p> 
            <ul class="details"> 
                <li><span class="bold">Scientific Name</span>:   ${animal.scientificName}  </li> 
                <li><span class="bold">Average Lifespan</span>: ${animal.lifespan}  </li> 
                <li><span class="bold">Average Speed</span>:   ${animal.speed}  </li> 
                <li><span class="bold">Diet</span>:   ${animal.diet}  </li> 
            </ul> +
            <p class="brief">  ${animal.summary}  </p> 
        </div> 
    </div>;`

    return cardHTML;
}

console.log(createAnimalTradingCardHTML(cheetah));


3.
解构数组，解构对象

数组的解构是按位置，对象的解构就是按属性名

/*
 * Programming Quiz: Destructuring Arrays (1-3)
 *
 * Use destructuring to initialize the variables `one`, `two`, and `three`
 * with the colors from the `things` array.
 */

const things = ['red', 'basketball', 'paperclip', 'green', 'computer', 'earth', 'udacity', 'blue', 'dogs'];

const [one,,,two,,,,three] = things

const colors = `List of Colors
1. ${one}
2. ${two}
3. ${three}`;

console.log(colors);  // red green blue



const gemstone = {
  type: 'quartz',
  color: 'rose',
  karat: 21.29
};

const type = gemstone.type;
const color = gemstone.color;
const karat = gemstone.karat;

console.log(type, color, karat);


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

let {radius, getArea, getCircumference} = circle;//调用 getArea() 将返回 NaN。在解构该对象并将 getArea() 方法存储到 getArea 变量中时，它无法再访问 circle 对象中的 this，得出面积 NaN。


4.对象字面量简写:object literal shorthand

let type = 'quartz';
let color = 'rose';
let carat = 21.29;

const gemstone = {
  type: type,
  color: color,
  carat: carat
};

console.log(gemstone);

简写为:
const gemstone = {
  type,
  color,
  carat
};


对象中的函数的简写：
let type = 'quartz';
let color = 'rose';
let carat = 21.29;

const gemstone = {
  type,
  color,
  carat,
  calculateWorth: function() {
    // 将根据类型(type)，颜色(color)和克拉(carat)计算宝石(gemstone)的价值
  }
};
改为：

let gemstone = {
  type,
  color,
  carat,
  calculateWorth() { ... }
};


5.for...of 循环是最新添加到 JavaScript 循环系列中的循环。

它结合了其兄弟循环形式 for 循环和 for...in 循环的优势，可以循环任何可迭代（也就是遵守可迭代协议）类型的数据。默认情况下，包含以下数据类型：String、Array、Map 和 Set，注意不包含 Object 数据类型（即 {}）。默认情况下，对象不可迭代。

在研究 ...of 循环之前，先快速了解下其他 for 循环，看看它们有哪些不足之处。

for 循环
for 循环很明显是最常见的循环类型，因此快速复习下即可。

const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

for (let i = 0; i < digits.length; i++) {
  console.log(digits[i]);
}
Prints:
0
1
2
3
4
5
6
7
8
9

for 循环的最大缺点是需要跟踪计数器和退出条件。

在此示例中，我们使用变量 i 作为计数器来跟踪循环并访问数组中的值。我们还使用 digits.length 来判断循环的退出条件。如果只看一眼这段代码，有时候会比较困惑，尤其是对于初学者而言。

虽然 for 循环在循环数组时的确具有优势，但是某些数据结构不是数组，因此并非始终适合使用 loop 循环。

for...in 循环
for...in 循环改善了 for 循环的不足之处，它消除了计数器逻辑和退出条件。

const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

for (const index in digits) {
  console.log(digits[index]);
}
Prints:
0
1
2
3
4
5
6
7
8
9

但是依然需要使用 index 来访问数组的值，这样很麻烦；几乎比之前更让人迷惑。

此外，当你需要向数组中添加额外的方法（或另一个对象）时，for...in 循环会带来很大的麻烦。因为 for...in 循环循环访问所有可枚举（注意不是可迭代）的属性，意味着如果向数组的原型中添加任何其他属性，这些属性也会出现在循环中。

Array.prototype.decimalfy = function() {
  for (let i = 0; i < this.length; i++) {
    this[i] = this[i].toFixed(2);
  }
};

const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

for (const index in digits) {
  console.log(digits[index]);
}
Prints:
0
1
2
3
4
5
6
7
8
9
function() {
 for (let i = 0; i < this.length; i++) {
  this[i] = this[i].toFixed(2);
 }
}

太可怕！这就是为何在循环访问数组时，不建议使用 for...in 循环。

注意： forEach 循环 是另一种形式的 JavaScript 循环。但是，forEach() 实际上是数组方法，因此只能用在数组中。也无法停止或退出 forEach 循环。如果希望你的循环中出现这种行为，则需要使用基本的 for 循环。


for...of 循环还具有其他优势，解决了 for 和 for...in 循环的不足之处。

你可以随时停止或退出 for...of 循环。

const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

for (const digit of digits) {
  if (digit % 2 === 0) {
    continue;
  }
  console.log(digit);
}
Prints:
1
3
5
7
9



不用担心向对象中添加新的属性。for...of 循环将只循环访问对象中的值。

Array.prototype.decimalfy = function() {
  for (i = 0; i < this.length; i++) {
    this[i] = this[i].toFixed(2);
  }
};

const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

for (const digit of digits) {
  console.log(digit);
}
Prints:
0
1
2
3
4
5
6
7
8
9



6.

展开运算符
展开运算符（用三个连续的点 ( ... ) 表示）是 ES6 中的新概念，使你能够将字面量对象展开为多个元素。

我们通过几个示例看看它的原理。

const books = ["Don Quixote", "The Hobbit", "Alice in Wonderland", "Tale of Two Cities"];
console.log(...books);
Prints: Don Quixote The Hobbit Alice in Wonderland Tale of Two Cities

const primes = new Set([2, 3, 5, 7, 11, 13, 17, 19, 23, 29]);
console.log(...primes);
Prints: 2 3 5 7 11 13 17 19 23 29

如果查看上述示例的输出，会发现数组和集合都扩展开了单个元素。这有什么用？

注意：集合是 ES6 中的全新内置对象。我们将在未来的 ES6 第 3 节课详细讲解集合。

使用 concat 方法结合数组
展开运算符的一个用途是结合数组。

如果你需要结合多个数组，在有展开运算符之前，必须使用 Array 的 concat() 方法。

const fruits = ["apples", "bananas", "pears"];
const vegetables = ["corn", "potatoes", "carrots"];
const produce = fruits.concat(vegetables);
console.log(produce);
Prints: ["apples", "bananas", "pears", "corn", "potatoes", "carrots"]

并不算太糟糕，但是如果有简写方法，会不会更好？

例如，如下所示…

const produce = [fruits, vegetables];
console.log(produce);
Prints: [Array[3], Array[3]]

遗憾的是，不可行。

这段代码实际上将 fruits 数组添加到 produce 数组的第一个索引处，将 vegetables 数组添加到第二个索引处。

要不尝试下展开运算符？


/*
 * Instructions: Use the spread operator to combine the `fruits` and `vegetables` arrays into the `produce` array.
 */

const fruits = ["apples", "bananas", "pears"];
const vegetables = ["corn", "potatoes", "carrots"];

const produce = [...fruits,...vegetables];

console.log(produce);

7.
剩余参数
剩余参数也用三个连续的点 ( ... ) 表示，使你能够将不定数量的元素表示为数组。它在多种情形下都比较有用。

一种情形是将变量赋数组值时。例如，

const order = [20.17, 18.67, 1.50, "cheese", "eggs", "milk", "bread"];
const [total, subtotal, tax, ...items] = order;
console.log(total, subtotal, tax, items);
Prints: 20.17 18.67 1.5 ["cheese", "eggs", "milk", "bread"]

该代码将 order 数组的值分配给单个变量。数组中的前三个值被分配给了 total、subtotal 和 tax，但是需要重点注意的是 items。

通过使用剩余参数，数组中剩余的值（作为数组）被分配给了 items。


可变参数函数
剩余参数的另一个用例是处理可变参数函数。可变参数函数是接受不定数量参数的函数。

例如，假设有一个叫做 sum() 的函数，它会计算不定数量的数字的和。在运行期间，如何调用 sum() 函数？

sum(1, 2);
sum(10, 36, 7, 84, 90, 110);
sum(-23, 3000, 575000);
实际上有无数种方式可以调用 sum() 函数。不管传入函数的数字有多少个，应该始终返回数字的总和。

使用参数对象
在之前版本的 JavaScript 中，可以使用参数对象处理这种类型的函数。参数对象是像数组一样的对象，可以当做本地变量在所有函数中使用。它针对传入函数的每个参数都包含一个值，第一个参数从 0 开始，第二个参数为 1，以此类推。

如果我们看看 sum() 函数的实现方法，会发现可以使用参数对象来处理传递给它的各种数字。

function sum() {
  let total = 0;  
  for(const argument of arguments) {
    total += argument;
  }
  return total;
}
现在可以正常运行，但是存在问题：

如果查看 sum() 函数的定义，会发现它没有任何参数。
这容易引起误导，因为我们知道 sum() 函数可以处理不定数量的参数。
难以理解。
如果你从未使用过参数对象，那么看了这段代码后很可能会疑问参数对象来自何处。是不是凭空出现的？看起来肯定是这样。
使用剩余参数
幸运的是，出现剩余参数后，你可以重写 sum() 函数，使其阅读起来更清晰。

function sum(...nums) {
  let total = 0;  
  for(const num of nums) {
    total += num;
  }
  return total;
}
这一版本的 sum() 函数更简练、更易读懂。此外，注意 for...in 循环被替换成了新的 for...of 循环。



8.

ES6 引入了一种新的函数，叫做箭头函数。箭头函数和普通函数的行为非常相似，但是在语法构成上非常不同。以下代码列出一组名字，使用普通函数把其中每个名字转换为大写形式：

const upperizedNames = ['Farrin', 'Kagure', 'Asser'].map(function(name) { 
  return name.toUpperCase();
});
下面的代码操作一样，但是向 map() 方法中传入的是箭头函数，而不是普通函数。注意以下代码中箭头函数的箭头 （=>）：

const upperizedNames = ['Farrin', 'Kagure', 'Asser'].map(
  name => name.toUpperCase()
);
上述代码的唯一变化是 map() 方法内的代码。它将普通函数换成了箭头函数。


普通函数可以是函数声明或函数表达式，但是箭头函数始终是表达式。实际上，它们的全称是“箭头函数表达式”，因此仅在表达式有效时才能使用，包括：

存储在变量中，
当做参数传递给函数，
存储在对象的属性中。
一个令人迷惑的语法是箭头函数存储在变量中。

const greet = name => `Hello ${name}!`;
在上述代码中，箭头函数存储在变量 greet 中，你可以像以下代码这样调用它：

greet('Asser');
Returns: Hello Asser!
    
// 空参数列表需要括号
const sayHi = () => console.log('Hello Udacity Student!');
sayHi();
Prints: Hello Udacity Student!

// 多个参数需要括号
const orderIceCream = (flavor, cone) => console.log(`Here's your ${flavor} ice cream in a ${cone} cone.`);
orderIceCream('chocolate', 'waffle');
Prints: Here's your chocolate ice cream in a waffle cone.

练习中这四个都是正确的：
setTimeout(() => {
    console.log('starting the test');
    test.start();
}, 2000);

setTimeout( _ => {
    console.log('starting the test');
    test.start();
}, 2000);

const vowels = 'aeiou'.split('');
const bigVowels = vowels.map( (letter) => letter.toUpperCase() );

const vowels = 'aeiou'.split('');
const bigVowels = vowels.map( letter => letter.toUpperCase() );


简写主体语法和常规主体语法
我们看过的所有箭头函数都只有一个表达式作为函数主体：

const upperizedNames = ['Farrin', 'Kagure', 'Asser'].map(
  name => name.toUpperCase()
);
这种函数主体形式称为"简写主体语法"。简写语法：

在函数主体周围没有花括号
自动返回表达式。
如果箭头函数的主体内需要多行代码，则可以使用"常规主体语法"。 //当函数的主体有花括号时，就必须有return

const upperizedNames = ['Farrin', 'Kagure', 'Asser'].map( name => {
  name = name.toUpperCase();
  return `${name} has ${name.length} characters in their name`;
});


箭头函数很强大！

语法简短多了，
更容易编写和阅读的简短单行函数，
使用简写主体语法时，自动返回内容！
警告：事情并非总是很完美，有些时候你可能不想使用箭头函数。在忘记如何编写普通函数之前，先看看下面的限制：

箭头函数中的 this 关键字存在限制条件
请转到下一节课了解详情！
箭头函数只是表达式
没有箭头函数声明

练习：
/*
 * Programming Quiz: Convert Function into an Arrow Function (2-1)
 */

// convert to an arrow function
const squares = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(square => 
	square * square
);

console.log(...squares);


9.
要了解箭头函数中的 this 有何区别，让我们快速总结下标准函数中的 this 是如何使用的。如果你已经非常熟悉 this 的使用方法，可以跳过此部分。

this 关键字的价值完全取决于它的函数（或方法）是如何被调用的。this 可以是以下任何内容：

1. 新的对象
如果函数使用 new 被调用：

const mySundae = new Sundae('Chocolate', ['Sprinkles', 'Hot Fudge']); 
在上述代码中，Sundae 这个构造函数内的 this 的值是新的对象，因为它使用 new 被调用。

2. 指定的对象
如果函数使用 call/apply 被调用：

const result = obj1.printName.call(obj2);
在上述代码中，printName() 中的 this 的值将指的是 obj2，因为 call() 的第一个参数明确设定 this 指代的是什么。

3. 上下文对象
如果函数是对象方法：

data.teleport();
在上述代码中，teleport() 中的 this 的值将指代 data。

4. 全局对象或 undefined
如果函数被调用时没有上下文：

teleport();
在上述代码中，teleport() 中的 this 的值是全局对象，如果在严格模式下，是 undefined。

提示：JavaScript 中的 this 是个很复杂的概念。我们只是快速复习了下，要详细了解如何判断 this，请参阅 this 豁然开朗！（来自 Kyle Simpson 的图书系列 《你不懂JS》。
https://github.com/getify/You-Dont-Know-JS/blob/1ed-zh-CN/this%20&%20object%20prototypes/ch2.md

