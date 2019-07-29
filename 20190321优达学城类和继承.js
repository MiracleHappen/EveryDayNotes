1.

构造函数
构造函数创建的对象，在chrome dev tool里能查看它的_proto_,能看到是由哪个构造函数创建的。
而字面量方式创建的对象，在dev tool下能看到 ，实际上它的构造函数是Object().

查看对象的构造函数 (instanceOf)
如果我们想查看某个对象是否是用构造函数创建的呢？
我们可以使用 instanceOf（它会返回一个布尔值）来窥见一些端倪。

function Finch(name) {
  this.kingdom = 'Animalia';
  this.name = name;
}

function Sparrow(name) {
  this.kingdom = 'Animalia';
  this.name = name;
}
让我们为每个构造函数创建一个实例：

const atticus = new Finch('Atticus');
const jack = new Sparrow('Jack');

atticus instanceof Sparrow; //false
jack instanceof Sparrow;//true

然而，很多时候并没有这么简单：instanceOf 运算符实际上会测试构造函数是否出现在某个对象的原型链中。
这意味着，虽然我们不是总能检查到底是_哪个构造函数创建了该对象，
但是它使我们能够洞察某个对象可能访问哪些其他的_属性和方法.


2.

关键字“this”
函数、对象和 this 彼此相互关联。当使用 new 运算符来调用构造函数时，
this 变量会被设置为新创建的对象。当在对象上调用方法时，this 会被设置为该对象本身。
当在浏览器环境中调用函数时，this 会被设置为 window，也被称为全局对象。

除此之外，还有一组方式可以调用函数：使用 apply() 和使用 call().

例子：
const dog = {
  bark: function () {
    console.log('Woof!');
  },
  barkTwice: function () {
    this.bark();
    this.bark();
  }
};
让我们继续调用 dog 的两个方法：

dog.bark();
// Woof!

dog.barkTwice();
// Woof!
// Woof!


对比一下：
const dog2 = {
  bark: function () {
    console.log('Woof!');
  },
  barkTwice: function () {
    bark();
    bark();
  }
};
undefined
dog2.barkTwice();
VM1970:6 Uncaught ReferenceError: bark is not defined
    at Object.barkTwice (<anonymous>:6:5)
    at <anonymous>:1:6


当我们调用 dog.bark() 或 dog.barkTwice() 时，变量 this 将被设置。
由于 this 可以访问调用它的对象，因此 barkTwice 可以使用 this 来访问包含 bark 方法的 dog 对象。

但是，如果我们在 barkTwice 中使用 bark()，而不是 this.bark()，将会怎样？
该函数会先在 barkTwice 的作用域内查找一个名为 bark 的局部变量。
！！！***如果没有找到 bark，则会沿着作用域链继续查找。
作用域链，不会去找声明函数的对象，而是声明函数的所在的位置。


设置我们自己的“this”：让我们来决定this指向的对象
首先是如何调用常规的函数：
function multiply(n1, n2) {
  return n1 * n2;
}
让我们在控制台中调用它：

multiply(3, 4);

// 12
这里没有任何惊喜！但现在，让我们使用 call() 方法来调用同一个函数：

multiply.call(window, 3, 4);

// 12
我们得到了相同的结果！这是怎么发生的？我们首先直接调用 call() 方法到 multiply() 函数上。
请注意，.call(window, 3, 4) 之前的 multiply 后​​面没有任何括号！ 
call() 将会处理该调用_和_ multiply() 函数的参数本身！

这一步完成后，我们传递将设置为 this 的值作为 call() 的第一个参数：window。
最后，我们逐个传递 multiply() 函数的参数，并用逗号分隔。

当 multiply.call(window, 3, 4); 执行后，该函数将以 this 的给定值被调用，我们所看到的结果就是 12。
在严格模式之外，调用 multiply() 的这两种方式是等价的。

“借用”其他对象的方法：
const dave = {
  name: 'Dave'
};

function sayHello(message) {
  console.log(`${message}, ${this.name}. You're looking well today.`);
}

const andrew = {
    name:'Andrew'
}

第一种：
dave.sayHello.call(andrew,'Hello');
第二种：
dave.sayHello.apply(andrew,['Hello']);  //先找到这个函数，再应用于另一个对象。
如果你事先并不知道函数所需要的参数个数，那么 call() 的使用可能会受到限制。
在这种情况下，apply() 是一个更好的选择，因为它只接受一个参数数组，然后将其解包并传递给函数。
请记住，解包可能会略微影响性能，但这种影响并不显著。


！！！****bind

回调和 this
当涉及到回调函数时，this 的值有一些潜在的作用域问题，事情会变得比较棘手。
使用匿名闭包来保存 this
让我们来回顾一下这个问题。以下是先前视频中的 invoiceTwice() 函数和 dog 对象：

function invokeTwice(cb) {
   cb();
   cb();
}

const dog = {
  age: 5,
  growOneYear: function () {
    this.age += 1;
  }
};
首先，调用 growOneYear() 按预期运作，将 dog 对象的 age 属性的值从 5 更新为 6：

dog.growOneYear();

dog.age; 
// 6
但是，将 dog.growOneYear（一个函数）作为参数传递给 invokeTwice() 则会产生不希望的结果：

invokeTwice(dog.growOneYear);

// undefined
这是什么原因呢？事实证明，invokeTwice() 确实会调用 growOneYear，但它是被调用为一个_函数而不是一个方法_！让我们回顾一下先前的 this 网格：


如果使用 new 运算符来调用构造函数，this 的值将被设置为新创建的对象。如果在对象上调用方法，this 将被设置为该对象本身。如果简单地调用一个函数，this 将被设置为全局对象：window。

使用匿名闭包来保存 this
还记得吗，简单地调用一个普通函数会将 this 的值设置为全局对象（即 window）。我们如何解决这个问题呢？

解决这个问题的一种方式就是使用一个匿名闭包来遮蔽 dog 对象：

invokeTwice(function () { 
  dog.growOneYear(); 
});

dog.age
// 7
使用这种方式，调用 invokeTwice() 仍然会将 this 的值设置为 window。但是，这对闭包没有影响；
在匿名函数中，growOneYear() 方法仍然会被直接调用到 dog 对象上。因此，dog 的 age 属性的值会从 5 更新为 7。

由于这是一种十分常见的模式，因此 JavaScript 提供了另一种比较简洁的方式：bind() 方法。

使用 bind() 来保存 this
与 call() 和 apply() 类似，bind() 方法也允许用户直接为 this 定义一个值。
bind() 也是一个在函数_上调用的方法，但不同于 call() 或 apply()，它们都会立即调用函数——bind() 会返回_一个新的函数。
当被调用时，该函数会将 this 设置为我们赋给它的值。


在底层，bind() 会返回一个新的函数（例如 myFunction()），它可以像普通函数一样被调用。
但在其内部，方法只会按照方法的样式被调用（例如 myObject.myMethod()）。
当我们传递回调函数遇到 this 的潜在作用域问题时，这对我们很有帮助。


3.
原型继承

// (A)
function Dalmatian (name) {
  this.name = name;

  this.bark = function() {
    console.log(`${this.name} barks!`);
  };
}
// (B)
function Dalmatian (name) {
  this.name = name;
}

Dalmatian.prototype.bark = function() {
  console.log(`${this.name} barks!`);
};

虽然这两种方式都可以达到目的（即，该构造函数所创建的任何实例都可以调用 bark() 方法），
但第二种方式更为理想。
通过向原型添加方法，当更多的 Dalmatian 对象被实例化时，不需要重新创建bark的reference.
也就是不需要重新分配空间给一个新的实例的bark.内存将被保存。
这种方式不仅更有效率，而且当我们想要更改方法时，也不需要逐个更新所有对象。（是指内存中需要修改所有的对象的Bark,而不是代码层面）


!!!***
    替换 prototype 对象 💡
如果完全替换某个函数的 prototype 对象，结果会怎样？这将如何影响该函数所创建的对象？
让我们来看一个简单的 Hamster 构造函数，并实例化一些对象：

function Hamster() { this.hasFur = true; }

let waffle = new Hamster(); let pancake = new Hamster(); `

首先要注意的是，在创建新的对象 waffle 和 pancake 之后，我们仍然可以为 Hamster 的原型添加属性，而且它仍然可以访问这些新的属性。

Hamster.prototype.eat = function () { console.log('Chomp chomp chomp!'); };

waffle.eat(); // 'Chomp chomp chomp!'

pancake.eat(); // 'Chomp chomp chomp!' 

现在，让我们将 Hamster 的 prototype 对象完全替换为其他内容：

Hamster.prototype = {
  isHungry: false,
  color: 'brown'
};
先前的对象无法访问更新后的原型的属性；它们只会保留与旧原型的秘密链接：

console.log(waffle.color); // undefined

waffle.eat(); // 'Chomp chomp chomp!'

console.log(pancake.isHungry); // undefined 

事实证明，此后创建的任何新的 Hamster 对象都会使用更新后的原型：

const muffin = new Hamster();

muffin.eat(); // TypeError: muffin.eat is not a function

console.log(muffin.isHungry); // false

console.log(muffin.color); // 'brown' 

