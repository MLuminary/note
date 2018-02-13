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

1. `HTMLCollection` 实例对象的成员只能是 `Element` 节点，`NodeList` 实例对象的成员可以包含其他节点。

2.` HTMLCollection` 实例对象都是动态集合，节点的变化会实时反映在集合中。`NodeList` 实例对象可以是静态集合。

3. `HTMLCollection` 实例对象可以用 `id` 属性或 `name` 属性引用节点元素， `NodeList` 只能使用数字索引引用。

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

## Document 节点

### 内部属性节点

#### document.doctype

`document` 对象的第一个子节点，包含了文档类型，通常 `document.firstChild` 返回这个节点

#### document.documentElement

`document` 对象的第二个子节点，对于HTML网页，返回 `<html>` 节点 

#### document.defaultView 

在浏览器中返回 `document` 对象所在的 `window` 对象，否则返回 `null`

#### document.body,document.head

document.head属性返回当前文档的 `<head>` 节点，`document.body` 属性返回当前文档的 `<body>`。

#### document.activeElement

`document.activeElement` 属性返回当前文档中获得焦点的那个元素。用户通常可以使用Tab键移动焦点，使用空格键激活焦点。比如，如果焦点在一个链接上，此时按一下空格键，就会跳转到该链接。

### 节点集合属性

#### document.links，document.forms，document.images，document.embeds

`document.links` 属性返回当前文档所有设定了 `href` 属性的 `a` 及 `area` 元素。

`document.forms` 属性返回页面中所有表单元素 `form`。

`document.images` 属性返回页面所有图片元素（即 `img` 标签）。

`document.embeds` 属性返回网页中所有嵌入对象，即 `embed` 标签。

以上四个属性返回的都是 `HTMLCollection` 对象实例

#### document.scripts，document.styleSheets

`document.scripts` 属性返回当前文档的所有脚本（即 `script` 标签）。

`document.scripts`返回的也是 `HTMLCollection` 实例。

`document.styleSheets` 属性返回一个类似数组的对象，代表当前网页的所有样式表。每个样式表对象都有 `cssRules` 属性，返回该样式表的所有CSS规则，这样这可以操作具体的CSS规则了。

### 文档信息属性

#### document.documentURI，document.URL

`document.documentURI` 属性和 `document.URL` 属性都返回一个字符串，表示当前文档的网址。不同之处是 `documentURI` 属性可用于所有文档（包括 XML 文档），`URL` 属性只能用于 `HTML` 文档。

#### document.domain

`document.domain` 属性返回当前文档的域名。比如，某张网页的网址是 http://www.example.com/hello.html ，`domain` 属性就等于 `www.example.com`。如果无法获取域名，该属性返回 `null`。

#### document.lastModified

`document.lastModified` 属性返回当前文档最后修改的时间戳，格式为字符串。

注意，`lastModified` 属性的值是字符串，所以不能用来直接比较，两个文档谁的日期更新，需要用 `Date.parse` 方法转成时间戳格式，才能进行比较。

#### document.location

属性

```js
// 当前网址为 http://user:passwd@www.example.com:4097/path/a.html?x=111#part1
document.location.href // "http://user:passwd@www.example.com:4097/path/a.html?x=111#part1"
document.location.protocol // "http:"
document.location.host // "www.example.com:4097"
document.location.hostname // "www.example.com"
document.location.port // "4097"
document.location.pathname // "/path/a.html"
document.location.search // "?x=111"
document.location.hash // "#part1"
document.location.user // "user"
document.location.password // "passwd"
```

方法

```js
// 跳转到另一个网址
document.location.assign('http://www.google.com')
// 优先从服务器重新加载
document.location.reload(true)
// 优先从本地缓存重新加载（默认值）
document.location.reload(false)
// 跳转到新网址，并将取代掉history对象中的当前记录
document.location.replace('http://www.google.com');
// 将location对象转为字符串，等价于document.location.href
document.location.toString()
```

#### document.referrer，document.title，document.characterSet

`document.referrer` 属性返回一个字符串，表示当前文档的访问来源，如果是无法获取来源或是用户直接键入网址，而不是从其他网页点击，则返回一个空字符串。

`document.referrer` 的值，总是与HTTP头信息的 `Referer` 保持一致，但是它的拼写有两个 `r` 。

`document.title` 属性返回当前文档的标题，该属性是可写的。

#### document.readyState

`document.readyState` 属性返回当前文档的状态，共有三种可能的值。

- `loading`：加载HTML代码阶段（尚未完成解析）
- `interactive`：加载外部资源阶段时
- `complete`：加载完成时

#### document.designMode

`document.designMode` 属性控制当前文档是否可编辑，通常用在制作所见即所得编辑器。打开 `iframe` 元素包含的文档的 `designMode` 属性，就能将其变为一个所见即所得的编辑器。

#### document.implementation

`document.implementation` 属性返回一个对象，用来甄别当前环境部署了哪些DOM相关接口。`implementation` 属性的 `hasFeature` 方法，可以判断当前环境是否部署了特定版本的特定接口。

#### document.compatMode

`compatMode`属性返回浏览器处理文档的模式，可能的值为`BackCompat`（向后兼容模式）和`CSS1Compat`（严格模式）。

一般来说，如果网页代码的第一行设置了明确的`DOCTYPE`（比如`<!doctype html>`），`document.compatMode`的值都为`CSS1Compat`。

#### document.cookie

操作浏览器的Cookie

### 读写相关的方法

#### document.write()，document.writeln()

如果页面已经解析完成（`DOMContentLoaded`事件发生之后），再调用`write`方法，它会先调用`open`方法，擦除当前文档所有内容，然后再写入。

```js
document.addEventListener('DOMContentLoaded', function (event) {
  document.write('<p>Hello World!</p>');
});

// 等同于

document.addEventListener('DOMContentLoaded', function (event) {
  document.open();
  document.write('<p>Hello World!</p>');
  document.close();
});
```

`document.writeln` 方法与 `write` 方法完全一致，除了会在输出内容的尾部添加换行符。

### 查找节点的方法

#### document.querySelector()，document.querySelectorAll()

`document.querySelector` 方法接受一个CSS选择器作为参数，返回匹配该选择器的元素节点。如果有多个节点满足匹配条件，则返回第一个匹配的节点。如果没有发现匹配的节点，则返回 `null`。

`document.querySelectorAll` 方法与 `querySelector` 用法类似，区别是返回一个 `NodeList` 对象，包含所有匹配给定选择器的节点。

支持复杂的CSS选择器，但是不支持伪元素的选择器

#### document.getElementsByTagName()

`document.getElementsByTagName` 方法返回所有指定HTML标签的元素，返回值是一个类似数组的 `HTMLCollection` 对象，可以实时反映HTML文档的变化。如果没有任何匹配的元素，就返回一个空集。

#### document.getElementsByClassName()

`document.getElementsByClassName` 方法返回一个类似数组的对象（HTMLCollection实例对象），包括了所有 `class` 名字符合指定条件的元素，元素的变化实时反映在返回结果中。

#### document.getElementsByName()

`document.getElementsByName` 方法用于选择拥有 `name` 属性的HTML元素（比如`<form>`、`<radio>`、`<img>`、`<frame>`、`<embed>`和`<object>`等），返回一个类似数组的的对象（`NodeList`对象的实例），因为`name`属性相同的元素可能不止一个。

#### getElementById()

`getElementById` 方法返回匹配指定 `id` 属性的元素节点。如果没有发现匹配的节点，则返回 `null`。

#### document.elementFromPoint()

`document.elementFromPoint` 方法返回位于页面指定位置最上层的 `Element` 子节点。

```js
var element = document.elementFromPoint(50, 50);
```

上面代码选中在 `(50, 50)` 这个坐标位置的最上层的那个HTML元素。


`elementFromPoint` 方法的两个参数，依次是相对于当前视口左上角的横坐标和纵坐标，单位是像素。如果位于该位置的HTML元素不可返回（比如文本框的滚动条），则返回它的父元素（比如文本框）。如果坐标值无意义（比如负值或超过视口大小），则返回 `null`。

### 生成节点的方法

#### document.createElement()

`document.createElement` 方法用来生成网页元素节点。

#### document.createTextNode()

`document.createTextNode` 方法用来生成文本节点，参数为所要生成的文本节点的内容。

这个方法可以确保返回的节点，被浏览器当作文本渲染，而不是当作 HTML 代码渲染。因此，可以用来展示用户的输入，避免 XSS 攻击。

```js
var div = document.createElement('div');
div.appendChild(document.createTextNode('<span>Foo & bar</span>'));
console.log(div.innerHTML)
// &lt;span&gt;Foo &amp; bar&lt;/span&gt;
```

上面代码中，`createTextNode` 方法对大于号和小于号进行转义，从而保证即使用户输入的内容包含恶意代码，也能正确显示。

`createTextNode` 方法不转义双引号

#### document.createAttribute()

`document.createAttribute` 方法生成一个新的属性对象节点，并返回它。

参数是这个属性的名称

#### document.createDocumentFragment()

`createDocumentFragment` 方法生成一个DocumentFragment对象。

`DocumentFragment `对象是一个存在于内存的DOM片段，但是不属于当前文档，常常用来生成较复杂的DOM结构，然后插入当前文档。这样做的好处在于，因为**`DocumentFragment` 不属于当前文档，对它的任何改动，都不会引发网页的重新渲染，比直接修改当前文档的DOM有更好的性能表现**。

### 事件相关的方法

#### document.createEvent()

`document.createEvent` 方法生成一个事件对象，该对象可以被 `element.dispatchEvent` 方法使用，触发指定事件。

#### document.addEventListener()，document.removeEventListener()，document.dispatchEvent()

```js
// 添加事件监听函数
document.addEventListener('click', listener, false);

// 移除事件监听函数
document.removeEventListener('click', listener, false);

// 触发事件
var event = new Event('click');
document.dispatchEvent(event);
```

### 其他方法

#### document.hasFocus()

`document.hasFocus` 方法返回一个布尔值，表示当前文档之中是否有元素被激活或获得焦点。

#### document.createNodeIterator()，document.createTreeWalker()

`document.createNodeIterator` 方法返回一个DOM的子节点遍历器。

`document.createTreeWalker` 方法返回一个DOM的子树遍历器。它与`createNodeIterator` 方法的区别在于，后者只遍历子节点，而它遍历整个子树。

#### document.adoptNode()

`document.adoptNode` 方法将某个节点，从其原来所在的文档移除，插入当前文档，并返回插入后的新节点。

#### document.importNode()

`document.importNode` 方法从外部文档拷贝指定节点，插入当前文档。

## Element 节点

### 特征相关的属性

#### Element.attributes

`Element.attributes` 属性返回一个类似数组的对象，成员是当前元素节点的所有属性节点

#### Element.id，Element.tagName

`Element.id` 属性返回指定元素的 `id` 属性，该属性可读写

`Element.tagName` 属性返回指定元素的大写标签名，与 `nodeName` 属性的值相等。

#### Element.innerHTML

`Element.innerHTML `属性返回该元素包含的 HTML 代码。该属性可读写，常用来设置某个节点的内容。

**注意**

如果文本节点中包含&、小于号和大于号，`innerHTML` 属性会将它们转为实体形式 `&amp;` 、 `&lt;` 、 `&gt;`。

如果文本中含有 `<script>` 标签，虽然可以生成 `script` 节点，但是插入的代码不会执行，但是 `innerHTML` 还是有安全风险

```js
var name = "<img src=x onerror=alert(1)>";
el.innerHTML = name;
```

上面代码中 `alert` 还是会执行的，因此为了安全考虑，如果插入的是文本，最好用 `textContent` 属性代替 `innerHTML`

#### Element.outerHTML

`Element.outerHTML` 属性返回一个字符串，内容为指定元素节点的所有 HTML 代码，包括它自身和包含的所有子元素。

`outerHTML` 属性是可读写的，对它进行赋值，等于替换掉当前元素。

```js
// HTML代码如下
// <div id="container"><div id="d">Hello</div></div>

container = document.getElementById('container');
d = document.getElementById("d");
container.firstChild.nodeName // "DIV"
d.nodeName // "DIV"

d.outerHTML = '<p>Hello</p>';
container.firstChild.nodeName // "P"
d.nodeName // "DIV"
```

上面代码中，`outerHTML` 属性重新赋值以后，内层的 `div` 元素就不存在了，被 `p` 元素替换了。但是，变量 `d` 依然指向原来的 `div` 元素，这表示被替换的 `DIV` 元素还存在于内存中。

#### Element.className , Element.classList

```html
<div class="one two three" id="myDiv"></div>
```

上面代码的 `className` 属性和 `classList` 属性如下

```js
document.getElementById('myDiv').className
//'one two three'

document.getElementById('myDiv').classList
// {
//   0: "one"
//   1: "two"
//   2: "three"
//   length: 3
// }
```

classList 对象有下列几种方法

- `add()` : 增加一个class
- `remove()` : 移除一个class
- `contains()` : 检查当前元素是否包含某个class
- `toggle()` : 将某个class移入或移出元素（如果存在就移除，不存在就添加）
- `item()` : 返回指定索引位置的class
- `toString()` : 将class的列表转为字符串

### 盒装模型相关属性

#### Element.clientHeight,Element.clientWidth

返回元素节点可见部分的高度，不包括溢出(overflow)的大小

这两个属性的值等元素的css高度（宽度）加上css的padding减去滚动条（如果存在滚动条），单位为像素。

#### Element.clientLeft,Element.clientTop

`Element.clientLeft` 属性等于元素节点左边框的宽度，`Element.clientTop` 属性等于元素节点顶部边框的宽度，单位为像素

如果元素设置了 `display:inline` 它的 `clientLeft` 属性一律为 `0`

#### Element.scrollLeft,Element.scrollTop

`Element.scrollLeft`属性表示网页元素的水平滚动条向右侧滚动的像素，`Element.scrollTop`属性表示网页元素的垂直滚动条向下滚动的像素数量，对于没有滚动条的网页元素，这两个属性总是等于0

如果要查看整张网页的水平的垂直的滚动距离，要从`document.documentElement` 元素上读取

#### Element.scrollWidth,Element.scrollHeight

`Element.scrollHeight` 属性返回某个网页元素的总高度，`Element.scrollWidth` 属性返回总宽度，可以理解成元素在垂直和水平两个方向上可以滚动的距离。它们都包括由于溢出容器而无法显示在网页上的那部分高度或宽度。这两个属性是只读属性。

如果内容正好适合它的容器，没有溢出，那么 `Element.scrollHeight` 和 `Element.clientHeight` 是相等的，如果存在溢出，那么 `scrollHeight` 属性大于`clientHeight` 属性，宽度也是同样。

当存在溢出的时候，滚动条滚动到内容底部时，下列表达式为  `true` 

```js
element.scrollHeight - element.scrollTop === element.clientHeight 
```






