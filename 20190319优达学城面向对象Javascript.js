第 1 课 将详细介绍如何创建、访问和修改对象。
第 2 课 将探讨 JavaScript 函数为什么是 _一级_ 函数。
第 3 课 将说明 JavaScript 对传统类和继承的抽象。

第1课
1.对象简介

javascript对象中的键，是字符串，可以带引号也可以不带。
和ruby哈希以及 python字典都有区别。ruby的键是符号，python的键是可哈希的值比如字符串，数字，浮点数。

最重要的是，你不仅可以利用 JavaScript 中的对象来保存数据，
而且还可以实现许多强大的功能，如构造函数。
这是一个面向对象的 JavaScript 课程，因此我们将在本课程中深入探索这些功能！


点表示法的局限性 ⚠️
请注意，尽管点表示法可能更易于读写，但它并不适用于所有情况。例如，假设上面的 bicycle 对象中有一个键是_数字_。那么，像 bicycle.1; 这样的表达式将会导致错误，而 bicycle[1]; 则可以返回预期的值：

bicycle.1;

// Uncaught SyntaxError: Unexpected number

bicycle[1];

// (returns the value of the `1` property)
另一个问题在于将变量赋给属性名称。假设我们声明了 myVariable，并将其赋给字符串 'color'：

const myVariable = 'color';
bicycle[myVariable]; 将会返回 'blue'，因为变量 myVariable 会被替换为它的值（字符串 'color'），且 bicycle['color'] 的值也同样是 'blue'。 但 bicycle.myVariable 则会返回 undefined：

bicycle[myVariable];

// 'blue'

bicycle.myVariable;

// undefined
这看起来也许很奇怪，但要记得，JavaScript 对象中的_所有属性键都是字符串_，即使省略了引号也是如此。当使用点表示法时，JavaScript 解释器将在 bicycle 中查找一个值为 'myVariable' 的键。由于该对象中并未定义这样一个键，因此这个表达式将会返回 undefined。

2.创建对象：
字面量方式，构造函数方式。
Object() 构造函数相对较慢，而且较为冗长。因此，在 JavaScript 中创建新对象的推荐方法是使用字面量表示法。


修改属性：cat.name='haha';cat.age +=1;
！！！删除属性：delete cat.greet
delete 运算符将从对象中移除一个属性，并返回一个指示成功删除的布尔值。

对象是通过引用传递的，是通过函数可变的。
而原始值，是不可变的。函数中，只是创建了这个值的一个副本。
原始值
let string = 'orange';

function changeToApple(string) {
  string = 'apple';
}

changeToApple(string);

console.log(string);//orange


对象
const oven = {
  type: 'clay',
  temperature: 400
};
const newOven = oven;

newOven.temperature += 50;//450

对象通常使用字面量表示法来创建，并可包含指向函数的属性，称为方法。方法的访问方式与对象其他属性的访问方式相同，
而且可以像普通函数一样进行_调用_，只不过它们可以自动访问其父对象的其他属性。

3.
调用对象的方法
我们可以使用属性名称来访问对象中的函数。对象的函数属性的另一个名称是方法。我们可以像访问其他属性一样来访问它：使用点表示法或方括号表示法。让我们回头看看上面更新的 developer 对象，然后调用 sayHello 方法：

const developer = {
  name: 'Andrew',
  sayHello: function () {
    console.log('Hi there!');
  }
};
developer.sayHello();
// 'Hi there!'

developer['sayHello']();
// 'Hi there!'

还记得吗，对象可以包含数据和操纵数据的手段。但是，对象究竟_如何引用自身的属性，甚至操纵_其中一些属性呢？
这都是借助 this 关键字来实现的！

this 的值💡
根据函数_如何_被调用，this 可以被设置为不同的值！在本课程后面的部分，
我们将深入探索可以调用函数的不同方式，以及每种方式如何影响 this 的值。

4.this 和函数调用
让我们比较一下 chameleon 对象中的代码和 whoThis 代码。

const chameleon = {
  eyes: 2,
  lookAround: function () {
     console.log(`I see you with my ${this.eyes} eyes!`);
  }
};

function whoThis () {
  this.trickyish = true
}

chameleon.lookAround();

whoThis();

比较函数/方法的结构
现在，我想让你注意一下这两个代码段被调用的_结构上的区别。lookAround() 代码是一个方法_，因为它属于一个对象。由于它是一个方法，
因此它作为 chameleon 对象上的一个​​属性被调用：

chameleon.lookAround();
现在，请比较一下它和 whoThis() 代码。whoThis() _不是_一个方法，而是一个简单的、旧的、普通的函数。
再来看看 whoThis() 函数如何被调用：

whoThis();
它的调用方式与每个普通函数一样；就是函数名称和圆括号（前面没有对象，也没有点）。

this 和调用

！！！***函数如何调用决定了函数内的 this 的值。 ← 这句话真的很重要，所以请再读两遍...我们等你！

由于 .lookAround() 作为一个方法被调用，因此 .lookAround() 中的 this 的值就是调用时位于点左侧的部分。
由于调用如下所示：

chameleon.lookAround();
chameleon 对象位于点的左侧。因此，在 .lookAround() 方法中，this 将指向 chameleon 对象！

现在，让我们比较一下它和 whoThis() 函数。
由于它作为一个常规函数被调用（而不是作为对象上的方法被调用），因此它的调用如下所示：

whoThis();
如你所见，里面没有点。因此，点的左侧也没有任何对象。那么，whoThis() 函数中的 this 的值是什么呢？
这是 JavaScript 语言一个有趣的特点。
当一个_常规_函数被调用时，this 的值就是全局 window 对象。


window 对象
如果你还没有用过 window 对象，该对象是由浏览器环境提供的，并可使用标识符 window 在 JavaScript 代码中进行全局访问。
该对象不是 JavaScript 规范（即 ECMAScript）的一部分，而是由 W3C（英） 开发的。

这个 window 对象可以访问大量有关页面本身的信息，包括：

页面的 URL (window.location;)
页面的垂直滚动位置 (window.scrollY)
滚动到新位置（window.scroll(0, window.scrollY + 200);，从当前位置向下滚动 200 个像素）
打开一个新的网页 (window.open("https://www.udacity.com/");)

!!!***习题 2/3
你已经看到了 this 在 chameleon.lookAround() 和 whoThis() 中指向什么。请仔细查看以下代码：

const car = {
  numberOfDoors: 4,
  drive: function () {
     console.log(`Get in one of the ${this.numberOfDoors} doors, and let's go!`);
  }
};

const letsRoll = car.drive;

letsRoll();
你觉得 this 在以上代码中指向什么？//window对象

虽然 car.drive 是一个方法，但我们还是将该函数存储在一个变量 letsRoll 中。
由于 letsRoll() 是作为一个常规函数调用的，因此 this 将指向它内部的 window 对象。


!!!***全局变量，全局函数

只有使用 var 关键字来声明变量才会将其添加到 window 对象中。
如果你用 let 或 const 在函数外部声明一个变量，它将_不会_被作为属性添加到 window 对象中。

let currentlyEating = 'ice cream';

window.currentlyEating === currentlyEating 
// false!

函数声明为一个全局函数（即它可以全局访问，而没有写入另一个函数_内部）。


!!!***以下哪个变量和函数可以在 window 对象上获得？

var iceCreamEaten = 1;

function consume (numberOfGallons) {
  var result = iceCreamEaten + numberOfGallons;  ///var定义的变量的hoist只提升到函数顶部

  function updateTotals (newTotal) {
    iceCreamEaten = result;
  }

  updateTotals();
}

consume(3);

//iceCreamEaten

//consume


避免全局变量
如前所述，声明全局变量和函数会将它们作为属性添加到 window 对象。你可能会觉得，_全局_可访问的代码听起来好像超级有用，对吗？
我的意思是，如果你能随时随地吃到冰激凌（也许这只是我个人的梦想），那不是很好吗？

然而，与直觉相反，全局变量和函数并不理想。这是由于很多原因，不过我们要看的两种是：

紧密耦合  ：两段代码依赖性太高，难以修改。 
名称冲突 ：大家都改动了同一个量


5.
Object() 构造函数可以访问几种方法来帮助开发。简而言之：

Object.keys() 会返回一个数组，其中包含给定对象自己的键（属性_名称_）。
Object.values() 会返回一个数组，其中包含给定对象自己的值（属性_值_）。
