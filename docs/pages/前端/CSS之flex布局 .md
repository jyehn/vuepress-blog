# 弹性盒子

没有`flex`之前，css布局依靠浮动和定位

以下的布局很难或者不能用浮动和定位实现

- 在父内容里面垂直居中一个块内容。
- 使容器的所有子项占用等量的可用宽度/高度，而不管有多少宽度/高度可用。
- 使多列布局中的所有列采用相同的高度，即使它们包含的内容量不同。

flex模型说明

示意图

![flex_terms.png](C:\Users\xiaojian\OneDrive\Notes\前端\assets\CSS之flex布局\p1.png)

主轴是沿着flex元素放置的方向延伸的轴

交叉轴是垂直于flex元素放置方向的轴

设置了`display:flex`的父元素被称为flex容器

在flex容器中表现为柔性的盒子的元素被称之为flex项

`flex-direction`：默认为`row`，设置为`column`时则从上下方向排列

`flex-wrap`： 设置为`wrap`时溢出的元素将会被移动到下一行

`flex-flow`：是`flex-direction`和`flex-wrap`的缩写

`flex`:指定flex项的大小和溢出量，最小值

```css
article {
  flex: 1 200px;
}

article:nth-of-type(3) {
  flex: 2 200px;
}
```

如何使用flex进行水平和垂直对齐

```css
div {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
```

调整`align-items`和`justify-content`两个属性

可以设置flex项的`order`，使得flex项的顺序改变，这个改变不会影响到DOM树

