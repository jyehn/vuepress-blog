# Vue官方文档阅读笔记-基础篇

以下内容来自cn.vuejs.org网站的vue2.x版本的教程

## Vue.js框架的特点

1. 声明式渲染：使用简洁的模板语法来声明式的将数据渲染进DOM的系统，使用`{{variable}}`渲染文本，使用`v-bind`指令绑定属性
2. 条件和循环：使用`v-if`将某个结点绑定到DOM，vue会在传入/更新/移除元素时自动地应用过渡效果，`v-for`指令可以使用一个数组数据来渲染一个项目列表
3. 处理用户输入: 使用`v-on`指令添加事件监听器
4. 组件化应用构建：组件是可以复用的一小段代码，完整的系统可以由大组件复用小组件组成，父组件可以使用`props`来将数据传递到子组件

## Vue实例

### 如何创建一个Vue实例

例：

```js
var vm = new Vue({
	//选项
})
```

- vue的设计受到了MVVM模型的启发

- 创建一个vue实例时，可以传入一个选项对象

- 一个vue应用由一个通过`new Vue`创建的根vue实例，以及可选的嵌套的、可复用的组件树组成

### 数据与方法

当一个vue实例被创建时，它将`data`对象中的所有property加入vue的响应式系统中，当这些property的值发生改变，视图将会产生相应，即匹配更新为新的值

注意，只有当实例被创建式就已经存在`data`中的property才是响应式的。使用Object.freeze()会阻止修改现有的property。

Vue实例暴露了一些有用的实例property与方法，前缀为`$`与用户定义的property区分开来。

例如`vm.$data, vm.$el, vm.$watch()`

### 实例生命周期钩子

钩子就是在Vue生命周期过程中的各个阶段运行的函数

比如`created`钩子可以用来在一个实例被创建之后执行代码。

注意，不要在选项property或回调上使用箭头函数，箭头函数没有`this`.

Vue实例的声明周期图示

![Vue 实例生命周期](C:\Users\xiaojian\OneDrive\Notes\前端\assets\Vue官方文档阅读笔记 基础篇\lifecycle-16448437382112.png)

## 模板语法

- vue使用了基于HTML的模板语法，所有vue.js的模板都是合法的HTML
- 在底层是线上，vue将模板编译成虚拟DOM渲染函数，能够智能计算需要重新渲染多少组件
- 可以直接写render函数

### 插值

#### 文本

使用双大括号的文本插值

```vue
<span>Message: {{ msg }}</span>
```

使用`v-once`指令，可以执行一次性的插值

```vue
<span v-once> 这个将不会改变：{{ msg }} </span>
```

#### 原始HTML

```vue
<p>Using mustaches: {{ rawHtml }} </p>
<p>Using v-html directive: <span v-html="rawHtml"></span></p>
```

注意，使用动态渲染的任意html非常危险，很容易导致xss攻击

#### Attribute

Mustache语法不能作用在HTML attribute上，需要使用v-bind指令

```vue
<div v-bind:id="dynamicId"></div>
```

对于布尔attribute，如果绑定的值为null, undefined或者false，那么该attribute不会被渲染出来

#### 使用javascript表达式

```vue
{{number + 1}}
{{ok ? 'YES' : 'NO'}}
{{ message.split('').reverse().join('')}}
<div v-bind:id="'list-'+id"></div>
```

每个绑定都只能包含单个表达式，不能是语句和控制流

### 指令

指令是带有`v-`前缀的特殊attribute

```vue
<p v-if="seen">现在你看到我了</p>
```

#### 参数

一些指令能够接收一个参数，在指令名称后面以冒号表示

```vue
<a v-bin:href="url"> ... </a>
```

在这里href是参数，告知`v-bind`指令将该元素的`href` attribute与表达式`url`的值绑定

```vue
<a v-on:click="doSomething">...</a>
```

#### 动态参数(2.6新增)

从2.6.0开始，可以用方括号括起来的javascript表达式作为一个指令的参数

```vue
<a v-bind:[attributeName]="url"> ... </a>
```

注意，在DOM中使用模板时（直接在一个HTML文件里撰写模板）还需要避免使用大写字符来命名键名，因为浏览器会把attribute全部强制转为小写

#### 修饰符

修饰符是以`.`指明的特俗后缀，用于指出一个指令应该以特殊方式绑定。例如`.prevent`修饰符告诉`v-on`指令对于触发的时间调用`event.preventDefault()`

```vue
<form v-on:submit.prevent="onSubmit">...</form>
```

### 缩写

`v-bind`缩写

```vue
<a v-bind:href="url">...</a>

<a :href="url">...</a>

<a :[key]="url">...</a>
```

`v-on`缩写

```vue
<a v-on:click="doSomething">...</a>

<a @click="doSomething">...</a>

<a @[event]="doSomething">...</a>

```

## 计算属性和侦听器

### 计算属性

模板内的表达式非常便利，但是放入太多的逻辑会让模板过重难以维护，所以对于任何复杂逻辑，应当使用计算属性。

- 基础例子

```vue
<div id="example">
	<p>Original message: "{{ message}}"</p>
	<p>Computed reversed message: "{{ reversedMessage }}"</p>
</div>
```

```vue
var vm = new Vue({
	el: '#example',
	data: {
		message: 'Hello'
	},
	computed: {
		revesredMessage: function() {
				return this.message.split('').reverse().join('');
		}
	}
})
```

- 计算属性缓存vs方法

方法每次都会计算，计算方法在没有改变的情况下不会调用

- 计算属性vs侦听属性

例子

```vue
<div id="demo">{{ fullName }}</div>
// 命令式的代码
var vm = new Vue({
  el: '#demo',
  data: {
    firstName: 'Foo',
    lastName: 'Bar',
    fullName: 'Foo Bar'
  },
  watch: {
    firstName: function (val) {
      this.fullName = val + ' ' + this.lastName
    },
    lastName: function (val) {
      this.fullName = this.firstName + ' ' + val
    }
  }
})

// 计算属性的版本
var vm = new Vue({
  el: '#demo',
  data: {
    firstName: 'Foo',
    lastName: 'Bar'
  },
  computed: {
    fullName: function () {
      return this.firstName + ' ' + this.lastName
    }
  }
})
```



- 计算属性也有一个setter

```vue
var vm = new Vue({
  el: '#demo',
  data: {
    firstName: 'Foo',
    lastName: 'Bar'
  },
  computed: {
    fullName: function () {
      return this.firstName + ' ' + this.lastName
    }
  }
})
```

### 侦听器

有时也需要一个自定义的侦听器，在数据变化执行异步或开销比较大的操作式，这个方式是最有用的

```vue
<div id="watch-example">
  <p>
    Ask a yes/no question:
    <input v-model="question">
  </p>
  <p>{{ answer }}</p>
</div>
<!-- 因为 AJAX 库和通用工具的生态已经相当丰富，Vue 核心代码没有重复 -->
<!-- 提供这些功能以保持精简。这也可以让你自由选择自己更熟悉的工具。 -->
<script src="https://cdn.jsdelivr.net/npm/axios@0.12.0/dist/axios.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/lodash@4.13.1/lodash.min.js"></script>
<script>
var watchExampleVM = new Vue({
  el: '#watch-example',
  data: {
    question: '',
    answer: 'I cannot give you an answer until you ask a question!'
  },
  watch: {
    // 如果 `question` 发生改变，这个函数就会运行
    question: function (newQuestion, oldQuestion) {
      this.answer = 'Waiting for you to stop typing...'
      this.debouncedGetAnswer()
    }
  },
  created: function () {
    // `_.debounce` 是一个通过 Lodash 限制操作频率的函数。
    // 在这个例子中，我们希望限制访问 yesno.wtf/api 的频率
    // AJAX 请求直到用户输入完毕才会发出。想要了解更多关于
    // `_.debounce` 函数 (及其近亲 `_.throttle`) 的知识，
    // 请参考：https://lodash.com/docs#debounce
    this.debouncedGetAnswer = _.debounce(this.getAnswer, 500)
  },
  methods: {
    getAnswer: function () {
      if (this.question.indexOf('?') === -1) {
        this.answer = 'Questions usually contain a question mark. ;-)'
        return
      }
      this.answer = 'Thinking...'
      var vm = this
      axios.get('https://yesno.wtf/api')
        .then(function (response) {
          vm.answer = _.capitalize(response.data.answer)
        })
        .catch(function (error) {
          vm.answer = 'Error! Could not reach the API. ' + error
        })
    }
  }
})
</script>
```

## class与style绑定

在`v-bind`用于处理`class`和`style`时，vue.js做了专门的增强，表达式结果的类型除了字符串还可以是对象或数组

### 绑定HTML class

- 对象语法

```vue
<div v-bind:class="{ active: isActive }"></div>
```

上面的语法表示`active`这个class存在与否将取决于数据property`isActive`的truthiness

可以在对象中传入更多字段来动态切换多个class，此外`v-bind:class`指令也可以与普通的class attribute共存，如下

```vue
<div
	class="static"
	v-bind:class="{ active: isActive, 'text-danged': hasError}"
></div>
```

和如下data

```json
data: {
	isActive: true,
	hasError: false
}
```

结果渲染为`<div class="static active"></div>`

当`isActive`或者`hasError`变化时,class列表将相应的更新，例如如果`hasError`的值为`true`，class列表变为`static active text-danger`。

绑定的数据对象不必内联定义在模板里

```vue
<div v-bin:class="classObject"></div>
```

```js
data: {
	classObjet: {
		active: true,
		'text-danger': fasle
	}
}
```

渲染的结果和上面一样。

这里也可以绑定一个返回对象的计算属性

```vue
<div v-bind:class="classObject"></div>
```

```js
data: {
	isActivate: true,
	error: null
},
computed: {
	classObject: function() {
		return {
			active: this.isActivate && !this.error,
			'text-danger': this.error && this.error.type === 'fatal'
		}
	}
}
```

- 数组语法

我们可以把一个数组传给`v-bin:class`，以应用一个class列表

```vue
<div v-bind:class="[activateClass, errorClass]"></div>
```

```js
data: {
	activeClass: 'active',
	errorClass: 'text-danger'
}
```

渲染为

```vue
<div class="active text-danger"></div>
```

可以使用三元表达式

```vue
<div v-bind:class="[isActive ? activeClass : '', errorClass]"></div>
```

在数组中也可以是用对象语法

```vue
<div v-bin:class="[{ active: isActive }, errorClass]"
```

- 用在组件上

当在一个自定义组件上使用`class` property时，这些class将会被添加到该组件的根元素上面。这个元素上已经存在的class不会被覆盖

例,如果声明了一个组件

```vue
Vue.component('my-component', {
	template: '<p class="foo bar">Hi</p>'
})
```

在使用这个组件的时候添加了一些class

```vue
<my-component class="baz boo"></my-component>
```

结果为

```html
<p class="foo bar baz boo">Hi</p>
```

对于带数据绑定的class也同样适用

```html
<my-compoent v-bind:class="{ active: isActive }"></my-component>
```

当`isActive`为truthy时，html将被渲染为

```html
<p class="foo bar active">Hi</p>
```

### 绑定内联样式

- 对象语法

`v-bind:style`和`v-bind:class`的用法相似，需要注意的这里是赋值一个javascript对象，不是css形式的，这个对象里面的css property可以用驼峰式或者短横线分隔

```vue
<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px'}"></div>
```

```js
data: {
	activeColor: 'red',
	fontSize: 30
}
```

直接绑定到一个样式对象通常更好， 这会让模板更清晰

```vue
<div v-bind:style="styleObject"></div>
```

```js
data: {
	styleObject: {
		color: 'red',
		fontSize: '13px'
	}
}
```

对象语法也可以结合对象的计算属性使用

- 数组语法

`v-bind:style`的数组语法可以将多个样式对象应用到同一个元素上面

```vue
<div v-bind:style=“[baseStyles, overridingStyles]”></div>
```

- 自动添加前缀

当`v-bind:style`使用需要添加浏览器引擎前缀的CSS property时，如`transfrom`，vue.js会自动侦测并添加相应的前缀

- 多重值

从2.3.0开始可以为`style`绑定的property提供一个包含多个值的数组，常用于提供多个带前缀的值，例如

```vue
<div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
```

这样写只会渲染数组中最后一个被浏览器支持的值

## 条件渲染

### `v-if` `v-else`和`v-if-else`指令

`v-if`指令用于条件地渲染一块内容，这块内容只会在指令的表达式返回truthy值的时候被渲染

```vue
<h1 v-if="awesome">Vue is awesome!</h1>
```

也可以用`v-else`添加一个else块

```vue
<h1 v-if="awesome">Vue is awesome!</h1>
<h1 v-else>Oh no </h1>
```

如果想让多个元素按条件渲染，可以将`v-if`使用在`template`上，最终的渲染结果将不会包含`template`

```vue
<template v-if="ok">
<h1> Title</h1>
<p>Paragraph 1</p>
<p>Paragraph 2</p>
</template>
```

- 2.1.0版本后新增了`v-else-if`指令

使用方法

```vue
<div v-if="type === 'A'">
A
</div>
<div v-else-if="type=== 'B'">
B
</div>
<div v-else-if="type=== 'C'">
C
</div>
<div v-else>
Not A/B/C
</div>
```

- 使用`key`管理可复用的元素

Vue会尽可能高效地渲染元素，通常会复用已经有的元素，而不是重新渲染，如下面的例子

```vue
<template v-if="loginType === 'username'">
  <label>Username</label>
  <input placeholder="Enter your username">
</template>
<template v-else>
  <label>Email</label>
  <input placeholder="Enter your email address">
</template>
```

在上面的代码中，如果`loginType`变化了，用户输入的内容将不会被清除，因为两个模板使用了相同的元素，`input`不会被替换掉，仅仅是`placeHolder`被替换了而已

但是有些时候，我们需要将该元素完整的替换掉，在这种情况下，就需要为该元素提供一个`key`属性，如下

```vue
<template v-if="loginType === 'username'">
  <label>Username</label>
  <input placeholder="Enter your username" key="username-input">
</template>
<template v-else>
  <label>Email</label>
  <input placeholder="Enter your email address" key="email-input">
</template>
```

这样，每次切换`loginType`的时候，输入框都将被重新渲染

### `v-show` 指令

`v-show`指令也是根据条件展示元素，和`v-if`不同的时，带有`v-show`的元素将会始终被渲染被保留在DOM中，原理是切换了CSS de `display`，用法如下

```vue
<h1 v-show="ok">
    Hello!
</h1>
```

- 如何选择`v-if`和`v-show`：

一般来说，`v-if`的切换开销高，`v-show`的渲染开销高，因此，如果需要非常频繁地切换，使用`v-show`更好，如果在运行时条件很少改变，则使用`v-if`更好

vue教程指出，`v-if`和`v-for`一起使用时，`v-for`具有更高的优先级，不推荐一起使用

## 列表渲染

可以用`v-for`指令基于一个数组来渲染一个列表，`v-for`指令需要使用`item in items`形式的特殊语法（也可以用`item of items`），其中`items`是源数据数组，而`item`则是被迭代的数组元素的别名

```vue
<ul id="example-1">
<li v-for="item in items" :key="item.message">
	{{ item.message }}
</li>
</ul>
```

```js
var example1 = new Vue({
	el: '#example-1',
	data: {
		items: [
			{ message: 'Foo'},
			{ message: 'Bar'}
		]
	}
})
```

在使用`v-for`语句的块中，可以访问到所有父作用域的property，当需要使用到当前for遍历项的索引时，可以按照下面的写法

```vue
<ul id="example-2">
  <li v-for="(item, index) in items">
    {{ parentMessage }} - {{ index }} - {{ item.message }}
  </li>
</ul>
```

```js
var example2 = new Vue({
  el: '#example-2',
  data: {
    parentMessage: 'Parent',
    items: [
      { message: 'Foo' },
      { message: 'Bar' }
    ]
  }
})
```

可以使用`v-for`来遍历一个对象的property(按照`object.key()`的结果来遍历，在不同的js引擎下可能顺序会不一样)，如下

```vue
<ul id="v-for-object" class="demo">
  <li v-for="value in object">
    {{ value }}
  </li>
</ul>
```

```js
new Vue({
  el: '#v-for-object',
  data: {
    object: {
      title: 'How to do lists in Vue',
      author: 'Jane Doe',
      publishedAt: '2016-04-10'
    }
  }
})
```

当需要使用property的名称，或者需要property的索引的时候，可以按照如下方式写

```vue
<div v-for="(value, name, index) in object">
  {{ index }}. {{ name }}: {{ value }}
</div>
```

### 维护状态

当vue正在更新使用`v-for`渲染的元素列表时，它默认使用就地更新的策略，如果数据项的顺序被改变，vue不会移动DOM元素来匹配数据项的顺序，而是就地更新每个元素。

这个默认的模式时高效的，但是只适用于不依赖子组件状态或临时DOM状态（例如表单输入值）的的列表渲染输出。

为了给vue一个提示，以便它能跟踪每个结点的身份，从而重用和偏序现有元素，需要给每一项提供一个唯一`key` attribute，如下代码

```
<div v-for="item in items" v-bind:key="item.id">
  <!-- 内容 -->
</div>
```

`key`值最好使用字符串或者数值类型的值

### 数组更新检测

- 变更方法

vue将被侦听的数组的变更方法进行了包裹，因此调用这些方法也会触发视图更新，这些方法包括

```js
push()
pop()
shift()
unshift()
splice()
sort()
reverse()
```

- 替换数组

`filter(), concat(), slice()`等方法，不会变更数组，而是返回一个新数组，如以下代码

```js
example1.items = example1.items.filter(function (item) {
  return item.message.match(/Foo/)
})
```

这些方法也不会使得vue丢弃现有的DOM然后重新渲染，vue使用了一些智能的启发式方法来重用现有的DOM元素

- 由于javascript的限制，vue不能检测数组和对象的变化。

### 显示过滤/排序后的结果

如果想要显示一个数组经过过滤或者排序之后的版本，而不修改原始的数据，可以使用计算属性

```vue
<li v-for="n in evenNumbers">{{ n }}</li>
```

```js
data: {
  numbers: [ 1, 2, 3, 4, 5 ]
},
computed: {
  evenNumbers: function () {
    return this.numbers.filter(function (number) {
      return number % 2 === 0
    })
  }
}
```

在不能用计算属性的情况下（如两层嵌套的`v-for`循环），可以使用一个方法

```vue
<ul v-for="set in sets">
	<li v-for="n in even(set)"> {{ n }}</li>
</ul>
```

```js
data: {
  sets: [[ 1, 2, 3, 4, 5 ], [6, 7, 8, 9, 10]]
},
methods: {
  even: function (numbers) {
    return numbers.filter(function (number) {
      return number % 2 === 0
    })
  }
}
```

### `v-for`语句里也可以接收整数

```js
data: {
  sets: [[ 1, 2, 3, 4, 5 ], [6, 7, 8, 9, 10]]
},
methods: {
  even: function (numbers) {
    return numbers.filter(function (number) {
      return number % 2 === 0
    })
  }
}
```

### 在`<template>`上使用`v-for`

和`v-if`一样，也可以使用带有`v-for`的`<template>`来循环渲染一个包含多个元素的内容

```vue
<ul>
  <template v-for="item in items">
    <li>{{ item.msg }}</li>
    <li class="divider" role="presentation"></li>
  </template>
</ul>
```

### `v-for`和`v-if`一起使用

1. 当两个指令处于同一个节点时，`v-if`将会分别重复使用在每一个`v-for`循环中，如

```vue
<li v-for="todo in todos" v-if="!todo.isComplete">
  {{ todo }}
</li>
```

2. 如果想用`v-if`按照条件选择是否执行循环，那么可以将`v-if`置于外层元素（或者`<template`）上，如

```vue
<ul v-if="todos.length">
  <li v-for="todo in todos">
    {{ todo }}
  </li>
</ul>
<p v-else>No todos left!</p>
```

### 在组件上使用`v-for`

在自定义组件上使用`v-for`和普通元素的用法一样

```vue
<my-component v-for="item in items" :key="item.id"></my-component>
```

要将数据传递到组件里，需要使用`props`（见其他章节的详解），代码如下

```vue
<my-component
  v-for="(item, index) in items"
  v-bind:item="item"
  v-bind:index="index"
  v-bind:key="item.id"
></my-component>
```

这里的`items`在使用的时候，需要通过`props`传值

不自动将`item`注入到组件的原因是，这会使得组件与`v-for`的运行紧密耦合

以下是一个简单的todo列表的完整例子

```vue
<div id="todo-list-example">
  <form v-on:submit.prevent="addNewTodo">
    <label for="new-todo">Add a todo</label>
    <input
      v-model="newTodoText"
      id="new-todo"
      placeholder="E.g. Feed the cat"
    >
    <button>Add</button>
  </form>
  <ul>
    <li
      is="todo-item"
      v-for="(todo, index) in todos"
      v-bind:key="todo.id"
      v-bind:title="todo.title"
      v-on:remove="todos.splice(index, 1)"
    ></li>
  </ul>
</div>
```

这里的`is=todo-item` attribute和`<todo-item>`效果相同，因为`<ul>`元素里面只有`<li>`元素才会被看作有效内容，因此直接用`<todo-item>`可能会有潜在的浏览器解析错误。

```js
Vue.component('todo-item', {
  template: '\
    <li>\
      {{ title }}\
      <button v-on:click="$emit(\'remove\')">Remove</button>\
    </li>\
  ',
  props: ['title']
})

new Vue({
  el: '#todo-list-example',
  data: {
    newTodoText: '',
    todos: [
      {
        id: 1,
        title: 'Do the dishes',
      },
      {
        id: 2,
        title: 'Take out the trash',
      },
      {
        id: 3,
        title: 'Mow the lawn'
      }
    ],
    nextTodoId: 4
  },
  methods: {
    addNewTodo: function () {
      this.todos.push({
        id: this.nextTodoId++,
        title: this.newTodoText
      })
      this.newTodoText = ''
    }
  }
})
```

## 事件处理

### 如何监听事件

使用`v-on`指令监听DOM事件，并且可以指定监听事件运行的javascript代码

例

```vue
<div id="example-1">
  <button v-on:click="counter += 1">Add 1</button>
  <p>The button above has been clicked {{ counter }} times.</p>
</div>
```

```js
var example1 = new Vue({
  el: '#example-1',
  data: {
    counter: 0
  }
})
```

这个例子中，将`button`的`click`事件绑定为执行代码`couter += 1`

也可以在内联的语句中调用方法，例如

```vue
<div id="example-3">
  <button v-on:click="say('hi')">Say hi</button>
  <button v-on:click="say('what')">Say what</button>
</div>
```

```js
new Vue({
  el: '#example-3',
  methods: {
    say: function (message) {
      alert(message)
    }
  }
})
```

如果需要在内联的语句中访问原始的DOM事件，可以用`$event`将它传入方法中，例

```vue
<button v-on:click="warn('Form cannot be submitted yet.', $event)">
  Submit
</button>
```

```js
// ...
methods: {
  warn: function (message, event) {
    // 现在我们可以访问原生事件对象
    if (event) {
      event.preventDefault()
    }
    alert(message)
  }
}
```



### 事件处理方法

除了直接将代码写在`v-on`指令中，更多的是将绑定一个可调用的方法，例

```vue
<div id="example-2">
  <!-- `greet` 是在下面定义的方法名 -->
  <button v-on:click="greet">Greet</button>
</div>
```

```js
var example2 = new Vue({
  el: '#example-2',
  data: {
    name: 'Vue.js'
  },
  // 在 `methods` 对象中定义方法
  methods: {
    greet: function (event) {
      // `this` 在方法里指向当前 Vue 实例
      alert('Hello ' + this.name + '!')
      // `event` 是原生 DOM 事件
      if (event) {
        alert(event.target.tagName)
      }
    }
  }
})

// 也可以用 JavaScript 直接调用方法
example2.greet() // => 'Hello Vue.js!'
```

这里，绑定的方法可以接收一个事件对象

### 事件修饰符

`v-on`指令的事件修饰符可以完成`event.preventDefault()`或者`event.stopPropagation()`

事件修饰符有如下

- `.stop`
- `.prevent`
- `.capture`
- `.self`
- `.once`(可以用于自定义的组件事件上)
- `.passive`

用法及含义如下

```vue
<!-- 阻止单击事件继续传播 -->
<a v-on:click.stop="doThis"></a>

<!-- 提交事件不再重载页面 -->
<form v-on:submit.prevent="onSubmit"></form>

<!-- 修饰符可以串联 -->
<a v-on:click.stop.prevent="doThat"></a>

<!-- 只有修饰符 -->
<form v-on:submit.prevent></form>

<!-- 添加事件监听器时使用事件捕获模式 -->
<!-- 即内部元素触发的事件先在此处理，然后才交由内部元素进行处理 -->
<div v-on:click.capture="doThis">...</div>

<!-- 只当在 event.target 是当前元素自身时触发处理函数 -->
<!-- 即事件不是从内部元素触发的 -->
<div v-on:click.self="doThat">...</div>
```

### 按键修饰符

对于监听键盘事件，vue有键盘修饰符

如以下例子

```vue
<!-- 只有在 `key` 是 `Enter` 时调用 `vm.submit()` -->
<input v-on:keyup.enter="submit">
```

可以直接将`KeyboardEvent.key`暴露的任意有效按键名转换为kebad-case来作为修饰符

```vue
<input v-on:keyup.page-down="onPageDown">
```

然后，直接使用按键码也是可以的

```vue
<input v-on:keyup.13="submit">
```

以下是常用按键码的别名

- `.enter`
- `.tab`
- `.delete` (捕获“删除”和“退格”键)
- `.esc`
- `.space`
- `.up`
- `.down`
- `.left`
- `.right`

可以通过全局`config.keyCodes`对象自定义按键修饰符别名

```js
// 可以使用 `v-on:keyup.f1`
Vue.config.keyCodes.f1 = 112
```

### 系统修饰键

可以用如下修饰符来事件仅在按下相应的按键时才触发鼠标或键盘事件的监听器

- `.ctrl`
- `.alt`
- `.shift`
- `.meta`

例子

```vue
<!-- Alt + C -->
<input v-on:keyup.alt.67="clear">

<!-- Ctrl + Click -->
<div v-on:click.ctrl="doSomething">Do something</div>
```

`.exact`修饰符支持更加精确的由系统修饰符组合触发的事件

```vue
<!-- 即使 Alt 或 Shift 被一同按下时也会触发 -->
<button v-on:click.ctrl="onClick">A</button>

<!-- 有且只有 Ctrl 被按下的时候才触发 -->
<button v-on:click.ctrl.exact="onCtrlClick">A</button>

<!-- 没有任何系统修饰符被按下的时候才触发 -->
<button v-on:click.exact="onClick">A</button>
```

鼠标按钮修饰符

如下

- `.left`
- `.right`
- `.middle`



## 表单输入绑定

### 基础用法

使用`v-model`指令在表单`<input>,<textarea>,<select>`元素上创建双向数据绑定。

`v-model`对于不同的元素，使用不同的property并且抛出不同的事件

- text 和 textarea 元素使用 `value` property 和 `input` 事件；
- checkbox 和 radio 使用 `checked` property 和 `change` 事件；
- select 字段将 `value` 作为 prop 并将 `change` 作为事件。

注：`v-model`不会在输入法组合文字过程中更新

示例

1. 文本

```vue
<input v-model="message" placeholder="edit me">
<p>Message is: {{ message }}</p>
```

2. 多行文本

```vue
<span>Multiline message is:</span>
<p style="white-space: pre-line;">{{ message }}</p>
<br>
<textarea v-model="message" placeholder="add multiple lines"></textarea>
```

3. 复选框

单个复选框绑定到布尔值

```vue
<input type="checkbox" id="checkbox" v-model="checked">
<label for="checkbox">{{ checked }}</label>
```

多个复选框绑定到一个数组

```vue
<input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
<label for="jack">Jack</label>
<input type="checkbox" id="john" value="John" v-model="checkedNames">
<label for="john">John</label>
<input type="checkbox" id="mike" value="Mike" v-model="checkedNames">
<label for="mike">Mike</label>
<br>
<span>Checked names: {{ checkedNames }}</span>
```

```js
new Vue({
  el: '...',
  data: {
    checkedNames: []
  }
})
```

4. 单选按钮

```vue
<div id="example-4">
  <input type="radio" id="one" value="One" v-model="picked">
  <label for="one">One</label>
  <br>
  <input type="radio" id="two" value="Two" v-model="picked">
  <label for="two">Two</label>
  <br>
  <span>Picked: {{ picked }}</span>
</div>
```

```js
new Vue({
  el: '#example-4',
  data: {
    picked: ''
  }
})
```

5. 选择框

单选

```vue
<div id="example-5">
  <select v-model="selected">
    <option disabled value="">请选择</option>
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select>
  <span>Selected: {{ selected }}</span>
</div>
```

```js
new Vue({
  el: '...',
  data: {
    selected: ''
  }
})
```

多选(绑定到一个数组)

```vue
<div id="example-6">
  <select v-model="selected" multiple style="width: 50px;">
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select>
  <br>
  <span>Selected: {{ selected }}</span>
</div>
```

```js
new Vue({
  el: '#example-6',
  data: {
    selected: []
  }
})
```

这里可以使用`v-for`来渲染多个option

```vue
<select v-model="selected">
  <option v-for="option in options" v-bind:value="option.value">
    {{ option.text }}
  </option>
</select>
<span>Selected: {{ selected }}</span>
```

```js
new Vue({
  el: '...',
  data: {
    selected: 'A',
    options: [
      { text: 'One', value: 'A' },
      { text: 'Two', value: 'B' },
      { text: 'Three', value: 'C' }
    ]
  }
})
```

### 值绑定

对于单选按钮，复选框以及选择框，`v-model`绑定的值通常是静态字符串，如果想要把值绑定到vue实例的一个property上，可以使用`v-bind`

1. 复选框

```vue
<input
  type="checkbox"
  v-model="toggle"
  true-value="yes"
  false-value="no"
>
// 当选中时
vm.toggle === 'yes'
// 当没有选中时
vm.toggle === 'no'
```

2. 单选按钮

```vue
<input type="radio" v-model="pick" v-bind:value="a">
// 当选中时
vm.pick === vm.a
```

3. 选择框的选项

```vue
<select v-model="selected">
    <!-- 内联对象字面量 -->
  <option v-bind:value="{ number: 123 }">123</option>
</select>
// 当选中时
typeof vm.selected // => 'object'
vm.selected.number // => 123
```

### 修饰符

`.lazy`：默认情况下`v-model`在每次`input`事件触发后将输入框的值与数据进行同步，添加了`lazy`修饰符之后，则变为在`change`事件之后进行同步，例子如下

```vue
<!-- 在“change”时而非“input”时更新 -->
<input v-model.lazy="msg">
```

`.number`：自动将用户输入的数值转换为数值类型，例子如下

```vue
<input v-model.number="age" type="number">
```

`.trim`：自动过滤用户输入的首位空白字符，例子如下

```vue
<input v-model.trim="msg">
```

### 如何在组件上使用`v-model`

创建自定义的输入组件，然后在该组件上使用`v-models`

## 组件基础

### 基本示例

一个vue组件的例子如下



```js
// 定义一个名为 button-counter 的新组件
Vue.component('button-counter', {
  data: function () {
    return {
      count: 0
    }
  },
  template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
})
```

然后，可以把这个组件作为自定义元素来使用

```vue
<div id="components-demo">
  <button-counter></button-counter>
</div>
```

```js
new Vue({ el: '#components-demo' })
```

### 组件的复用

组件可以复用任意次数

```vue
<div id="components-demo">
  <button-counter></button-counter>
  <button-counter></button-counter>
  <button-counter></button-counter>
</div>
```

每个组件都会独立维护它的`count`

`data`必须是一个函数，如下

```js
data: function () {
  return {
    count: 0
  }
}
```

如果提供的是

```js
data: {
  count: 0
}
```

那么，这个`count`的变化就会影响到所有组件示例

组件的组织形式

通常一个应用会以一颗嵌套的组件树的形式来组织

![Component Tree](C:\Users\xiaojian\OneDrive\Notes\字节青训营笔记.assets\components.png)

组件由两种注册类型，全局注册和局部注册

通过`Vue.component`方式创建的都是全局注册的

```js
Vue.component('my-component-name', {
  // ... options ...
})
```

全局注册的组件可以用在其被注册之后的任何 (通过 `new Vue`) 新创建的 Vue 根实例，也包括其组件树中的所有子组件的模板中。

### 通过`props`向子组件传递数据

prop是可以在组件上注册的一些自定义attribute，当一个值传递给一个prop attribute的时候，它就变成了那个组件实例的一个property。如下代码

```js
Vue.component('blog-post', {
  props: ['title'],
  template: '<h3>{{ title }}</h3>'
})
```

传递进来的prop使用起来就像访问`data`中的值一样，下面代码给`blog-post`传入了不同的`title`

```vue
<blog-post title="My journey with Vue"></blog-post>
<blog-post title="Blogging with Vue"></blog-post>
<blog-post title="Why Vue is so fun"></blog-post>
```

以下是使用`v-for`来动态渲染的例子

```vue
<blog-post
  v-for="post in posts"
  v-bind:key="post.id"
  v-bind:title="post.title"
></blog-post>
```

```js
new Vue({
  el: '#blog-post-demo',
  data: {
    posts: [
      { id: 1, title: 'My journey with Vue' },
      { id: 2, title: 'Blogging with Vue' },
      { id: 3, title: 'Why Vue is so fun' }
    ]
  }
})
```

可以使用传入单个prop对象的方法，重构上面的代码

```vue
<blog-post
  v-for="post in posts"
  v-bind:key="post.id"
  v-bind:post="post"
></blog-post>
```

```js
Vue.component('blog-post', {
  props: ['post'],
  template: `
    <div class="blog-post">
      <h3>{{ post.title }}</h3>
      <div v-html="post.content"></div>
    </div>
  `
})
```

### 监听子组件事件

一个例子，点击页面按钮增加字号

```js
new Vue({
  el: '#blog-posts-events-demo',
  data: {
    posts: [/* ... */],
    postFontSize: 1
  }
})
```

```vue
<div id="blog-posts-events-demo">
  <div :style="{ fontSize: postFontSize + 'em' }">
    <blog-post
      v-for="post in posts"
      v-bind:key="post.id"
      v-bind:post="post"
      v-on:enlarge-text="postFontSize += 0.1"  
    ></blog-post>
  </div>
</div>
```

这里的` v-on:enlarge-text="postFontSize += 0.1"`监听了子组件的`enlarge-text`事件

然后在每篇博文正文前添加一个按钮放大字号

```js
Vue.component('blog-post', {
  props: ['post'],
  template: `
    <div class="blog-post">
      <h3>{{ post.title }}</h3>
      <button v-on:click="$emit('enlarge-text')">
        Enlarge text
      </button>
      <div v-html="post.content"></div>
    </div>
  `
})
```

### 使用事件抛出一个值

这里我们想让自定义的`enlarge-text`事件抛出一个值，可以按照如下来

```
<button v-on:click="$emit('enlarge-text', 0.1)">
  Enlarge text
</button>
```

然后再父级组件监听这个事件时，通过`$event`访问到这个被抛出的值

```vue
<blog-post
  ...
  v-on:enlarge-text="postFontSize += $event"
></blog-post>
```

在事件处理函数不是内联的javascript代码，而是一个方法时，这个值会作为第一个参数传入这个方法

```js
methods: {
  onEnlargeText: function (enlargeAmount) {
    this.postFontSize += enlargeAmount
  }
}
```

在组件上使用`v-model`

```vue
<input v-model="searchText">
```

等价于

```vue
<input
  v-bind:value="searchText"
  v-on:input="searchText = $event.target.value"
>
```

当用在组件上时，`v-model`则会这样

```vue
<custom-input
  v-bind:value="searchText"
  v-on:input="searchText = $event"
></custom-input>
```

为了让它正常工作，这个组件的`<input>`必须

- 将其 `value` attribute 绑定到一个名叫 `value` 的 prop 上
- 在其 `input` 事件被触发时，将新的值通过自定义的 `input` 事件抛出

写成代码是这样的

```js
Vue.component('custom-input', {
  props: ['value'],
  template: `
    <input
      v-bind:value="value"
      v-on:input="$emit('input', $event.target.value)"
    >
  `
})
```

然后`v-model`就可以在这个组件上完美工作了

```vue
<custom-input v-model="searchText"></custom-input>
```

### 通过插槽分发内容

```vue
Vue.component('alert-box', {
  template: `
    <div class="demo-alert-box">
      <strong>Error!</strong>
      <slot></slot>
    </div>
  `
})
```

使用以下代码会将内容传递到组件中

```
<alert-box>
  Something bad happened.
</alert-box>
```

### 动态组件

多标签的界面，需要在不同的组件之间进行切换，这个需求可以通过vue的`<component>`元素加一个特殊的`is` attribute来事件

```vue
<!-- 组件会在 `currentTabComponent` 改变时改变 -->
<component v-bind:is="currentTabComponent"></component>
```

在上述示例中，`currentTabComponent` 可以包括

- 已注册组件的名字，或
- 一个组件的选项对象