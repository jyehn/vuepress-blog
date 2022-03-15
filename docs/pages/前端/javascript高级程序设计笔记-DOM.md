

DOM

## 节点层级

DOM是XML或者HTML文档节点构成的一个层级的结构，节点有不同的类型，每个类型对应着文档中的不同信息和（或）标记，也都有不同的特性、数据和方法。这些结构构成了一个以特定节点为根的树形的结构。

#### Node类型

DOM level 1 中描述了名为Node的接口，这个结构是所有DOM节点类型都必须实现的，在javascript中被实现为Node类型，所有的节点类型都继承自Node类型。

每个节点的nodeType属性表示该节点的类型，nodeType有如下取值

```text
Node.ELEMENT_NODE （1）
Node.ATTRIBUTE_NODE （2）
Node.TEXT_NODE （3）
Node.CDATA_SECTION_NODE （4）
Node.ENTITY_REFERENCE_NODE （5）
Node.ENTITY_NODE （6）
Node.PROCESSING_INSTRUCTION_NODE （7）
Node.COMMENT_NODE （8）
Node.DOCUMENT_NODE （9）
Node.DOCUMENT_TYPE_NODE （10）
Node.DOCUMENT_FRAGMENT_NODE （11）
Node.NOTATION_NODE （12）
```

判断节点类型直接将节点的nodeType属性和这些常量比较

浏览器不支持所有节点类型，最常用到的是元素节点和文本节点。

1. 节点的nodeName与nodeValue保存着有关节点的信息

2. 每个节点有一个childNodes属性，其中包含一个NodeList的实例,nodeList是一个类数组对象，用于存储可以按位置存取的有序节点（NodeList不是Array的实例，只是可以用中括号访问值，也有length属性）。NodeList不是第一次访问时获得的内容的快照，而是一个实时的对象，对DOM的操作会自动的在NodeList中反映出来。NodeList也可以用item()访问值。使用Array.prototype.slice()可以把NodeList对象转换为数组

如

```js
let arrayOfNodes = Array.prototype.slice.call(someNode.childNodes,0)
let arrayOfNodes = Array. from (someNode.childNodes);//使用Array.from()
```

3. 每个节点有一个parentNode属性，指向DOM树中的父元素。