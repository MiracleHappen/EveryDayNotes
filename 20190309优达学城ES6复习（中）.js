20190309

1.继续复习优达学城ES6
第二课主要分为函数部分和类。

2.
////将函数转换为箭头函数
const upperizedNames = ['Farrin', 'Kagure', 'Asser'].map(function(name) { 
  return name.toUpperCase();
});
对于上述函数，将现有的"普通"函数转换为箭头函数只需几步。

删掉关键字 function
删掉圆括号
删掉左右花括号
删掉关键字 return
删掉分号
在参数列表和函数主体之间添加一个箭头（=>）

const upperizedNames = ['Farrin', 'Kagure', 'Asser'].map(
  name => name.toUpperCase()
);


////箭头函数只能是函数表达式
普通函数可以是函数声明或函数表达式，但是箭头函数始终是表达式。实际上，它们的全称是“箭头函数表达式”，
因此仅在表达式有效时才能使用，包括：

存储在变量中，
当做参数传递给函数，
存储在对象的属性中。
一个令人迷惑的语法是箭头函数存储在变量中。

const greet = name => `Hello ${name}!`;
在上述代码中，箭头函数存储在变量 greet 中，你可以像以下代码这样调用它：

greet('Asser');
Returns: Hello Asser!
    
////如果列表中只有一个参数，那么可以像上述示例那样编写代码。但是，如果列表中有两个或多个参数，或者有零个，
////参数列表放在圆括号内：

// 空参数列表需要括号
const sayHi = () => console.log('Hello Udacity Student!');
sayHi();
Prints: Hello Udacity Student!

// 多个参数需要括号
const orderIceCream = (flavor, cone) => console.log(`Here's your ${flavor} ice cream in a ${cone} cone.`);
orderIceCream('chocolate', 'waffle');


////函数主体
如果箭头函数的主体内需要多行代码，则可以使用"常规主体语法"。

const upperizedNames = ['Farrin', 'Kagure', 'Asser'].map( name => {
  name = name.toUpperCase();
  return `${name} has ${name.length} characters in their name`;
});
对于常规主体语法需要记住的重要事项：

它将函数主体放在花括号内
需要使用 return 语句来返回内容。

////箭头函数的重要特性：this的不同
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

///箭头函数，相当于修正了之前普通函数在this上的错误。

3.
////默认函数参数
默认函数参数非常容易阅读，因为它们位于函数的参数列表中：

function greet(name = 'Student', greeting = 'Welcome') {
  return `${greeting} ${name}!`;
}

greet(); // Welcome Student!
greet('James'); // Welcome James!
greet('Richard', 'Howdy'); // Howdy Richard!


////默认参数和解构数组
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

////默认值和解构对象
就像使用数组默认值解构数组一样，函数可以让对象成为一个默认参数，并使用对象解构：

function createSundae({scoops = 1, toppings = ['Hot Fudge']}) {
  const scoopText = scoops === 1 ? 'scoop' : 'scoops';
  return `Your sundae has ${scoops} ${scoopText} with ${toppings.join(' and ')} toppings.`;
}

createSundae({}); // Your sundae has 1 scoop with Hot Fudge toppings.
createSundae({scoops: 2}); // Your sundae has 2 scoops with Hot Fudge toppings.
createSundae({scoops: 2, toppings: ['Sprinkles']}); // Your sundae has 2 scoops with Sprinkles toppings.
createSundae({toppings: ['Cookie Dough']}); // Your sundae has 1 scoop with Cookie Dough toppings.
Returns:
Your sundae has 1 scoop with Hot Fudge toppings.
Your sundae has 2 scoops with Hot Fudge toppings.
Your sundae has 2 scoops with Sprinkles toppings.
Your sundae has 1 scoop with Cookie Dough toppings.

就像上面的数组示例，如果尝试调用函数时不传入参数，将不可行：

createSundae(); // throws an error
Uncaught TypeError: Cannot match against 'undefined' or 'null'.

我们可以通过向函数提供默认对象来防止出现此问题：

function createSundae({scoops = 1, toppings = ['Hot Fudge']} = {}) {
  const scoopText = scoops === 1 ? 'scoop' : 'scoops';
  return `Your sundae has ${scoops} ${scoopText} with ${toppings.join(' and ')} toppings.`;
}
通过添加空对象作为默认参数，以防未提供参数，现在调用函数时没有任何参数将可行。

createSundae(); // Your sundae has 1 scoop with Hot Fudge toppings.


////数组默认值与对象默认值
默认函数参数只是个简单的添加内容，但是却带来很多便利！与数组默认值相比，对象默认值具备的一个优势是能够处理跳过的选项。看看下面的代码：

function createSundae({scoops = 1, toppings = ['Hot Fudge']} = {}) { … }
在 createSundae() 函数使用对象默认值进行解构时，如果你想使用 scoops 的默认值，但是更改 toppings，那么只需使用 toppings 传入一个对象：

createSundae({toppings: ['Hot Fudge', 'Sprinkles', 'Caramel']});
将上述示例与使用数组默认值进行解构的同一函数相对比。

function createSundae([scoops = 1, toppings = ['Hot Fudge']] = []) { … }
对于这个函数，如果想使用 scoops 的默认数量，但是更改 toppings，则必须以这种奇怪的方式调用你的函数：
//数组的解构，是需要按位置来的，而对象则按属性名

createSundae([undefined, ['Hot Fudge', 'Sprinkles', 'Caramel']]);
因为数组是基于位置的，我们需要传入 undefined 以跳过第一个参数（并使用默认值）来到达第二个参数。

除非你有很充足的理由来使用数组默认值进行数组解构，否则建议使用对象默认值进行对象解构！

练习:
/*
 * Programming Quiz: Using Default Function Parameters (2-2)
 */

// your code goes here
function buildHouse({floors=1,color="red",walls='brick'}={}){
    return `Your house has ${floors} floor(s) with ${color} ${walls} walls.`;
    
}

// const buildHouse = ({floors = 1,color = 'red',walls = 'brick'} = {}) => 
// `Your house has ${floors} floor(s) with ${color} ${walls} walls.`

/* tests
console.log(buildHouse()); // Your house has 1 floor(s) with red brick walls.
console.log(buildHouse({})); // Your house has 1 floor(s) with red brick walls.
console.log(buildHouse({floors: 3, color: 'yellow'})); // Your house has 3 floor(s) with yellow brick walls.
*/


--------------以上都是lesson2的函数部分，下面开始类--------------
1.

12.类预览
13.对javavscript类的错觉
14.javascript类
15.将函数转化为类
16.使用javascript类


////类预览
下面快速查看下 JavaScript 类是怎么写的：

class Dessert {
  constructor(calories = 250) {
    this.calories = calories;
  }
}
//类的创建就是要做两件事情：属性，方法。

class IceCream extends Dessert {
  constructor(flavor, calories, toppings = []) {
    super(calories);
    this.flavor = flavor;
    this.toppings = toppings;
  } //没有逗号
  addTopping(topping) {
    this.toppings.push(topping);
  }
}


////
ES5 “类”总结
因为 ES6 类只是一个“幻景”（语法糖），原型继承实际上在底层被隐藏起来了，我们快速了解下如何用 ES5 代码创建“类”：

function Plane(numEngines) {
  this.numEngines = numEngines;
  this.enginesActive = false;   //两个属性
}

// 由所有实例 "继承" 的方法
Plane.prototype.startEngines = function () {  //一个方法
  console.log('starting engines...');
  this.enginesActive = true;
};

const richardsPlane = new Plane(1);
richardsPlane.startEngines();

const jamesPlane = new Plane(4);
jamesPlane.startEngines();
在上述代码中，Plane 函数是一个构造函数，它将用来创建新的 Plane 对象。具体的 Plane 对象的数据被传递给 Plane 函数，并设置到该对象上。每个 Plane 对象继承的方法被放置在 Plane.prototype 对象上。然后，richardsPlane 被创建后有一个引擎，而 jamesPlane 被创建后有四个引擎。但是，这两个对象都使用相同的 startEngines 方法来激活各自的引擎。

需要注意的事项：

构造函数使用 new 关键字被调用
按照惯例，构造函数名以大写字母开头
构造函数控制将被创建的对象的数据的设置
“继承”的方法被放在构造函数的原型对象上
当我们了解 ES6 类的原理时，请记住这几点，因为 ES6 类都在底层帮你设置了所有这些。

ES6 类
以下是同一 Plane 类使用新的 class 语法编写后的代码：

class Plane {
  constructor(numEngines) {
    this.numEngines = numEngines;
    this.enginesActive = false;
  }

  startEngines() {
    console.log('starting engines…');
    this.enginesActive = true;
  }
}

////类只是一种函数
为了证明类没有任何特别之处，我们来看看下面的代码：

class Plane {
  constructor(numEngines) {
    this.numEngines = numEngines;
    this.enginesActive = false;
  }

  startEngines() {
    console.log('starting engines…');
    this.enginesActive = true;
  }
}

typeof Plane; // function
Returns: function

没错，它只是个函数！甚至没有向 JavaScript 添加新类型。

////静态方法
要添加静态方法，请在方法名称前面加上关键字 static。请看看下面的代码中的 badWeather() 方法。

class Plane {
  constructor(numEngines) {
    this.numEngines = numEngines;
    this.enginesActive = false;
  }

  static badWeather(planes) {
    for (plane of planes) {
      plane.enginesActive = false;
    }
  }

  startEngines() {
    console.log('starting engines…');
    this.enginesActive = true;
  }
}
注意 badWeather() 在前面有单词 static，而 startEngines() 没有？这样使得 badWeather() 成为 Plane 类中可以直接访问的方法，因此你可以这样调用它：

Plane.badWeather([plane1, plane2, plane3]);



2.

17.super和extends
18.从ES5到ES6的类扩展
19.使用javascript子类
20.练习：构建类和子类

////ES6 中的子类
我们已经了解了如何在 JavaScript 中创建类。现在使用新的 super 和 extends 关键字扩展类。

class Tree {
  constructor(size = '10', leaves = {spring: 'green', summer: 'green', fall: 'orange', winter: null}) {
    this.size = size;
    this.leaves = leaves;
    this.leafColor = null;
  }

  changeSeason(season) {
    this.leafColor = this.leaves[season];
    if (season === 'spring') {
      this.size += 1;
    }
  }
}

class Maple extends Tree {
  constructor(syrupQty = 15, size, leaves) {
    super(size, leaves);
    this.syrupQty = syrupQty;
  }

  changeSeason(season) {
    super.changeSeason(season);
    if (season === 'spring') {
      this.syrupQty += 1;
    }
  }

  gatherSyrup() {
    this.syrupQty -= 3;
  }
}

const myMaple = new Maple(15, 5);
myMaple.changeSeason('fall');
myMaple.gatherSyrup();
myMaple.changeSeason('spring');
Tree 和 Maple 都是 JavaScript 类。Maple 类是 Tree 的子类，并使用关键字 extends 将自己设为子类。要让子类可以访问到父类，需要使用关键字 super。注意到 super 有两种使用方式吗？在 Maple 的构造方法中，super 被用作函数。在 Maple 的changeSeason() 方法中，super 被用作对象！


////
Using call to chain constructors for an object Section
You can use call to chain constructors for an object, similar to Java. In the following example, the constructor for the Product object is defined with two parameters, name and price. Two other functions Food and Toy invoke Product passing this and name and price. Product initializes the properties name and price, both specialized functions define the category.

function Product(name, price) {
  this.name = name;
  this.price = price;
}

function Food(name, price) {
  Product.call(this, name, price);
  this.category = 'food';
}

function Toy(name, price) {
  Product.call(this, name, price);
  this.category = 'toy';
}

var cheese = new Food('feta', 5);
var fun = new Toy('robot', 40);


////上述代码按ES5的写法
function Tree(size, leaves) {
  this.size = size || 10;
  this.leaves = leaves || {spring: 'green', summer: 'green', fall: 'orange', winter: null};
  this.leafColor;
}

Tree.prototype.changeSeason = function(season) {
  this.leafColor = this.leaves[season];
  if (season === 'spring') {
    this.size += 1;
  }
}

function Maple (syrupQty, size, leaves) {
  Tree.call(this, size, leaves);
  this.syrupQty = syrupQty || 15;
}

Maple.prototype = Object.create(Tree.prototype);
Maple.prototype.constructor = Maple;

Maple.prototype.changeSeason = function(season) {
  Tree.prototype.changeSeason.call(this, season);
  if (season === 'spring') {
    this.syrupQty += 1;
  }
}

Maple.prototype.gatherSyrup = function() {
  this.syrupQty -= 3;
}

const myMaple = new Maple(15, 5);
myMaple.changeSeason('fall');
myMaple.gatherSyrup();
myMaple.changeSeason('spring');



///复习一下原型链相关知识点
https://www.youtube.com/watch?v=uIlj6_z_wL8    javascript prototype inheritance explained ( tutorial part-2)
__proto__取决于对象创建的方式：
/*1、字面量方式*/
var a = {};
console.log(a.__proto__);  //Object {}

console.log(a.__proto__ === a.constructor.prototype); //true

/*2、构造器方式*/
var A = function(){};
var a = new A();
console.log(a.__proto__); //A {}

console.log(a.__proto__ === a.constructor.prototype); //true

/*3、Object.create()方式*/
var a1 = {a:1}
var a2 = Object.create(a1);
console.log(a2.__proto__); //Object {a: 1}

console.log(a.__proto__ === a.constructor.prototype); //false


The Object.create() method creates a new object, using an existing object as the prototype of the newly created object.
const person = {
  isHuman: false,
  printIntroduction: function () {
    console.log(`My name is ${this.name}. Am I human? ${this.isHuman}`);
  }
};

const me = Object.create(person);

me.name = "Matthew"; // "name" is a property set on "me", but not on "person"
me.isHuman = true; // inherited properties can be overwritten

me.printIntroduction();
// expected output: "My name is Matthew. Am I human? true"

mdn上关于继承：
// Shape - superclass
function Shape() {
  this.x = 0;
  this.y = 0;
}

// superclass method
Shape.prototype.move = function(x, y) {
  this.x += x;
  this.y += y;
  console.info('Shape moved.');
};

// Rectangle - subclass
function Rectangle() {
  Shape.call(this); // call super constructor.
}

// subclass extends superclass
Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;

var rect = new Rectangle();

console.log('Is rect an instance of Rectangle?',
  rect instanceof Rectangle); // true
console.log('Is rect an instance of Shape?',
  rect instanceof Shape); // true
rect.move(1, 1); // Outputs, 'Shape moved.'