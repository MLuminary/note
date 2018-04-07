# You Don't Know Js

## 作用域是什么

「作用域」是根据名称查找变量的一套「规则」

### 编译原理

javaScript 编译分为三个阶段 

**词法分析** 

将有字符组成的字符串「对编译语言来说」分割成有意义的代码块

**语法分析**

将词法单元流转换成一个代表程序语法结构的数 「抽象语法树」

**代码生成**

将抽象语法树「AST」转化为机器可执行的代码

### 编译器术语

LHS ： 查找的目的是对变量进行赋值

RHS ： 查找的目的是为了获取变量的值

举个栗子

```js
var a = 3; //LHS
```

查找 `a` 为了对其进行赋值

```js
console.log(b); //RHS
```

查找 `b` 为了获取其值并打印

区分 LHS 和 RHS 很有必要，因为不成功的 RHS 会抛出 ReferenceError ，而不成功的 LHS 会导致自动隐式地创建一个全局变量「非严格模式」

### 理解作用域

```js
var a = 2
```

1. 首先 `var a` 在其作用域中声明新变量，这会是在**最开始的阶段，也就是代码执行前**
2. `a = 2` 进行 LHS 查询，并对变量 `a` 进行赋值

LHS 和 RHS 都会在当前作用域中查询，如果有需要，会向上级作用域继续查找，最后抵达全局作用域，无论找到没找到都会停止
