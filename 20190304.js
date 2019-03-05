20190304

1.

//类，本质就是”设置属性和方法”

类预览
下面快速查看下 JavaScript 类是怎么写的：

class Dessert {
  constructor(calories = 250) {
    this.calories = calories;
  }
}

class IceCream extends Dessert {
  constructor(flavor, calories, toppings = []) {
    super(calories);
    this.flavor = flavor;
    this.toppings = toppings;
  }
  addTopping(topping) {
    this.toppings.push(topping);
  }
}
注意到 Dessert 和 IceCream, 前面的新关键字 class ，以及 class IceCream extends Dessert 中的新关键字 extends 了吗？还有 IceCream 的 constructor() 方法中 super() 的调用。


2.
ES5 “类”总结
因为 ES6 类只是一个“幻景”（语法糖），原型继承实际上在底层被隐藏起来了，我们快速了解下如何用 ES5 代码创建“类”：

function Plane(numEngines) {
  this.numEngines = numEngines;
  this.enginesActive = false;
}

// 由所有实例 "继承" 的方法
Plane.prototype.startEngines = function () {
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
  constructor(numEngines) {  //属性用constructor
    this.numEngines = numEngines;
    this.enginesActive = false;
  }

  startEngines() {   //函数直接写进去
    console.log('starting engines…');
    this.enginesActive = true;
  }
}


3.

类只是一种函数
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

⚠️ 逗号都去哪了？ ⚠️
你是否注意到，类中的方法定义之间没有任何逗号了？在类中，不用逗号来区分属性或方法。如果添加逗号，将出现 SyntaxError：unexpected token


一个练习：
class Animal {
  constructor(name = 'Sprinkles', energy = 100) {
    this.name = name;
    this.energy = energy;
  }

  eat(food) {
    this.energy += food / 3;
  }
}
下面的哪些选项正确？

eat() 方法出现在 Animal.prototype 上。



typeof Animal === 'function'


4.
静态方法
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
注意：对构造函数、类方法或原型继承的原理有点困惑？我们专门开设了一门课程。请参阅面向对象的 JavaScript。

类的优势
设置内容更少
创建函数要编写的代码少多了
清晰地定义了构造函数
在类定义总，可以清晰地指定构造函数。
全部都包含起来了
类需要的所有代码都包含在类声明中。你可以同时设定一切内容，而不用在一个位置编写构造函数，然后向原型一个一个地添加方法，你可以同时做所有的事！
使用类时需要注意的事项
class 不是魔术
关键字 class 带来了其它基于类的语言中的很多思想观念。它没有像变魔术一样向 JavaScript 类添加了此功能。
class 是原型继承的抽象形式
我们已经多次提到，JavaScript 类实际上使用的就是原型继承。
使用类需要用到 new
在创建 JavaScript 类的新实例时，必须使用关键字 new
例如

class Toy {
   ...
}

const myToy1 = Toy(); // throws an error
Uncaught TypeError: Class constructor Toy cannot be invoked without 'new'

但是，添加关键字 new 后问题就解决了

const myToy2 = new Toy(); // this works!


5.

ES6 中的子类
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

与 ES5 子类对比
我们看看用 ES5 编写相同功能的代码：

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

这段代码和上面的类风格的代码都实现了相同的功能。