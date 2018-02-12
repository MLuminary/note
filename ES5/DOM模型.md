# DOM 模型

## DOM模型概述

文档对象模型(Document Object Model)

### 节点

DOM 的最小组成单位叫做节点，节点的类型有 7 种

- `Document` : 整个文档数的顶层节点
- `DocumentType` : `doctype`标签
- `Element` : 网页的各种HTML标签
- `Attribute` : 网页元素的属性
- `Text` : 标签之间或标签包含的文本
- `Comment` : 注释
- `DocumentFragment` : 文档的片段

这七种节点都属于浏览器原生提供的节点对象的派生对象，具有一些共同的属性和方法。

### 特征相关属性

所有节点对象都是浏览器内置 `Node` 对象的实例，继承了 `Node` 属性和方法。

可以用 `console.dir(Node)` 查看方法

#### Node.nodeName Node.nodeType

| 类型 | nodeName |	nodeType |
|----|------|------|
|ELEMENT_NODE|	大写的HTML元素名|	1|
|ATTRIBUTE_NODE| 等同于Attr.name|	2|
|TEXT_NODE	|#text	|3|
|COMMENT_NODE	|#comment|	8|
|DOCUMENT_NODE|	#document|	9|
|DOCUMENT_FRAGMENT_NODE|	#document-fragment|	11|
|DOCUMENT_TYPE_NODE	| 等同于DocumentType.name |10|

#### Node.nodeValue

返回一个字符串，表示当前节点本身的文本值，该属性可读写

因为只有Text节点、Comment节点，XML文档的CDATA节点有文本值，因此只有这三类节点的 `nodeValue` 可以返回结果，其它类型的节点一律返回 `null` ，也无法设置 `nodeValue` 属性

#### Node.textContent

`Node.textContent` 属性返回当前节点和他所有后代节点的文本内容

```html
<div id="test">this<span>is</span>some text</div>
```

```js
document.getElementById('test').textContent
//this is some text
```

该属性是可读写的，不过在这里要注意一点，他里面的内容会代替掉该元素其中的任何元素，而且是以文本的形式展示

```js
document.getElementById('test').textContent = '<p>just a test</p>'
```

这里的`<p></p>`并不会自动识别成 `p` 标签，而是以文本的形式展现在页面上

如果要读取整个文档的内容

```js
document.documentElement.textContent
```

#### Node.baseURI

返回一个字符串，表示当前网页的绝对路径，如果无法获取，则返回 `null`

不同节点都可以调用这个属性，一般返回的值是相同的

该属性的值一般由当前网址的URL决定，但是可以用HTML的 `<base>` 标签改变该属性的值

```js
<base href="http://www.example.com/page.html">
```

设置 `<base>` 以后，`baseURI` 属性就返回 `<base>` 标签设置的值


#### Node.firstChild Node.lastChild

`firstChild` 属性返回当前节点的第一个子节点，如果当前节点没有子节点，则返回 `null`

```html
<p id="para-01">
  <span>First span</span>
</p>

<script type="text/javascript">
  console.log(
    document.getElementById('para-01').firstChild.nodeName
  ) // "#text"
</script>
```

上面代码中，p元素与span元素之间有空白字符，这导致firstChild返回的是文本节点。

### 节点对象的方法

#### Node.appendChild()

`Node.appendChild` 方法接受一个节点对象作为参数，将其作为最后一个子节点，插入当前节点

#### Node.hasChildNodes()

`Node.hasChildNodes` 方法返回一个布尔值，表示当前节点是否有子节点。

#### Node.cloneNode()

`Node.cloneNode` 方法用于克隆一个节点。它接受一个布尔值作为参数，表示是否同时克隆子节点，默认是 `false` ，即不克隆子节点。

此克隆方法不会克隆绑定事件，并且如果被克隆的对象有 `id` 值的话，需要修改掉其中的一个

#### Node.insertBefore()

`insertBefore` 方法用于将某个节点插入当前节点内部的指定位置。它接受两个参数，第一个参数是所要插入的节点，第二个参数是当前节点内部的一个子节点，新的节点将插在这个子节点的前面。该方法返回被插入的新节点。

#### Node.removeChild()

`Node.removeChild` 方法接受一个子节点作为参数，用于从当前节点移除该子节点。它返回被移除的子节点。

#### Node.replaceChild()

`Node.replaceChild` 方法用于将一个新的节点，替换当前节点的某一个子节点。它接受两个参数，第一个参数是用来替换的新节点，第二个参数将要被替换走的子节点。它返回被替换走的那个节点。

#### Node.contains()

`Node.contains` 方法接受一个节点作为参数，返回一个布尔值，表示参数节点是否为当前节点的后代节点。

#### Node.compareDocumentPosition()

`compareDocumentPosition` 方法的用法，与 `contains` 方法完全一致，返回一个7个比特位的二进制值，表示参数节点与当前节点的关系。

#### Node.isEqualNode()

`isEqualNode` 方法返回一个布尔值，用于检查两个节点是否相等。所谓相等的节点，指的是两个节点的类型相同、属性相同、子节点相同。

#### Node.normalize()

`normailize` 方法用于清理当前节点内部的所有Text节点。它会去除空的文本节点，并且将毗邻的文本节点合并成一个。


### 节点的集合对象

#### NodeList 对象

`NodeList` 实例对象是一个类似数组的对象，它的成员是节点对象。节点数的变化会改变对应的 `NodeList` ，因为是类数组，它不能直接调用数组的一些方法。

#### HTMLCollection 对象

`HTMLCollection` 实例对象与 `NodeList` 实例对象类似，也是节点的集合，返回一个类似数组的对象。 `document.links` 、 `docuement.forms` 、 `document.images` 等属性，返回的都是 `HTMLCollection` 实例对象。

`HTMLCollection` 与 `NodeList` 的区别有以下几点。

1. HTMLCollection实例对象的成员只能是Element节点，NodeList实例对象的成员可以包含其他节点。

2. HTMLCollection实例对象都是动态集合，节点的变化会实时反映在集合中。NodeList实例对象可以是静态集合。

3. HTMLCollection实例对象可以用id属性或name属性引用节点元素，NodeList只能使用数字索引引用。

### ParentNode 接口，ChildNode 接口

不同的节点除了继承 `Node` 接口以外，还会继承其他接口。`ParentNode` 接口用于获取当前节点的 `Element` 子节点， `ChildNode` 接口用于处理当前节点的子节点（包含但不限于 `Element` 子节点）。

#### ParentNode接口

`ParentNode` 接口用于获取 `Element` 子节点。`Element` 节点、`Document` 节点和 `DocumentFragment` 节点，部署了 `ParentNode` 接口。凡是这三类节点，都具有以下四个属性，用于获取Element子节点。

children

`children` 属性返回一个动态的 `HTMLCollection` 集合，由当前节点的所有 `Element` 子节点组成。


firstElementChild

`firstElementChild` 属性返回当前节点的第一个 `Element` 子节点，如果不存在任何  `Element`子节点，则返回 `null` 。

lastElementChild

`lastElementChild` 属性返回当前节点的最后一个 `Element` 子节点，如果不存在任何 `Element` 子节点，则返回 `null`。

childElementCount

`childElementCount` 属性返回当前节点的所有 `Element` 子节点的数目。

#### ChildNode 接口

`ChildNode` 接口用于处理子节点（包含但不限于 `Element` 子节点）。`Element` 节点、`DocumentType` 节点和 `CharacterData` 接口，部署了 `ChildNode` 接口。凡是这三类节点（接口），都可以使用下面四个方法。

remove()

`remove` 方法用于移除当前节点。

```js
el.remove()
```

上面方法在DOM中移除了 `el` 节点。注意，调用这个方法的节点，是被移除的节点本身，而不是它的父节点。

before()

`before` 方法用于在当前节点的前面，插入一个同级节点。如果参数是节点对象，插入DOM的就是该节点对象；如果参数是文本，插入DOM的就是参数对应的文本节点。

after()

`after` 方法用于在当前节点的后面，插入一个同级节点。如果参数是节点对象，插入DOM的就是该节点对象；如果参数是文本，插入DOM的就是参数对应的文本节点。

replaceWith()

`replaceWith` 方法使用参数指定的节点，替换当前节点。如果参数是节点对象，替换当前节点的就是该节点对象；如果参数是文本，替换当前节点的就是参数对应的文本节点。



