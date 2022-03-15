# 第8章 对象、类与面向对象编程

## 理解对象

**JS对象的概念**(重要)：ECMA-262将对象定义为一组属性的无序集合，严格来说，对象就是一组没有特定顺序的值

### 创建对象的方法

1. 使用`new Object()`创建
2. 使用花括号包围的对象字面量

```js
//1.
let person = new Object();
    person.name = "Nicholas";
    person.age = 29;
    person.job = "Software Engineer";
    person.sayName = function() {
    console.log(this.name);
};
//2.
let person = {
    name: "Nicholas",
    age: 29,
    job: "Software Engineer",
    sayName() {
    console.log(this.name);
    }
};
```

### 属性的类型

1. 数据属性

数据属性包含一个保存数据值的位置，值会从这个位置读取，也会写入到这个位置

数据属性有四个特性（两个中括号表示内部特性，不可以直接访问）

- `[[Configurable]]`:表示属性是否可以通过`delete`删除并重新定义，是否可以修改特性，是否可以改成访问器属性，默认为`true`。这个属性定义为`false`之后就不能再次修改了
- `[[Enumerable]]`：表示属性是否可以通过`for-in`循环返回，默认为`true`
- `[[Writable]]`： 表示属性值是否可以被修改，默认为`true`
- `Value`：属性实际的值，默认为`undefined`

`Object.defineProperty()`方法可以修改上述属性，例子如下

```js
et person = {};
Object.defineProperty(person, "name", {
    writable: false,
    value: "Nicholas"
});
console.log(person.name); // "Nicholas"
person.name = "Greg";
console.log(person.name); // "Nicholas"
```

2. 访问器属性

访问器属性包含一个`getter`和一个`setter`函数。

访问器属性有四个特性

- `[[Configurable]]`：表示属性是否可以通过`delete`删除并重新定义，是否可以修改它的特性，以及是否可以把它改为数据属性，默认为`true`
- `[[Enumerable]]`：表示属性是否可以通过`for-in`返回，默认为`true`
- `[[Get]]`：获取函数，在读取属性时调用，默认为`undefined`
- `[[Set]]`：设置函数，在写入属性时调用，默认为`undefined`

访问器属性不可以直接定义，必须用`Object.defineProperty()`，这个方法接收三个参数，要给其添加属性的对象、属性的名称和一个描述符对象。

例子如下

```js
// 定义一个对象，包含伪私有成员 year_和公共成员 edition
let book = {
    year_: 2017,
    edition: 1
};
Object.defineProperty(book, "year", {
get() {
	return this.year_;
},
set(newValue) {
    if (newValue > 2017) {
        this.year_ = newValue;
        this.edition += newValue - 2017;
        }
    }
});
book.year = 2018;
console.log(book.edition); // 2
```

同时定义多个属性用`Object.defineProperties()`方法，这个方法接收两个参数，要添加或者修改属性的对象和另一个描述符对象

读取属性的特性用` Object.getOwnPropertyDescriptor()`，这个方法接
收两个参数：属性所在的对象和要取得其描述符的属性名。

读取对象所有属性的特性用`Object.getOwnPropertyDescriptors() `，这个方法会在每个属性上调用` Object.getOwnPropertyDescriptor()`（ECMAScript2017新增）

合并或者叫混入(mixin)使用`Object.assign()`方法，这个方法接收一个目标对象和多个源对象作为参数，然后将每个源对象中可枚举(`Ojbect.propertysIsEnumerable()`返回`true`)和自有（`Ojbect.hasOwnProperty()`返回`true`）属性复制到目标对象，以字符串和符号为键的属性会被复制。对每个符合条件的属性，这个方法会使用源对象上的 `[[Get]]`取得属性的值，然后使用目标对象上的 `[[Set]]` 设置属性的值。

`Object.assign()` 实际上对每个源对象执行的是浅复制。如果多个源对象都有相同的属性，则使用最后一个复制的值。此外，从源对象访问器属性取得的值，比如获取函数，会作为一个静态值赋给目标对象。换句话说，不能在两个对象间转移获取函数和设置函数。

如果赋值期间出错，则操作会中止并退出，同时抛出错误。

ECMAScript新增了`Ojbect.is()`方法，该方法和`===`很像，但是考虑到了边界情形（`NaN !== NaN`）

检查超过两个值相等的函数

```js
function recursivelyCheckEqual(x, ...rest) {
	return Object.is(x, rest[0]) &&
        (rest.length < 2 || recursivelyCheckEqual(...rest));
}
```

### 增强的对象语法

1. 使用属性值简写

```js
let name = 'Matt';
let person = {
name: name
};
console.log(person); // { name: 'Matt' }

//简写后
let name = 'Matt';
let person = {
name
};
console.log(person); // { name: 'Matt' }
```

2. 可计算属性

简单来说，就是用中括号包围语句里面计算的结果是最终的属性名

```js
const nameKey = 'name';
const ageKey = 'age';
const jobKey = 'job';
let person = {
[nameKey]: 'Matt',
[ageKey]: 27,
[jobKey]: 'Software engineer'
};
console.log(person); // { name: 'Matt', age: 27, job: 'Software engineer' }
```

3. 简写方法名

```js
let person = {
sayName: function(name) {
    console.log(`My name is ${name}`);
    }
    };
person.sayName('Matt'); // My name is Matt
//简写之后
let person = {
    sayName(name) {
    console.log(`My name is ${name}`);
    }
};
person.sayName('Matt'); // My name is Matt
```

对`getter`和`setter`也可以简写

### 对象解构

```js
// 使用对象解构
let person = {
    name: 'Matt',
    age: 27
};
let { name: personName, age: personAge } = person;
console.log(personName); // Matt
console.log(personAge); // 27
```

对象解构可以使用简写语法，解构赋值也不一定与对象的属性匹配，可以忽略某些属性，也可以定义默认值

不能结构`null`和`undefined`

解构并不要求变量必须在解构表达式中声明。不过，如果是给事先声明的变量赋值，则赋值表达式必须包含在一对括号中。

可以嵌套解构

```js
et person = {
    name: 'Matt',
    age: 27,
    job: {
    title: 'Software engineer'
    }
};
// 声明 title 变量并将 person.job.title 的值赋给它
let { job: { title } } = person;
console.log(title); // Software engineer
```

涉及到多个属性的解构赋值如果抛出错误，那么前面的赋值成功，后面的失败

在函数参数列表中可以进行赋值解构，对参数的解构赋值不会影响 arguments 对象。

## 创建对象

### 工厂模式

代码

```js
function createPerson(name, age, job) {
    let o = new Object();
    o.name = name;
    o.age = age;
    o.job = job;
    o.sayName = function() {
    console.log(this.name);
    };
    return o;
}
let person1 = createPerson("Nicholas", 29, "Software Engineer");
let person2 = createPerson("Greg", 27, "Doctor");
```

### 构造函数模式

使用`new`操作符，可以直接从函数创建对象

代码

```js
function Person(name, age, job){
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayName = function() {
    console.log(this.name);
    };
}
let person1 = new Person("Nicholas", 29, "Software Engineer");
let person2 = new Person("Greg", 27, "Doctor");
person1.sayName(); // Nicholas
person2.sayName(); // Greg
```

使用`new Person()`时`Person`函数就是一个构造函数，这种方法调用构造函数会执行如下操作

(1) 在内存中创建一个新对象。
(2) 这个新对象内部的 [[Prototype]] 特性被赋值为构造函数的 prototype 属性(3) 构造函数内部的 this 被赋值为这个新对象（即 this 指向新对象）。
(4) 执行构造函数内部的代码（给新对象添加属性）。
(5) 如果构造函数返回非空对象，则返回该对象；否则，返回刚创建的新对象。

`person1`和`person2`都有一个`constructor`属性指向`Person`

```js
console.log(person1.constructor == Person); // true
console.log(person2.constructor == Person); // true
```

一般来说，用`instanceof`操作符来确定对象类型更可靠

```js
console.log(person1 instanceof Object); // true
console.log(person1 instanceof Person); // true
console.log(person2 instanceof Object); // true
console.log(person2 instanceof Person); // true
```

如果没有使用`new`操作符调用`Person()`，那么属性和方法会被添加到`window`对象。

使用`call()/apply()`方法和`new`效果一样

```js
// 作为构造函数
let person = new Person("Nicholas", 29, "Software Engineer");
person.sayName(); // "Nicholas"
// 作为函数调用
Person("Greg", 27, "Doctor"); // 添加到 window 对象
window.sayName(); // "Greg"
// 在另一个对象的作用域中调用
let o = new Object();
Person.call(o, "Kristen", 25, "Nurse");
o.sayName(); // "Kristen"
```

构造函数虽然有用，但也不是没有问题。构造函数的主要问题在于，其定义的方法会在每个实例上都创建一遍。

```js
function Person(name, age, job){
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayName = new Function("console.log(this.name)"); // 逻辑等价
}
```



因为都是做一样的事，所以没必要定义两个不同的 Function 实例。况且， this 对象可以把函数与对象的绑定推迟到运行时。
要解决这个问题，可以把函数定义转移到构造函数外部：

```js
function Person(name, age, job){
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayName = sayName;
}
function sayName() {
	console.log(this.name);
}
let person1 = new Person("Nicholas", 29, "Software Engineer");
let person2 = new Person("Greg", 27, "Doctor");
person1.sayName(); // Nicholas
person2.sayName(); // Greg
```



在这里， sayName() 被定义在了构造函数外部。在构造函数内部， sayName 属性等于全局 sayName()函数。因为这一次 sayName 属性中包含的只是一个指向外部函数的指针，所以 person1 和 person2共享了定义在全局作用域上的 sayName() 函数。这样虽然解决了相同逻辑的函数重复定义的问题，但全局作用域也因此被搞乱了，因为那个函数实际上只能在一个对象上调用。

### 原型模式

