## 原理

### 从输入url到页面加载发生了什么「HTTP」

##### 浏览器先根据 url 去查找缓存

首先检查是否有缓存。比如在 chrome 的网址中输入 `chrome://cache` ，就可以看到缓存文件，如果找不到文件则证明无缓存

如果有缓存，判断缓存是否过期。一般通过两个字段，HTTP 1.0 中的 `expires` 「表明过期时间，但是因为客户端的时间和服务器时间有可能不同，会导致出现差错」和 HTTP 1.1 中的 `cache-control` ，首先查看是否有 `cache-control` 如果没有，则根据 `expires` 比较过期时间，如果有 `cache-control` 则根据 `cache-control` 的属性 `max-age` 「 设置缓存的最大有效时间，`max-age`  会覆盖掉 `expires`」或  `s-maxage` 「用于代理缓存，会覆盖掉 `max-age` 和 `expires`」，如果没有过期，则就使用客户端缓存，也就是「强缓存」。[强缓存存在的问题及解决方案](https://www.zhihu.com/question/20790576)

##### DNS 解析 url 获取对应 ip

如果没有缓存或者缓存已经过期，浏览器会发出一个 DNS 请求到本地 DNS 服务器，本地服务器也会首先去查看有没有缓存记录，如果有的话直接将 ip 返回。如果没有缓存，这里以 www.baidu.com 为例说明，事实上浏览器在请求 DNS 服务器时的真正网址是 www.baidu.com.  ， 最后的 . 对应的就是根服务器，因为每次默认请求都会添加 . , 因此为了方便用户都会将其省略掉。所以网址的解析过程就为 . -> .com -> .baidu.com. -> www.baidu.com. ,由根服务器开始查询，如果没有找到则向 com 域名服务器查询，直到查询到。

现在一般 DNS 服务器优化都会用到「负载均衡」，引用阿里云的一句话 

> 多台服务器经常被用做提供同一个服务，从而减轻单台服务器所承受的访问压力。这样分散每台服务器上的压力，将访问流量分配到多台服务器的方法就是负载均衡。

##### 打开一个 socket 与目标 ip 地址连接

socket : 两个进程要进行通讯基本前提就是能够唯一标识一个进程， PID 只在本地中唯一，网络中冲突非常大。因此网络中是使用  ip 地址 + 协议 + 端口号唯一标识网络中的进程。 socket 也就是由这三个部分组成。

Tcp 三次握手连接 

- 客户端发送一个 SYN 到服务器端口 「你好，听的到吗」
- 服务器端发送  ACK + SYN 到客户端 「嗯可以，你能听到我吗」
- 客户端发送 ACK 到服务器 「嗯可以」

##### 发送 HTTP 请求

浏览器向服务器发送请求，服务器根据响应头判断是否包含缓存验证信息。利用的是 `Last-Modified` ， `If-Modified-Since` 和 `ETag` ，`If-None-Match` ， 浏览器第一次请求资源的时候，服务器会在其响应头上添加 `last-mdified` 或者 `etag` , 当浏览器再次请求此资源时，会在请求头上附带上 `if-modified-since` 或 `if-none-match` ，其值就是对应的服务器响应值，然后服务器会比对对应值去判断文件是否改变，`if-modified-since` 是去比对文件的最后修改时间，但有可能存在文件时间修改，单文件内容没有变的情况，所以出现了 `etag` 「内容的标识符，内容修改就会变化」服务器判断，如果文件没有改变，服务器返回 304 ，**不会返回资源，浏览器收到响应后再去读取缓存**。

如果已过期则服务器重新读取发送资源或者操作数据库，然后返回相应信息

##### 如果数据传输完毕，浏览器关闭 TCP 连接

TCP 四次挥手断开连接，主动方可以是客户端也可以是服务器端

- 浏览器发送 FIN 到服务器端 「信息发送完毕」
- 服务器发送 ACK 到客户端 「收到，但是我这边还要再处理一下，等我消息」
- 服务器发送 FIN 到客户端 「OK，我这边数据也发完了，准备关闭了」
- 客户端发送 ACK 到服务器端 「OK，断吧」，发送后客户端会再等待一下，如果服务端没有回复则证明服务端已关闭，那么客户端此时也会关闭

##### 处理响应数据

首先浏览器检查响应状态码，如果资源可缓存，则进行缓存，然后根据资源类型相应的去处理

##### 假设资源为 HTML，接下来处理 HTML 资源

浏览器解析和渲染过程可以同时进行，浏览器解析 HTML 文档构建 DOM 树， 解析 CSS 资源构建 COM 树，如果遇到图片、样式表、js文件等启动下载。然后根据 DOM 树和 COM 树，DOM 与 COM 构造呈现树，然后进行布局并渲染绘制到屏幕上。

这里涉及到 「回流」 与 「重绘」，当盒模型的位置大小等属性确定后，浏览器会计算其大小和位置，这就是「回流」，当盒模型的外观和风格等不会影响布局的属性确定后，就会引发 「重绘」。

##### 展示页面

### 互联网协议

#### 物理层

要组网，首先要将电脑都连接起来。用物理手段将电脑连接起来。

#### 数据链路层

- 以太网协议： 将电信号分组，一组电信号构成一个数据包，叫做「帧」，每一帧分为 「标头」和 「数据」
- 广播： 同一字段通讯采用广播的方式，比如 A 电脑想要发送给 B 电脑数据，他会向同一子网络中的所有电脑发送消息，然后通过比对 MAC 地址确定要发送给哪一台电脑

但是这种传输方式效率低下，而且还需要进行通讯的两台电脑在同一个子网络中

#### 网络层

为了解决上面的问题，出现了网络层。这样就涉及到了子网络与子网络中电脑的通讯，也就是首先要分辨其是否属于同一个子网络，但是 MAC 地址只与厂商有关，和所处的网络没有关系。因此网络层，引进了一套新的地址，也就是 「网络地址」

- IP 协议：互联网上的每一台计算机都被分配到了一个 IP 地址，分为两个部分，前一部分代表网络，后一部分代表主机。处于同一个子网络的电脑，他的 IP 地址的网络部分是相同的。但是我们一般都不知道网络部分有几位，因此又出现了 「子网掩码」这一个概念，他的网络部分全为 1 ，主机部分全为 0，将两个 IP 地址分别与其子网掩码取 AND 操作，如果得出的结果相同，则证明在同一子网络
- ARP 协议，我们在发送的时候必须知道其 IP 地址和 MAC 地址，因此我们需要根据其 IP 地址获取到其 MAC 地址。如果 IP 在不同子网络，则告诉其「网关」，如果 IP 在同一子网络，ARP 边会以广播的形式寻找与此 IP 对应的 MAC 地址

现在我们就可以把数据包发送到任意一台主机了

#### 传输层

现在两台电脑可以建立起通信，但是电脑上有很多程序都需要用到网络，因此我们需要一个参数去判断这个数据包是要传递给哪个程序使用。这个参数就是 「端口」。

现在我们就需要在数据包中加上端口号，因此出现了下面两种协议

- UDP ：无连接、速度快
- TCP ：有连接，安全性高，能保证数据正确性

「传输层」的作用就是建立 「端口到端口」的通信

#### 应用层

规定应用程序的数据格式，数据用于不同的途径需要有不同的数据格式。比如 FTP 、HTTP

### HTTPS 协议

https 的加密过程如下

- 客户端给出支持的加密方法、协议版本号和一个客户端生成的随机数
- 服务端给出数字证书、以及一个服务端生成的随机数
- 客户端首先确定此证书有效，然后生成一个随机数，并用数字证书的公钥对此随机数进行加密，发给服务器端
- 服务端用私钥解密获取其随机数
- 服务端和客户端用此三个随机数生成对话的密钥，用来加密接下来的对话

### 闭包

- 概念 ：能够读取其他函数内部变量的函数
- 原理：外部函数里的内部函数在外部函数以外被调用，导致外部函数的作用域对象无法释放，因此我们还可以通过引用来访问其中的数据

### JavaScript 面向对象编程

#### 封装

```js
//ES5
function Cat(name,color) {
    // 定义属性
    this.name = name
    this.color = color
}
// 定义方法
Cat.prototype.eat = function() {console.log("eat")}

//ES6
class Cat {
    // 定义构造函数
    constructor(name, color) {
        // 定义属性
        this.name = name
        this.color = color
    }
    // 定义方法
    eat() {
        console.log("eat")
    }
}
```

#### 继承

##### 构造函数的继承 

```js
function Animal() {
    this.species = '动物'
}
function Cat(name,color) {
    this.name = name
    this.color = color
}
// 构造函数绑定
function Cat(name,color) {
    Animal.apply(this, arguments)
    this.name = name
    this.color = color
}
// prototype 继承实例
Cat.prototype = new Animal()
Cat.prototype.constructor = Cat // 因为 prototype 里面有一个 constructor 属性是默认指向其构造函数的，prototype 的改变会影响到 constructor 的改变，需要手动纠正

// prototype 继承 prototype
Cat.prototype = Animal.prototype
Cat.prototype.constructor = Cat // 但这里有一个问题就是 Animal.prototype.constructor 也指向了 Cat

// 利用空对象作为中介
var F = function(){}
F.prototype = Animal.prototype
Cat.prototype = F.prototype
Cat.prototype.constructor = Cat

// 拷贝继承
function extend(Child, Parent) {
    let p = Parent.prototype
    let c = Child.prototype
    for(let i in p) {
        c[i] = p[i]
    }
}
```

##### 非构造函数的继承

```js
let Chinese =  {
    nation: '中国'
}
let Doctor = {
    career: '医生'
}
// object() 方法
function object(o) {
    function F() {}
    F.prototype = o
    return new F()
}
    // new 原理
    var obj = {}
    obj.__proto__ = Base.prototype
    Base.call(obj)
    return obj
// 浅拷贝
function extendCopy(p) {
    let c = {}
    for(let i in p) {
        c[i] = p[i]
    }
    return c
}
// 深拷贝
function deepCopy(source, target={}) {
    // 遍历需要拷贝的对象
    for(let key in source) {
        // 不需要拷贝其原型上的属性
        if(source.hasOwnProperty(key)) {
            // 判断值的类型是否为 object
            if(typeof source[key] === 'object') {
                // 判断值的类型是否是 [] 或者 ｛｝
                target[key] = Array.isArray(source[key])?[]:{}
                // 递归深拷贝
               	deepCopy(source[key],target[key])
            }else {
                // 浅拷贝赋值
                target[key] = source[key]
            }
        }
    }
}
```

### 框架

#### 双向绑定

##### 思路

可以分为三个步骤

- 输入框以及文本节点与 data 中的数据绑定
- 输入框内容变化时，data 中的数据同步变化，这步实现了 view => model
- data 中的数据变化时，文本节点的内容同步变化，实现 model => view

##### 数据绑定

通过 `documentFragment` 将挂载目标的所有子节点进行「劫持」，经过统一处理之后再整体插入挂载目标

将「劫持」到的 dom 对象就行遍历，将有 `v-model` 属性名的元素和被 `{}` 包裹的文本提取出来赋值给 Vue 「实例对象」 的  `data` 对象中

##### V => M

如果 `input` 框上 `v-model` 属性，那么会调用其 `change` 方法，实时更新 `data` ，在「实例对象」的 `data` 对象中创建的值会用 `defineProperty`对其 `set` 和 `get` 进行改写,在此步骤中 `set` 只需要更新属性的值。

##### M => V

使用订阅发布模式「观察者模式」，发布者发布通知 => 主题对象「包含所有订阅者」收到通知推送给订阅者=>订阅者执行相应操作

因此，`data` 中每有一个属性被创建，相应也会创建其主题对象 `dep` , 在处理「劫持」到的 html 时，每当与 `data` 中的属性绑定会在其对应的 `dep` 对象中添加一个订阅者 `watcher`,其中需要通过 `Dep` 定义一个全局的 `target` 属性暂存新建的 `watcher` ，添加后移除。 `watcher` 触发实例对象的 `get` 方法从而将 `Dep.target` 存储进去

#### 虚拟 dom

用于减少代码的维护和 dom 操作

##### 思路

- 用 javaScript 对象结构表示 DOM 树的结构，而不是直接操作 DOM 树；然后用 Js 对象构建一个真正的 DOM 树，插到文档当中
- 当状态变更时，重新构造一棵新的对象树。然后与其之前的树做对比，记录两个树的差异
- 把记录的差异应用到步骤1所构建的真正的 DOM 树上

#### Get、Post 的区别

- GET在浏览器回退时是无害的，而POST会再次提交请求。
- GET产生的URL地址可以被Bookmark，而POST不可以。
- GET请求会被浏览器主动cache，而POST不会，除非手动设置。
- GET请求只能进行url编码，而POST支持多种编码方式。
- GET请求参数会被完整保留在浏览器历史记录里，而POST中的参数不会被保留。
- GET请求在URL中传送的参数是有长度限制的，而POST么有。
- 对参数的数据类型，GET只接受ASCII字符，而POST没有限制。
- GET比POST更不安全，因为参数直接暴露在URL上，所以不能用来传递敏感信息。
- GET参数通过URL传递，POST放在Request body中。

#### 数组去重

##### 双层循环

##### indexOf

```js
array.filter(function(item, index, array){
        return array.indexOf(item) === index;
    })
```

##### 已排序数组

```js
array.concat().sort().filter(function(item, index, array){
        return !index || item !== array[index - 1]
    })
```

#### 数据类型

Number,String,Boolean,Null,Undefined,Symbol 「基本数据类型」Object [引用数据类型]

#### Event Loop

在 js 中任务源被分为「微任务」和「宏任务」

微任务包括 `process.nextTick` , `promise` , `Object.observe` , `MutationOberver`

宏任务包括 `script` , `setTimeout` , `setInterval` , `setImmediate`  , `I/O` , `UI rendering` 

Event Loop 的执行顺序如下

1.  执行一个宏任务
2.  执行栈为空后，查询是否有微任务需要执行
3.  如果有微任务执行微任务，必要的话渲染 UI
4.  执行微任务结束后开启下一轮 Event Loop

#### call, apply, bind

改变其 this 指向，让新的对象可以执行该函数。思路也可以转变为给对象添加一个函数，然后在执行完后删除

```js
// call
Function.prototype.myCall = function(context) {
    let context = context || window
    context.fn = this
    let args = [...arguments].slice(1)
    let results = context.fn(...args)
    delete context.fn
    return result
}
// apply
Function.prototype.myApply = function (context) {
  var context = context || window
  context.fn = this

  var result
  // 需要判断是否存储第二个参数
  // 如果存在，就将第二个参数展开
  if (arguments[1]) {
    result = context.fn(...arguments[1])
  } else {
    result = context.fn()
  }

  delete context.fn
  return result
}
```

#### 原型链

每个函数都有 `prototype` 属性，除了 `Function.prototype.bind()` 该属性指向原型

每个对象都有 `__proto__` 属性，指向创建该对象的构造函数的原型。

##### 防抖

```js
function debounce(func, wait, immediate) {
    let timer
    return function() {
        let context = this
        let args = arguments
        
        clearTimeout(timeout)
        if(immediate) {
            // 如果已经执行过则不执行
            let callNow = !timeout
            timeout = setTimeout(function() {
                timeout = null
            }, wait)
            if(callNow) func.apply(context, args)
        } else {
            timeout = setTimeout(function() {
                func.apply(context, args)
            }, wait)
        }
        
    }
}
```

#### service worker

本质上充当 Web 应用程序与浏览器之间的代理服务器，也可以在网络可用时作为浏览器和网络间的代理。使得能够创建有效的离线体验，拦截网络请求并基于网络是否可用以及更新的资源是否驻留在服务器上来采取适当的动作。它们还允许访问推送通知和后台同步 API，**通常用来做缓存文件，提高首屏速度**

#### 块级元素与行内元素

- 块级元素的特点： 独自占一行，高度，行高以及外边距和内边距都可控制，可以容纳内联元素和其它块状元素
- 行级元素的特点： 和其他元素都在一行，高度，行高以及外边距和内边距都不可控制，margin 和 padding 只能控制左右 ; 只能容纳内联元素或者文本

- 常见块级元素：p,table,ul,div,form,h1
- 常见内联元素：a,span,input,label,select

#### 路由原理

本质就是监听 URL 的变化，然后匹配路由规则，显示相应的页面，并且无须刷新。

- Hash 模式

  通过 `hashchange` 事件监听 URL 的变化

- history 模式

  通过 `state` , 浏览器回退触发 `popstate` 跳转触发 `pushState` 都是不会有页面刷新的

#### 慢开始与拥塞避免

慢开始就是发送量从小到大逐渐增加「呈指数型增长」，当拥塞窗口大于慢开始门限时，启用拥塞避免算法，让拥塞窗口缓慢增长「加1」，并将慢开始门限设置成出现拥塞时发送窗口的一半

#### HTTP 常用返回码

**2XX 成功**

- 200 OK，表示从客户端发来的请求在服务器端被正确处理
- 204 No content，表示请求成功，但响应报文不含实体的主体部分
- 205 Reset Content，表示请求成功，但响应报文不含实体的主体部分，但是与 204 响应不同在于要求请求方重置内容
- 206 Partial Content，进行范围请求

**3XX 重定向**

- 301 moved permanently，永久性重定向，表示资源已被分配了新的 URL
- 302 found，临时性重定向，表示资源临时被分配了新的 URL
- 303 see other，表示资源存在着另一个 URL，应使用 GET 方法获取资源
- 304 not modified，表示服务器允许访问资源，但因发生请求未满足条件的情况
- 307 temporary redirect，临时重定向，和302含义类似，但是期望客户端保持请求方法不变向新的地址发出请求

**4XX 客户端错误**

- 400 bad request，请求报文存在语法错误
- 401 unauthorized，表示发送的请求需要有通过 HTTP 认证的认证信息
- 403 forbidden，表示对请求资源的访问被服务器拒绝
- 404 not found，表示在服务器上没有找到请求的资源

**5XX 服务器错误**

- 500 internal sever error，表示服务器端在执行请求时发生了错误
- 501 Not Implemented，表示服务器不支持当前请求所需要的某个功能
- 503 service unavailable，表明服务器暂时处于超负载或正在停机维护，无法处理请求

### 设计模式

#### 工厂模式

隐藏创建实例的复杂度，只需要提供一个接口，简单清晰

#### 单例模式

核心就是保证全局只有一个对象可以访问，例如全局状态管理以及模态框等

#### 适配器模式

适配器用来解决两个接口不兼容的情况，不需要改变已有的接口，通过包装一层的方式实现两个接口的正常协作。

#### 装饰模式

装饰模式不需要改变已有的接口，作用是给对象添加功能。就像我们经常需要给手机戴个保护套防摔一样，不改变手机自身，给手机添加了保护套提供防摔功能。

#### 代理模式

代理是为了控制对对象的访问，不让外部直接访问到对象。在现实生活中，也有很多代理的场景。比如你需要买一件国外的产品，这时候你可以通过代购来购买产品。例如「事件代理」等

#### 观察者模式

通过一对一或者一对多的依赖关系，当对象发生改变时，订阅方都会收到通知