20190228

1.

this和箭头函数
对于普通函数，this 的值基于函数如何被调用。对于箭头函数，this 的值基于函数周围的上下文。换句话说，箭头函数内的，this 的值与函数外面的 this 的值一样。

我们先看一个普通函数中的 this 示例，再看一个箭头函数是如何使用 this 的。

// 构造函数
function IceCream() {
  this.scoops = 0;
}

// 为 IceCream 添加 addScoop 方法
IceCream.prototype.addScoop = function() {
  setTimeout(function() {
    this.scoops++;
    console.log('scoop added!');
  }, 500);
};

const dessert = new IceCream();
dessert.addScoop();
Prints:
scoop added!

运行上述代码后，你会认为半毫秒之后，dessert.scoops 会是1。但并非这样：

console.log(dessert.scoops);
Prints:
0

能说说原因吗？

传递给 setTimeout() 的函数被调用时没用到 new、call() 或 apply()，也没用到上下文对象。意味着函数内的 this 的值是全局对象，不是 dessert 对象。实际上发生的情况是，创建了新的 scoops 变量（默认值为 undefined），然后递增（undefined + 1 结果为 NaN）：

console.log(scoops);
Prints:
NaN

解决这个问题的方法之一是使用闭包：

// 构造函数
function IceCream() {
  this.scoops = 0;
}

// 为 IceCream 添加 addScoop 方法
IceCream.prototype.addScoop = function() {
  const cone = this; // 设置 `this` 给 `cone`变量
  setTimeout(function() {
    cone.scoops++; // 引用`cone`变量
    console.log('scoop added!');
  }, 0.5);
};

const dessert = new IceCream();
dessert.addScoop();
上述代码将可行，因为它没有在函数内使用 this，而是将 cone 变量设为 this，然后当函数被调用时查找 cone 变量。这样可行，因为使用了函数外面的 this 值。如果现在查看甜点中的勺子数量，正确值将为 1：

console.log(dessert.scoops);
Prints:
1

这正是箭头函数的作用，我们将传递给 setTimeout() 的函数替换为箭头函数：

// 构造函数
function IceCream() {
  this.scoops = 0;
}

// 为 IceCream 添加 addScoop 方法
IceCream.prototype.addScoop = function() {
  setTimeout(() => { // 一个箭头函数被传递给setTimeout
    this.scoops++;
    console.log('scoop added!');
  }, 0.5);
};

const dessert = new IceCream();
dessert.addScoop();
因为箭头函数从周围上下文继承了 this 值，所以这段代码可行！

console.log(dessert.scoops);
Prints:
1

当 addScoop() 被调用时，addScoop() 中的 this 的值指的是 dessert。因为箭头函数被传递给 setTimeout()，它使用周围上下文判断它里面的 this 指的是什么。因为箭头函数外面的 this 指的是 dessert，所以箭头函数里面的 this 的值也将是 dessert。

如果我们将 addScoop() 方法改为箭头函数，你认为会发生什么？

// 构造函数
function IceCream() {
    this.scoops = 0;
}

// 为 IceCream 添加 addScoop 方法
IceCream.prototype.addScoop = () => { // addScoop 现在是一个箭头函数
  setTimeout(() => {
    this.scoops++;
    console.log('scoop added!');
  }, 0.5);
};

const dessert = new IceCream();
dessert.addScoop();
是的，这段代码因为同一原因而不起作用，即箭头函数从周围上下文中继承了 this 值。在 addScoop() 方法外面，this 的值是全局对象。因此如果 addScoop() 是箭头函数，addScoop() 中的 this 的值是全局对象。这样的话，传递给 setTimeout() 的函数中的 this 的值也设为了该全局对象！


2.默认函数参数

看看下面的代码：

function greet(name, greeting) {
  name = (typeof name !== 'undefined') ?  name : 'Student';
  greeting = (typeof greeting !== 'undefined') ?  greeting : 'Welcome';

  return `${greeting} ${name}!`;
}

greet(); // Welcome Student!
greet('James'); // Welcome James!
greet('Richard', 'Howdy'); // Howdy Richard!
Returns:
Welcome Student!
Welcome James!
Howdy Richard!

greet() 函数中混乱的前两行的作用是什么？它们的作用是当所需的参数未提供时，为函数提供默认的值。但是看起来很难看……

幸运的是，ES6 引入了一个新的方式来创建默认值。它叫做默认函数参数。

默认函数参数
默认函数参数非常容易阅读，因为它们位于函数的参数列表中：

function greet(name = 'Student', greeting = 'Welcome') {
  return `${greeting} ${name}!`;
}

greet(); // Welcome Student!
greet('James'); // Welcome James!
greet('Richard', 'Howdy'); // Howdy Richard!
Returns:
Welcome Student!
Welcome James!
Howdy Richard!

哇，代码少了很多，整洁多了，也明显更容易读懂了！

要创建默认参数，需要添加等号 ( = ) 以及当参数未提供时参数应该设为的默认值。在上述代码中，两个参数的默认值都是字符串，但是可以为任何 JavaScript 数据类型！
                
                
3.
                默认值和解构数组
你可以将默认函数参数和解构结合到一起， 创建非常强大的函数！

function createGrid([width = 5, height = 5]) {
  return `Generates a ${width} x ${height} grid`;
}

createGrid([]); // Generates a 5 x 5 grid
createGrid([2]); // Generates a 2 x 5 grid
createGrid([2, 3]); // Generates a 2 x 3 grid
createGrid([undefined, 3]); // Generates a 5 x 3 grid
Returns:
Generates a 5 x 5 grid
Generates a 2 x 5 grid
Generates a 2 x 3 grid
Generates a 5 x 3 grid

createGrid() 函数预期传入的是数组。它通过解构将数组中的第一项设为 width，第二项设为 height。如果数组为空，或者只有一项，那么就会使用默认参数，并将缺失的参数设为默认值 5。

但是存在一个问题，下面的代码将不可行：

createGrid(); // throws an error
Uncaught TypeError: Cannot read property 'Symbol(Symbol.iterator)' of undefined

出现错误，因为 createGrid() 预期传入的是数组，然后对其进行解构。因为函数被调用时没有传入数组，所以出现问题。但是，我们可以使用默认的函数参数！

function createGrid([width = 5, height = 5] = []) {
  return `Generating a grid of ${width} by ${height}`;
}
看到函数参数中的新 = [] 了吗？如果 createGrid() 在被调用时没有任何参数，它将使用这个默认的空数组。因为数组是空的，因此没有任何内容可以解构为 width 和 height，因此将应用它们的默认值！通过添加 = [] 为整个参数设定一个默认值，下面的代码将可行：
createGrid(); // Generates a 5 x 5 grid
Returns: Generates a 5 x 5 grid


