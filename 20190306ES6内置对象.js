20190306
ES6新增内置对象：

1.
Symbols（标识符）
Symbol 是一种独特的且不可变的数据类型，经常用来标识对象属性。

要创建 Symbol，输入 Symbol()，并添加一个可选的字符串作为其描述。

const sym1 = Symbol('apple');
console.log(sym1);
Symbol(apple)

它将创建唯一的标识符，并将其存储在 sym1 中。描述 "apple" 只是用来描述标识符的一种方式，但是不能用来访问标识符本身。

为了展示它的工作原理，如果你对具有相同描述的两个标识符进行比较……

const sym2 = Symbol('banana');
const sym3 = Symbol('banana');
console.log(sym2 === sym3);
false

结果是 false，因为描述只是用来描述符号，它并不是标识符本身的一部分。无论描述是什么，每次都创建新的标识符。

当然，依然很难弄明白，所以，我们来看一个之前视频中的示例，看看标识符的作用。下面是代表该示例中的 bowl（碗）的代码。

const bowl = {
  'apple': { color: 'red', weight: 136.078 },
  'banana': { color: 'yellow', weight: 183.15 },
  'orange': { color: 'orange', weight: 170.097 }
};
碗中包含水果，它们是 bowl 的属性对象。但是，当我们添加第二个香蕉时，遇到了问题。

const bowl = {
  'apple': { color: 'red', weight: 136.078 },
  'banana': { color: 'yellow', weight: 183.151 },
  'orange': { color: 'orange', weight: 170.097 },
  'banana': { color: 'yellow', weight: 176.845 } //object中相同属性的项会被覆盖
};
console.log(bowl);
Object {apple: Object, banana: Object, orange: Object}

新添加的香蕉将上一个香蕉覆盖了。为了解决该问题，我们可以使用标识符。

const bowl = {
  [Symbol('apple')]: { color: 'red', weight: 136.078 },
  [Symbol('banana')]: { color: 'yellow', weight: 183.15 },
  [Symbol('orange')]: { color: 'orange', weight: 170.097 },
  [Symbol('banana')]: { color: 'yellow', weight: 176.845 }   //注意加了中括号的写法
};
console.log(bowl);
Object {Symbol(apple): Object, Symbol(banana): Object, Symbol(orange): Object, Symbol(banana): Object}

通过更改 bowl 的属性并使用标识符，每个属性都是唯一的标识符，第一个香蕉不会被第二个香蕉覆盖。


2.一个讲解iterable ,iterator的YouTube视频

https://www.youtube.com/watch?v=ZNrJPzjNt-o

得到如下几个关键点：1.只有iterable才可以使用for...of...;2.只有iterable的对象才能通过console.dir(object)看到它的_proto_下有[Symble.iterator]();3.普通非iterbale的对象，依然可以使用for...in..得到object所有的key，但是也包含它从父级prototype上继承的属性以及方法。


3.
在继续之前，我们先花些时间看一下 ES6 中的两个新协议：

可迭代协议
迭代器协议
这两个协议不是内置的，但是它们可以帮助你理解 ES6 中的新迭代概念，就像给你展示标识符的使用案例一样。

可迭代协议
可迭代协议用来定义和自定义对象的迭代行为。也就是说在 ES6 中，你可以灵活地指定循环访问对象中的值的方式。对于某些对象，它们已经内置了这一行为。例如，字符串和数组就是内置可迭代类型的例子。
*自定义对象的迭代行为：比如后面代码，人为的添加iterator方法。

const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
for (const digit of digits) {
  console.log(digit);
}
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

在第一节课，我们提到，任何可迭代的对象都可以使用新的 for...of 循环。在这节课的稍后阶段，我们还将学习 Set（集合）和 Map（映射），它们也是内置可迭代类型。

工作原理
为了使对象可迭代，它必须实现可迭代接口。接口其实就是为了让对象可迭代，它必须包含默认的迭代器方法。该方法将定义对象如何被迭代。

迭代器方法（可通过常量 [Symbol.iterator] 获得）是一个无参数的函数，返回的是迭代器对象。迭代器对象是遵守迭代器协议的对象。

迭代器协议
迭代器协议用来定义对象生成一系列值的标准方式。实际上就是现在有了定义对象如何迭代的流程。通过执行 .next() 方法来完成这一流程。

工作原理
当对象执行 .next() 方法时，就变成了迭代器。.next() 方法是无参数函数，返回具有两个属性的对象：

value：表示对象内值序列的下个值的数据
done：表示迭代器是否已循环访问完值序列的布尔值
如果 done 为 true，则迭代器已到达值序列的末尾处。
如果 done 为 false，则迭代器能够生成值序列中的另一个值。
下面是之前的一个示例，但是我们改为使用数组的默认迭代器访问数组中的每个值。

const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const arrayIterator = digits[Symbol.iterator]();

console.log(arrayIterator.next());
console.log(arrayIterator.next());
console.log(arrayIterator.next());


练习：将普通对象转换为Iterabe
* Programming Quiz: Make An Iterable Object
 *
 * Turn the `james` object into an iterable object.
 *
 * Each call to iterator.next should log out an object with the following info:
 *   - key: the key from the `james` object
 *   - value: the value of the key from the `james` object
 *   - done: true or false if there are more keys/values
 *
 * For clarification, look at the example console.logs at the bottom of the code.
 *
 * Hints:
 *   - Use `Object.keys()` to store the object's properties in an array.
 *   - Each call to `iterator.next()` should use this array to know which property to return.
 *   - You can access the original object using `this`.
 *   - To access the values of the original object, use `this` and the key from the `Object.keys()` array.
 */

const james = {
    name: 'James',
    height: `5'10"`,
    weight: 185,
    [Symbol.iterator](){  //人为的写一个[Symble.iterabtor]()。相当于自定义的迭代器接口，定义了这个对象以何种方式来迭代。
        let properties = Object.keys(this);
        let index = 0;
        let contex = this;//闭包
        return {   //注意返回：属性就是直接给你一个值，函数是给你一个经过各种计算后的返回值，甚至是另一个函数。
          next() {
            return {"value":contex[properties[index]], "key":properties[index], "done":Boolean(index++ >= properties.length - 1) };
          }
        };
    }
};


4.
Set
数学意义上的集合（Set）
回忆下之前的数学知识，Set 就是唯一项的集合。例如，{2, 4, 5, 6} 是 Set，因为每个数字都是唯一的，只出现一次。但是，{1, 1, 2, 4} 不是 Set，因为它包含重复的项目（1 出现了两次！）。

在 JavaScript 中，我们已经可以使用数组表示类似于数学意义上的集合。

const nums = [2, 4, 5, 6];
但是，数组并不要求项目必须唯一。如果我们尝试向 nums 中添加一个 2，JavaScript 不会报错，会正常添加这个 2。

nums.push(2);
console.log(nums);
[2, 4, 5, 6, 2]

现在，nums 不再是数学意义上的集合。

Set（集合）
在 ES6 中，有一个新的内置对象的行为和数学意义上的集合相同，使用起来类似于数组。这个新对象就叫做“Set”。Set 与数组之间的最大区别是：

Set 不基于索引，不能根据集合中的条目在集合中的位置引用这些条目
Set 中的条目不能单独被访问
基本上，Set 是让你可以存储唯一条目的对象。你可以向 Set 中添加条目，删除条目，并循环访问 Set。这些条目可以是原始值或对象。

如何创建 Set
可以通过几种不同的方式创建 Set。第一种很简单：

const games = new Set();
console.log(games);
Set {}

此代码会创建空的 Set games，其中没有条目。

如果你想根据值列表创建 Set，则使用数组：

const games = new Set(['Super Mario Bros.', 'Banjo-Kazooie', 'Mario Kart', 'Super Mario Bros.']);
console.log(games);
Set {'Super Mario Bros.', 'Banjo-Kazooie', 'Mario Kart'}

注意上述示例在创建 Set 时，会自动移除重复的条目 "Super Mario Bros."，很整洁！


5.
修改 Set
创建 Set 后，你可能想要添加或删除条目。如何操作呢？可以使用名称对应的 .add() 和 .delete() 方法：

const games = new Set(['Super Mario Bros.', 'Banjo-Kazooie', 'Mario Kart', 'Super Mario Bros.']);

games.add('Banjo-Tooie');
games.add('Age of Empires');
games.delete('Super Mario Bros.');

console.log(games);
Set {'Banjo-Kazooie', 'Mario Kart', 'Banjo-Tooie', 'Age of Empires'}

另一方面，如果你想要删除 Set 中的所有条目，可以使用 .clear() 方法。

games.clear()
console.log(games);
Set {}

提示：如果你尝试向 Set 中 .add() 重复的条目，系统不会报错，但是该条目不会添加到 Set 中。此外，如果你尝试 .delete() Set 中不存在的条目，也不会报错，Set 保持不变。

.add() 添加不管成功与否，都会返回该 Set 对象。另一方面，.delete() 则会返回一个布尔值，该值取决于是否成功删除（即如果该元素存在，返回true，否则返回false）。

6.
使用 Set
查看长度
构建 Set 后，可以通过几个不同的属性和方法来处理 Set。

使用 .size 属性可以返回 Set 中的条目数：

const months = new Set(['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']);
console.log(months.size);
12

注意，不能像数组那样通过索引访问 Set，因此要使用 .size 属性，而不是 .length 属性来获取 Set 的大小。

检查是否存在某个条目
使用 .has() 方法可以检查 Set 中是否存在某个条目。如果 Set 中有该条目，则 .has() 将返回 true。如果 Set 中不存在该条目，则 .has() 将返回 false。

console.log(months.has('September'));
true

检索所有值
最后，使用 .values() 方法可以返回 Set 中的值。.values() 方法的返回值是 SetIterator 对象。

console.log(months.values());
SetIterator {'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'}

稍后将讲解 SetIterator 对象！

提示：.keys() 方法将和 .values() 方法的行为完全一样：将 Set 的值返回到新的迭代器对象中。.keys() 方法是 .values() 方法的别名，和 Map（映射）中的类似。你稍后将在这节课的 Map 部分看到 .keys() 方法。

7.
最后是Set的循环。两种方式。

如果还记得之前介绍的 ES6 中的新可迭代协议和迭代器协议，那么你会想起 Set 是内置可迭代类型。这意味着循环时的两件事：

你可以使用 Set 的默认迭代器循环访问 Set 中的每一项。
你可以使用新的 for...of 循环来循环访问 Set 中的每一项。
使用 SetIterator
因为 .values() 方法返回新的迭代器对象（称为 SetIterator），你可以将该迭代器对象存储在变量中，并使用 .next() 访问 Set 中的每一项。

const iterator = months.values();
iterator.next();
Object {value: 'January', done: false}

如果再次运行 .next() 呢？

iterator.next();
Object {value: 'February', done: false}

等等，一直运行到 done 等于 true 时，标志着 Set 的结束。
使用 for...of 循环
一种更简单的方法去循环访问 Set 中的项目是 for...of 循环。

const colors = new Set(['red', 'orange', 'yellow', 'green', 'blue', 'violet', 'brown', 'black']);
for (const color of colors) {
  console.log(color);
}
red 
orange 
yellow 
green 
blue 
violet 
brown 
black

8.set练习
let myFavoriteFlavors = new Set();
 myFavoriteFlavors.add("chocolate chip");
 myFavoriteFlavors.add("cookies and cream");
 myFavoriteFlavors.add("strawberry");
 myFavoriteFlavors.add("vanilla");
 myFavoriteFlavors.delete("strawberry");


9.
什么是 WeakSet（弱集合）？
WeakSet 和普通 Set 很像，但是具有以下关键区别：

WeakSet 只能包含对象
WeakSet 无法迭代，意味着不能循环访问其中的对象
WeakSet 没有 .clear() 方法

你可以像创建普通 Set 那样创建 WeakSet，但是需要使用 WeakSet 构造函数。

const student1 = { name: 'James', age: 26, gender: 'male' };
const student2 = { name: 'Julia', age: 27, gender: 'female' };
const student3 = { name: 'Richard', age: 31, gender: 'male' };

const roster = new WeakSet([student1, student2, student3]);
console.log(roster);
WeakSet {Object {name: 'Julia', age: 27, gender: 'female'}, Object {name: 'Richard', age: 31, gender: 'male'}, Object {name: 'James', age: 26, gender: 'male'}}

但是如果你尝试添加对象以外的内容，系统将报错！

roster.add('Amanda');
Uncaught TypeError: Invalid value used in weak set(…) //不能加入原子类型

这是预期到的行为，因为 WeakSet 只能包含对象。但是为何只能包含对象？如果普通 Set 可以包含对象和其他类型的数据，为何还要使用 WeakSet？这个问题的答案与为何 WeakSet 没有 .clear() 方法有很大的关系……

垃圾回收
在 JavaScript 中，创建新的值时会分配内存，并且当这些值不再需要时，将自动释放内存。这种内存不再需要后释放内存的过程称为垃圾回收。

WeakSet 通过专门使用对象作为键值来利用这一点。如果将对象设为 null，则本质上是删除该对象。当 JavaScript 的垃圾回收器运行时，该对象之前占用的内存将被释放，以便稍后在程序中使用。

student3 = null;
console.log(roster);
WeakSet {Object {name: 'Julia', age: 27, gender: 'female'}, Object {name: 'James', age: 26, gender: 'male'}} //第三个object已经自动被删除了

练习：
let uniqueFlavors = new WeakSet();
let flavor1 = {flavor:'chocolate'};
let flavor2 ={flavor:'hahaha'};
uniqueFlavors.add(flavor1);
uniqueFlavors.add(flavor2);
uniqueFlavors.add(flavor1);


10.
Map（映射）
如果说 Set 类似于数组，那么 Map 就类似于对象，因为 Map 存储键值对，和对象包含命名属性及值相类似。

本质上，Map 是一个可以存储键值对的对象，键和值都可以是对象、原始值或二者的结合。

如何创建 Map
要创建 Map，只需输入：

const employees = new Map();
console.log(employees);
Map {}

这样就会创建空的 Map employee，没有键值对。

修改 Map
和 Set 不同，你无法使用值列表创建 Map；而是使用 Map 的 .set() 方法添加键值。

const employees = new Map();

employees.set('james.parkes@udacity.com', { 
    firstName: 'James',
    lastName: 'Parkes',
    role: 'Content Developer' 
});
employees.set('julia@udacity.com', {
    firstName: 'Julia',
    lastName: 'Van Cleve',
    role: 'Content Developer'
});
employees.set('richard@udacity.com', {
    firstName: 'Richard',
    lastName: 'Kalehoff',
    role: 'Content Developer'
});

console.log(employees);
Map {'james.parkes@udacity.com' => Object {...}, 'julia@udacity.com' => Object {...}, 'richard@udacity.com' => Object {...}}

.set() 方法有两个参数。第一个参数是键，用来引用第二个参数，即值。

要移除键值对，只需使用 .delete() 方法。

employees.delete('julia@udacity.com');
employees.delete('richard@udacity.com');
console.log(employees);
Map {'james.parkes@udacity.com' => Object {firstName: 'James', lastName: 'Parkes', role: 'Course Developer'}}

同样，和 Set 类似，你可以使用 .clear() 方法从 Map 中删除所有键值对。

employees.clear()
console.log(employees);
Map {}

提示：如果你使用 .set() 向 Map 中添加键已存在的键值对，不会收到错误，但是该键值对将覆盖 Map 中的现有键值对。此外，如果尝试使用 .delete() 删除 Map 中不存在的键值，不会收到错误，而 Map 会保持不变。

如果成功地删除了键值对，.delete() 方法会返回 true，失败则返回 false。.set() 如果成功执行，则返回 Map 对象本身。

11.
    处理 Map
构建 Map 后，可以使用 .has() 方法并向其传入一个键来检查 Map 中是否存在该键值对。

const members = new Map();

members.set('Evelyn', 75.68);
members.set('Liam', 20.16);
members.set('Sophia', 0);
members.set('Marcus', 10.25);

console.log(members.has('Xavier'));
console.log(members.has('Marcus'));
false
true

还可以通过向 .get() 方法传入一个键，检索 Map 中的值。

console.log(members.get('Evelyn'));
75.68
                                                                                
                                                                                
12.
循环访问 Map
你已经创建了 Map，添加了一些键值对，现在你想循环访问该 Map。幸运的是，可以通过以下三种方式循环访问：

使用 Map 的默认迭代器循环访问每个键或值
使用新的 for...of 循环来循环访问每个键值对
使用 Map 的 .forEach() 方法循环访问每个键值对

1. 使用 MapIterator
在 Map 上使用 .keys() 和 .values() 方法将返回新的迭代器对象，叫做 MapIterator。你可以将该迭代器对象存储在新的变量中，并使用 .next() 循环访问每个键或值。你所使用的方法将决定迭代器是否能够访问 Map 的键或值。

let iteratorObjForKeys = members.keys();
iteratorObjForKeys.next();
Object {value: 'Evelyn', done: false}

使用 .next() 获得下个键值对。

iteratorObjForKeys.next();
Object {value: 'Liam', done: false}

等等。

iteratorObjForKeys.next();
Object {value: 'Sophia', done: false}

另一方面，使用 .values() 方法访问 Map 的值，然后重复同一流程。

let iteratorObjForValues = members.values();
iteratorObjForValues.next();
Object {value: 75.68, done: false}

2. 使用 for...of 循环
Map 的第二种循环访问方式是使用 for...of 循环。

for (const member of members) {
  console.log(member);
}
 ['Evelyn', 75.68]
 ['Liam', 20.16]
 ['Sophia', 0]
 ['Marcus', 10.25]
但是，在对 Map 使用 for...of 循环时，并不会得到一个键值或一个值。键值对会拆分为一个数组，第一个元素是键，第二个元素是值。有没有什么方法可以解决这一问题？

/* Using array destructuring解构, fix the following code to print the keys and values of the `members` Map to the console.
 */

const members = new Map();

members.set('Evelyn', 75.68);
members.set('Liam', 20.16);
members.set('Sophia', 0);
members.set('Marcus', 10.25);

for (const member of members) {
    // console.log(key, value);
    const [x,y] = member;
     console.log(x)
}
                                                                                
3. 使用 forEach 循环
最后一种循环访问 Map 的方式是使用 .forEach() 方法。

members.forEach((value, key) => console.log(value, key));
 'Evelyn' 75.68
 'Liam' 20.16
 'Sophia' 0
 'Marcus' 10.25
注意，在使用箭头函数后，forEach 循环是如何简单地读取数据的。对于 members 中的每个 value 和 key，都会被输出到控制台中。  


13.
                                                                                什么是 WeakMap？
WeakMap 和普通 Map 很像，但是具有以下关键区别：

WeakMap 只能包含对象作为键，
WeakMap 无法迭代，意味着无法循环访问，并且
WeakMap 没有 .clear() 方法。

你可以像创建普通 Map 那样创建 WeakMap，但是需要使用 WeakMap 构造函数。

const book1 = { title: 'Pride and Prejudice', author: 'Jane Austen' };
const book2 = { title: 'The Catcher in the Rye', author: 'J.D. Salinger' };
const book3 = { title: 'Gulliver's Travels', author: 'Jonathan Swift' };

const library = new WeakMap();
library.set(book1, true);
library.set(book2, false);
library.set(book3, true);

console.log(library);
WeakMap {Object {title: 'Pride and Prejudice', author: 'Jane Austen'} => true, Object {title: 'The Catcher in the Rye', author: 'J.D. Salinger'} => false, Object {title: 'Gulliver's Travels', author: 'Jonathan Swift'} => true}

但是如果你尝试添加对象以外的内容作为键，系统将报错！

library.set('The Grapes of Wrath', false);//只能是对象，塞入字符串，报错
Uncaught TypeError: Invalid value used as weak map key(…)

这是可预期到的行为，因为 WeakMap 只能包含对象作为键。但是为何只能包含对象？同样，和 WeakSet 相似，WeakMap 利用垃圾回收机制让其可以更简单地使用和易维护。

垃圾回收
在 JavaScript 中，创建新的值时会分配内存，并且当这些值不再需要时，将自动释放内存。这种内存不再需要后释放内存的过程称为垃圾回收。

WeakMap 通过专门处理对象作为键来利用这一点。如果将对象设为 null，则本质上是删除该对象。当 JavaScript 的垃圾回收器运行时，该对象之前占用的内存将被释放，以便稍后在程序中使用。

book1 = null;
console.log(library);
WeakMap {Object {title: 'The Catcher in the Rye', author: 'J.D. Salinger'} => false, Object {title: 'Gulliver’s Travels', author: 'Jonathan Swift'} => true}