///1.今天继续复习 javascript the weird parts section 4

///IIFE： immediately invoked function expressions 国内叫：匿名函数自执行

//function statement
function greet(name){
    console.log('hello' + name);
}

greet();

//using a function expression:
var greetFunc = function(name){
    console.log('Hello' + name );
};
greetFunc('john');


//using an Immediately invoked function expression
var greeting = function(name){
    
    return 'hello' + name;
    
}('John');

console.log(greeting);///greeting是一个string

///另一个IIFE:
var firstname = 'john';
(function(name){
    
    var greeting = 'hello';
    console.log(greeting +" " + name);
}(firstname));   ///最外层的括号，因为js一读到function就默认处理为函数statement.
                    ///js的括号里是expression,而不能是statement.


////2.闭包
function greet(whattosay){  //返回了一个函数的函数
    
    return function(name){
        console.log(whattosay + '' + name);  
    }
}

greet('hi')('tony');

var sayHi = greet('hi'); //问题来了，greet执行完毕后，已经从执行栈pop out.
sayHi('Tony');     //sayHi函数是如何取得whattosay这个参数的值的。

////一个函数写在另一个函数里，根据scope chain就能找到外层函数里的变量。即便外层函数
////已经执行完毕了。



///2.

function buildFunctions(){
    
    var arr = [];
    
    for(var i = 0; i < 3; i++){
        
        arr.push(
            function(){
                console.log(i);
            }
        
        )
    }
    
    return arr;
}


var fs = buildFunctions();

fs[0]();   ///3
fs[1]();   ///3
fs[2]();   ///3


//上述问题有两个方式解决：

function buildFunctions2(){
    
    var arr = [];
    
    for(var i = 0; i < 3; i++){
        
        arr.push(
            (function(j){
                return function(){
                    console.log(j);
                }
            }(i))
        
        )
    }
    
    return arr;
}




function buildFunctions3(){
    
    var arr = [];
    
    for(var i = 0; i < 3; i++){
        
        let j = i;
        arr.push(
             function(){
                console.log(j);
            }    
        )
    }
    
    return arr;
}


//回调函数，实际上 就是利用了闭包的特性。


function sayHiLater(){
    var greeting = 'hi';
    
    setTimeout(function(){
        console.log(greeting);
    },3000)
}


sayHiLater();



////3.
call(),apply(),bind();

var person = {
    firstname : 'john',
    lastnamae:"doe",
    getFullName: function(){
        
        var fullname = this.firstname + " " +this.lastnamae;
        return fullname;
    }
}

var logName = function(lang1, lang2){
    console.log("Logged: " + this.getFullName()); 
    console.log('Arguments: ' + lang1 + lang2);
}

logName();/// undefined is not an function


var logPersonName = logName.bind(person);   ///bind只是拷贝了一份函数，并没有调用和这个函数

logPersonName('en');/// Logged : john doe
                        ///'Arguments: ' en undefined

logName.call(person,'en','es'); ///直接调用了函数： Logged : john doe
                                       ///'Arguments: ' en es

logName.apply(person,['en','es']);///和call一模一样，只是需要参数变成数组


(function(lang1, lang2){
    console.log("Logged: " + this.getFullName()); 
    console.log('Arguments: ' + lang1 + lang2);
}).apply(person,['es','en'])



////function borrowing
var person2= {
    firstname:'jane',
    lastname:'doe'
};

person.getFullName.apply(person2);///

////function currying：拷贝一份已有的函数，且把它的参数中的某些提前预设好
function multiply(a,b){
    return a*b;
}

var multipleByTwo = multiply.bind(this,2);

///相当于
function multiply(a,b){
    var a = 2;
    return a*b;
}





/////妙味课堂：你真的了解JS吗

//1.定时器的多个参数：第一个参数是时间，第二个参数是回调函数的参数
setTimeout(function(num){
    console.log(num);
},1000,123) ; //123 

setTimeout(function(num1,num2){
    console.log(num1 + '---' + num2);
},1000,123,456) ; 

///2.拼接字符串：
 //用加号，或者\，可以让一个长字符串在编辑器中换行书写

///3.typeOf,instanceof,in

var a = new Object();
//undefined
a.num=10;
'num'in a  //查看一个对象是否有某一属性
//true

'num'in(a) //另一个写法

var arr = [];
arr instanceof Object //true
typeof arr //Object


//4.嵌套for 循环

a : for(var i=0; i<5; i++){
    
    for(var j=0; j<1;j++){
        
        if(i==3){
            break a;
        }
        console.log(i);
    }
} 

//如果不这样写，则只会跳出内层循环,会打印0，1，2，4
//跳出外层循环后，只有0，1，2，


