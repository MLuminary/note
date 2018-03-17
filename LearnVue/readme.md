# Vue

>Vue(读音 /vjuː/，类似于 view) 是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。

## 引入

```html
<script src="https://cdn.jsdelivr.net/npm/vue"></script>
```

## 声名式渲染


```html
<div id="example">
    <h1>{{ msg }}</h1><!--moustache语法,「小胡子」-->
  </div>
  <script>
    new Vue({
      el:'#example',
      data: {
        msg : 'Hello Vue.js'
      }
    })
```

## 指令

### v-text

```html
<div id="example">
  {{msg}}
</div>

<!-- 等同于 -->
<div id="example" v-text="msg"></div>
```

第一种属于`mustache`语法，`mustache`是小胡子的意思，两个中括号看起来也像小胡子一样

```js
new Vue({
  el : '#example',
  data : {
    msg : 'Hello Vue'
  }
})
```

### v-html

更新元素的`html`

[详细戳](https://cn.vuejs.org/v2/api/#v-html)

### v-show

根据表达式之真假值，切换元素的 `display` CSS 属性。

### v-if&&v-else-if&&v-else

根据表达式的值的真假条件渲染元素。在切换时元素及它的数据绑定 / 组件被**销毁并重建**。如果元素是 `<template>`，将提出它的内容作为条件块。

当条件变化时该指令触发过渡效果。

```html
<div id="example">
  <span v-if="score > 80">优秀</span>
  <span v-else-if="score > 60">及格</span>
  <span v-else>不及格</span>
</div>
<script>
  new Vue({
    el : '#example',
    data : {
      score : 70
    }
  })
</script>
//页面只显示及格
```

`v-else`,`v-else-if`要求前一兄弟元素必须有`v-if`,`v-else-if`

### v-for

适用于`Array`,`Object`,`number`,`string`

```html
<ul>
  <li v-for="item in items"></li>
  <li v-for="(val,key) in items"></li>
  <li v-for="(val,key,index) in items"></li>
</ul>
```

如果要重新排序元素，需要提供一个`key`的特殊属性

```html
<ul>
  <li v-for="item in items" :key="item.id"></li>
</ul>
```

这样`li`中的内容将会根据`item.id`去排序

### v-on

`v-on:`缩写 `@`

绑定事件监听器。事件类型由参数指定。表达式可以是一个方法的名字或一个内联语句，如果没有修饰符也可以省略。

```html
<!-- 方法处理器 -->
<button v-on:click="doThis"></button>

<!-- 对象语法 (2.4.0+) -->
<button v-on="{ mousedown: doThis, mouseup: doThat }"></button>

<!-- 内联语句 -->
<button v-on:click="doThat('hello', $event)"></button>

<!-- 缩写 -->
<button @click="doThis"></button>
```

### v-bind

`v-bind:`缩写为`:`

动态地绑定一个或多个特性，或一个组件 prop 到表达式。

```html
<!-- 绑定一个属性 -->
<img v-bind:src="imageSrc">

<!-- 缩写 -->
<img :src="imageSrc">

<!-- 内联字符串拼接 -->
<img :src="'/path/to/images/' + fileName">
```

### v-model

在表单控件或者组件上创建双向绑定

**修饰符**

`.lazy` - 取代 `input` 监听 `change` 事件

`.number` - 输入字符串转为数字

`.trim` - 输入首尾空格过滤


```html
<input type="number" v-model.number="num1">
<input type="number" v-model.number="num2">

<p>{{num1+num2}}</p>
```


### v-pre

跳过这个元素和它的子元素的编译过程。可以用来显示原始 Mustache 标签。跳过大量没有指令的节点会加快编译。

```html
<span v-pre>{{ hello }}</span>

<!-- hello id not defined -->
<span>{{ hello }}</span>
```

### v-cloak

这个指令保持在元素上直到关联实例结束编译

### v-once

只渲染元素和组件一次。随后的重新渲染，元素/组件及其所有的子节点将被视为静态内容并跳过。这可以用于优化更新性能。

## 过滤器

### 自定义过滤器

Vue2.0之后不再支持自带的过滤器,可以用第三方提供的过滤器也可以自定义过滤器

过滤器可以用在两个地方：双括号插值和 `v-bind` 表达式(后者从 2.1.0+ 开始支持)。过滤器应该被添加在 JavaScript 表达式的尾部，用「管道」符号使用

```html

<div id="example">
  <!-- 在双花括号中 -->
  <p>价格为{{price | currency('￥')}}</p>

</div>

<!-- 在 `v-bind` 中 -->
<div v-bind:id="rawId | currency"></div>
```

定义本地过滤器

```js
new Vue({
  el: '#example',
  data: {
    msg: 'Hello Vue',
    price: 100,
    rawId : 'hutchins'
  },
  filters: {
    //接受一个参数
    currency: function (value,arg) {
     return arg ? (arg + value) : value;
    }
  }
})
```

定义全局过滤器

```js
Vue.filter('currency', function (value, arg) {
  return arg ? (arg + value) : value;
})
```

过滤器可以串联

```html
{{price | rounding | increase}}

<script>
new Vue({
  el: '#example',
  data: {
    msg: 'Hello Vue',
    price: 100.06,
    rawId : 'v'
  },
  filters: {
    rounding: function (value) {
      return parseInt(value);
    },
    increase: function(value){
      return value * 1000;
    }
  }
})
</script>

<!-- 结果为100000 -->
```

在这个例子中，`rounding` 被定义为接收单个参数的过滤器函数，表达式 `price` 的值将作为参数传入到函数中。然后继续调用同样被定义为接收单个参数的过滤器函数 `increase`，将 `rounding` 的结果传递到 `increase` 中。


过滤器是 JavaScript 函数，因此可以接收参数：

```html
{{ message | filterA('arg1', arg2) }}
```
这里，`filterA` 被定义为接收三个参数的过滤器函数。其中 `message` 的值作为第一个参数，普通字符串 `'arg1'` 作为第二个参数，表达式 `arg2` 的值作为第三个参数。

## 计算属性和观察者

### 计算属性

计算属性其实是一个方法，定义在 `computed` 属性中的方法

```html
<div id="example">
  {{ message.split('').reverse().join('') }}
</div>
```

不利于维护，也难以处理

对于任何复杂逻辑，你都应当使用计算属性。

**举个栗子**

```html
<div id="example">
  <p>Original message: "{{ message }}"</p>
  <p>Computed reversed message: "{{ reversedMessage }}"</p>
</div>
```

```js
var vm = new Vue({
  el: '#example',
  data: {
    message: 'Hello'
  },
  computed: {
    // 计算属性的 getter
    reversedMessage: function () {
      // `this` 指向 vm 实例
      return this.message.split('').reverse().join('')
    }
  }
})
```

你可以打开浏览器的控制台，自行修改例子中的 vm。`vm.reversedMessage` 的值始终取决于 `vm.message` 的值。

你可以像绑定普通属性一样在模板中绑定计算属性。Vue 知道 `vm.reversedMessage` 依赖于 `vm.message`，因此当 `vm.message` 发生改变时，所有依赖 `vm.reversedMessage` 的绑定也会更新。而且最妙的是我们已经以声明的方式创建了这种依赖关系：计算属性的 `getter` 函数是没有副作用 `(side effect)` 的，这使它更易于测试和理解。

### 计算属性缓存


计算属性的方法和 `methods` 中的方法实现的功能是一样的

```html
<p>Reversed message: "{{ reversedMessage() }}"</p>
```

```js
// 在组件中
methods: {
  reversedMessage: function () {
    return this.message.split('').reverse().join('')
  }
}
```

**计算属性是基于它们的依赖进行缓存的**，计算属性只有在它的相关依赖发生改变时才会重新求值，所以只要 `message` 没有发生任何改变，多次访问 `reversedMessage` 计算属性都会立即返回之前的计算结果，不必再次执行函数，用 `methods` 实现的话，如果调用方法将**总会**再次执行函数，如果此函数中有大量计算，开销过大，那重复计算就会耗费大量的性能。当然，如果你**不需要缓存或者计算量不大的话**，完全可以用 `methods`

### 侦听属性

Vue 提供了一种更通用的方式来观察和响应 Vue 实例上的数据变动：**侦听属性**。当你有一些数据需要随着其它数据变动而变动时，你很容易滥用 `watch`——特别是如果你之前使用过 AngularJS。然而，通常更好的做法是使用计算属性而不是命令式的 `watch `回调。

```html
<div id="demo">{{ fullName }}</div>
```

```js
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
```

上面代码是命令式且重复的。将它与计算属性的版本进行比较：

```js
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

### 计算属性的setter

计算属性默认只有 `getter` ，不过在需要时你也可以提供一个 `setter` 

```js
computed: {
  fullName: {
    // getter
    get: function () {
      return this.firstName + ' ' + this.lastName
    },
    // setter 默认调用
    set: function (newValue) {
      var names = newValue.split(' ')
      this.firstName = names[0]
      this.lastName = names[names.length - 1]
    }
  }
}
```

现在再运行 `vm.fullName = 'John Doe'` 时，`setter` 会被调用，`vm.firstName` 和 `vm.lastName` 也会相应地被更新。

## 生命周期

`create`,`mount`,`update`,`destroy`四个阶段，每个阶段有两个回调函数，也就是**生命周期钩子**的函数

```js
new Vue({
  beforeCreate : function () {
    
  },
  created : function () {
    
  },
  beforeMount : function () {
    
  },
  mounted : function () {
    
  },
  beforeUpdate : function () {
    
  },
  updated : function () {
    
  },
  beforeDestroy : function () {
    
  },
  destroyed : function() {
    
  }
})
```

![lifecycle](img/lifecycle.png)


## 组件

组件可以扩展 HTML 元素，封装可重用的代码。在较高层面上，组件是自定义元素，Vue.js 的编译器为它添加特殊功能。在有些情况下，组件也可以表现为用 `is` 特性进行了扩展的原生 HTML 元素。

所有的 Vue 组件同时也都是 Vue 的实例，所以可接受相同的选项对象 (除了一些根级特有的选项) 并提供相同的生命周期钩子。

### 命名

建议：短横线分隔命名 `kebab-case`

### 创建实例

```html
<div id="example">
  <my-component></my-component>
</div>
```

全局组件

```js
Vue.component('my-component',{
  template:'<h1>Hello Component</h1>'
})

//根实例
Vue.new({
  el:'#example',
  ...
})
```

局部组件

```js
new Vue({
  el:'#example',
  components:{
    'my-component':{
      template:'<h1>Hello Component</h1>'
    }
  }
})
```

### 复合组件

全局组件可以在父模板中的任何一个元素（组件）去使用，局部组件只能够用在父模板中

例如现有局部组件 `item` ，全局组件 `my-list` ， `my-item` ，可以在 `my-list` 中调用 `my-item` ，但是不可以调用 `item`

当将局部组件和全局组件放在一起构成的组件称之为复合组件

### DOM模板解析注意事项

[戳](https://cn.vuejs.org/v2/guide/components.html#DOM-%E6%A8%A1%E6%9D%BF%E8%A7%A3%E6%9E%90%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9)

### `data` 必须是函数

[戳](https://cn.vuejs.org/v2/guide/components.html#data-%E5%BF%85%E9%A1%BB%E6%98%AF%E5%87%BD%E6%95%B0)


### 组件间通信

在 Vue 中，父子组件的关系可以总结为 **prop 向下传递，事件向上传递**。父组件通过 **prop** 给子组件下发数据，子组件通过**事件**给父组件发送消息。看看它们是怎么工作的。

![props-event](img/props-events.png)

#### 父传子

这里用了 `x-Templates` 的方法，一共有7种定义组件模板的方法，详情请戳 [7 Ways To Define A Component Template in Vue.js](https://vuejsdevelopers.com/2017/03/24/vue-js-component-templates/)

```html
<div id="example">
  <father></father>
</div>

<script type="text/x-template" id="father-template">
  <div>
    <h1>This is a father component</h1>
    //父组件通过name传递'hutchins'字符串
    <son name="hutchins"></son>
    <button @click="handleClick">Click</button>
  </div>
</script>

<script type="text/x-template" id="son-template">
  <div>
    <h1>This is a son component</h1>
    //子组件通过name属性接受并显示
    <span>{{"接受到数据为:" + name}}</span>
  </div>
</script>
```

```js
//创建组件
Vue.component('father',{
  template : '#father-template',
  methods:{
    handleClick:function(){
      console.log('father metheds')
    }
  }
})

Vue.component('son',{
  //子组件用过props接受存储
  props : ['name'],
  template : '#son-template'
})

new Vue({
  el : '#example'
})
```

`x-template` 这种方法就相当于将组件 `template:` 后的字符串单独拿出来写，看起来更方便更直观

**动态传递**

在这里只贴出与上面不相同的代码

```html
<script type="text/x-template" id="father-template">
  <div>
    <h1>This is a father component</h1>
    //此处必须用v-bind，否则传递是'kw'这个字符串
    <son :name="kw"></son>                          
    <input type="text" v-model="kw">
    <button @click="handleClick">Click</button>
  </div>
</script>
```

在组件中，`data` 属性必须是一个带有返回值的函数

```js
Vue.component('father',{
  template : '#father-template',
  data:function(){
    return{
      kw : ''
    }
  }
})
```

#### 子传父

每个 Vue 实例都实现了**事件接口**

- 使用 `$on(eventName)` 监听事件
- 使用 `$emit(eventName)` 触发事件

`$on(eventName,callback)` 监听函数

`$emit(eventName,[...args])` 触发事件，附件参数都会传递给监听器回调


首先要约定一下事件的名称 `toFather` ，再调用子组件时，绑定自定义事件 `@toFather=""` ，然后子组件通过 `$emit()` 传递

**示例代码**

```html
<div id="example">
  <father></father>
</div>

<script type="text/x-template" id="father-template">
  <div>
    <h1>This is a father component</h1>
    <span>{{"儿子发来的数据：" + msgFromSon}}</span>
    <!-- 自定义事件监听器 -->
    <son v-on:toFather="recEvent"></son>
  </div>
</script>

<script type="text/x-template" id="son-template">
  <div>
    <h1>This is a son component</h1>
    <input type="text" v-model="kw">
    <button @click="handleClick">sendToFather</button>
  </div>
</script>
```

```js
Vue.component('father', {
  template: '#father-template',
  data:function(){
    return {
      msgFromSon:''
    }
  },
  methods: {
    recEvent:function(result){
      this.msgFromSon = result;
    }
  }
})


Vue.component('son', {
  template: '#son-template',
  data: function () {
    return {
      kw: ''
    }
  },
  methods: {
    handleClick: function () {
      this.$emit('toFather',this.kw)
    }
  }
})

new Vue({
  el: '#example'
})
```

#### ref

`ref` 被用来给元素或子组件注册引用信息。引用信息将会注册在父组件的 `$refs` 对象上。如果在普通的 DOM 元素上使用，引用指向的就是 DOM 元素；如果用在子组件上，引用就指向组件实例

**子传父**

给孩子组件 `son` 添加 `ref` 属性

```html
<script type="text/x-template" id="father-template">
  <div>
    <button v-on:click="checkSonStatus">查看儿子在干嘛</button>
    <son ref="mySon"></son>
  </div>
</script>
```

通过 `this.$refs.mySon` 就可以获取的 `son` 组件实例

```js
Vue.component('father',{
  template : '#father-template',
  methods : {
    checkSonStatus : function() {
      console.log(this.$refs.mySon.name+ " " + this.$refs.mySon.nowDoing());
    }
  }
})

Vue.component('son',{
  template : '#son-template',
  data : function(){
    return {
      name : 'zhangsan'
    }
  },
  methods: {
    nowDoing:function(){
      return 'is studying'
    }
  }
})
```

点击 `button` 后将打印 `zhangsan is studying`

**父传子**

```html
<script type="text/x-template" id="son-template">
  <div>
    <h1>this is a son component</h1>
    <button v-on:click="checkFatherStatus">看看老爸在干嘛</button>      
  </div>
</script>
```

`this.$parent` 直接获取父组件实例对象

```js
 Vue.component('father',{
  template : '#father-template',
  data : function(){
    return {
      name : 'hutchins'
    }
  },
  methods : {
    nowDoing : function() {
      return 'is swimming...'
    },
  }
})

Vue.component('son',{
  template : '#son-template',
  methods: {
    checkFatherStatus : function(){
      console.log(this.$parent.name+" "+this.$parent.nowDoing())
    }
  }
})
```

点击 `button` 后打印 `hutchins is swimming`

#### 兄弟组件之间通信

兄弟组件之间的通信，在简单场景下，可以使用一个空的 Vue 实例作为事件总线

```js
var bus = new Vue()
```

组件 A 传递信息

```js
bus.$emit('toBrotherComponent', message)
```

组件 B 接受信息

```js
mounted : function() {
  bus.$on('toBrotherComponent',function (message) {
    // ...
  }).bind(this)//如果回调函数中用到指代此组件的 this,需要使用 bind
}
```

## vue-router

### 简单实例

引入相关 js 文件

```html
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>
```

指定盛放的组件 `router-view`

```html
<div id="example">

  <router-view></router-view>
</div>
```

```js
var Login = Vue.component('login-component',{
  template :'<h1> this is login</h1>'
})

var Main = Vue.component('main-component',{
  template :'<h1> this is main</h1>'
})

//配置路由词典
var myRoutes = [
  {
    path:'/',
    component : Login
  },
  {
    path : '/myLogin',
    component :  Login
  },
  {
    path : '/myMain',
    component :  Main
  },
  {
    path : '*',
    component : Login
  }
]

//创建路由实例
var myRouter = new VueRouter({
  routes : myRoutes
})

new Vue({
  el : '#example',
  router : myRouter
})
```

### 页面跳转

#### router-link

```html
<router-link to="/myMain">跳转到Main页面</router-link>
```

#### $router.push()

```js
//组件内
template : '<button v-on:click="handleClick">跳转到Main页面</button>',
methods : {
  handleClick : function(){
    this.$router.push('/myMain')
  }
}
```

#### a标签

```js
//组件内
template : "<a href='#/myMain'></a>"
```

### 页面传参

用 `a` 标签传递 `hutchins` 字符串

```js
//组件内
template : '<a href="#/myMain/hutchins">跳转到Main页面，传递name</a>'
```

配置对应的路由词典

```js
new Vue({
  router : new VueRouter({
    routes : {
      path : '/myMain/:name',
      component : ...
    }
  })
})
```

在 Main 页面处接受数据

```js
mounted:function(){
  this.$route.params.name//hutchins
}
```

注意是 `$route` 

当然另外两种跳转路径也都是相同的

```js
<router-link to='/myMain/hutchins'></router-link>
this.$router.push('./myMain/hutchins')
```

## vue-resourse

- `get(url, [options])`
- `head(url, [options])`
- `delete(url, [options])`
- `jsonp(url, [options])`
- `post(url, [body], [options])`
- `put(url, [body], [options])`
- `patch(url, [body], [options])`

```js
this.$http
    .get('data/test.json',{
      //传的数据一定要在params中
      params:{
        userId : '123'
      },
      //后面紧跟的为[options]
      header:{

      }
      ...
    })//请求响应的路径
    .then(function(response){
      response.body//获取的数据
    },function(response){
      error//错误
    })
this.$http
    .post('data/test.json',{
      userId:'123'
    },{
      header: {

      },
      ..
    })
    .then(function(response){
      response.body//获取的数据
    },function(err){
      error//错误
    })
```

## axios

`get` 请求例子

```js
axios.get('/user', {
    params: {
      ID: 12345
    }
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
```

`post` 请求例子

```js
axios.post('/user', {
    firstName: 'Fred',
    lastName: 'Flintstone'
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
```

## 命令行安装

Vue 提供一个官方命令行工具，可用于快速搭建大型单页应用 (SPA)。该工具为现代化的前端开发工作流提供了开箱即用的构建配置。只需几分钟即可创建并启动一个带热重载、保存时静态检查以及可用于生产环境的构建配置的项目：

```shell
# 全局安装 vue-cli
$ npm install --global vue-cli
# 创建一个基于 webpack 模板的新项目
$ vue init webpack my-project
# 安装依赖，走你
$ cd my-project
$ npm install
# 启动liteServer
$ npm run dev
```

## my-project中的操作

**新建组件**

在 `src/component` 下创建 `vue` 后缀的文件

```js
<template>
  <div>
    <h1>Hello Vue</h1>
  </div>
</template>

<script>
  export default{
    name : 'demo01'
  }
</script>
//scoped 只适用于组件内部
<style scoped>

</style>
```

要想访问此文件还需要配置 `router` 下的 `index.js` 文件

```js
//导入文件
import Demo01 from '@/components/demo'
//配置路由词典
export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    //将Demo1组件挂载上
    {
      path:'/demo01',
      name : 'demo01',
      component:Demo01
    }
  ]
})
```




## 参考链接

https://cn.vuejs.org/v2/guide/

https://github.com/pagekit/vue-resource/blob/develop/docs/http.md