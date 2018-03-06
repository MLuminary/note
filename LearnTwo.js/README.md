# Learn-two.js

突然发现了two.js这个工具，花了一两个小时学习了一下。引用 two.js 官网的一句话介绍 two.js

> is a two-dimensional drawing api geared towards modern web browsers. It is renderer agnostic enabling the same api to draw in multiple contexts: svg, canvas, and webgl.

它可以写一套代码实现 svg、canvas、webgl 的不同转换。

## 举个栗子

```html
<div id="box"></div>
```

```js
var elem = document.getElementById('box');
  //创建一个2d绘图对象
  var params = {
    width:600,
    height:600,
    type:Two.Types.svg
  }

var two = new Two(params).appendTo(elem);
two.update();
```

在页面上的结构为

![pic1](/images/pg1.png)

如果代码改为

```js
var elem = document.getElementById('box');
  //创建一个2d绘图对象
  var params = {
    width:600,
    height:600,
    type:Two.Types.canvas
  }

var two = new Two(params).appendTo(elem);
two.update();
```

在页面上的结构为

![pic2](/images/pg2.png)

但是个人感觉这个插件还是不怎么常用，因为它本身经过了转换，比纯写svg或者canvas的化速度要慢，只适用于特殊的需求，就是此项目有可能canvas和svg间不确定.....

## 小项目

然后我竟然花了挺长时间做了一个小小的项目.先看成果吧..

![gif](/images/gif2.gif)

这个小项目里面竟然还有很多坑的地方...

### 关于旋转

旋转问题，新建的图形对象，也就是图中的红圈和蓝圈，它们的旋转中心就是自己的圆心，也就是图形中心，但是当用``group``建组的时候，旋转中心就跑到了**画布**的**最左上角**.

此时你需要用``group.translation.set(x,y)``设置旋转中心点，但是设置完旋转中心点你发现图形的位置全都发生了变化，到后面才搞明白，原来这个**不止是旋转中心点**,还是**在组内图形的参照点**,也就是说在组内图形会以你刚设置的x,y为(0,0)点。重新绘制自己的位置。


