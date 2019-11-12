# Diff - React 15

> Diff 算法始终是 React 的重中之重，自己之前对于 Diff 只是停留在了解阶段，并未研究其实现过程。

「Diff 算法」的出现是为了找到渲染前后真正变化的部分来减少 Dom 的更新，避免不必要的资源浪费

## 传统算法

传统的 Diff 算法通过循环递归对节点进行依次对比， 算法的时间复杂度为 O(n^3) ，大体的实现思路如下：

​	   PREV            NEW

​	   A                     A

​    B     C   <=>   D     C

D                                    B

PREV 和 NEW 两棵 DOM 树所有节点两两对比，里面涉及两次遍历，时间复杂度为 O(n^2)，PREV 树的其中一个节点与 NEW 树的所有节点对比完后会建立一张 DIFF 表，**最后还要再遍历一遍 DIFF 表来选出最优的 DIFF 操作**，所以最后的算法时间复杂度为 O(n^3) 具体的代码其实我没有看过，但我感觉我的感觉可以写一下大体的代码实现来方便自己理解

```
pNode in PREV
	nNode in NEW
		pNode <=> nNode => diffs  // 进行比较得出 diffs
		let bestDiff
    diff in diffs
    	if bestDiff.best > diff.best 	// 找出最优的 diff
    		bestDiff = diff
    	do bestDiff
```

## React Diff 算法

![image](https://user-images.githubusercontent.com/13267437/38466062-21517a74-3b56-11e8-8f87-414943271683.png)

React 中的 Diff 算法会将两棵树进行分层比较，一棵树中的节点只会与另一棵树的同一层级的节点进行比较。因此时间复杂度从 O(n^3) 降为 O(n)。

### 对于父节点的比较「Component」

- 对于相同类的组件，继续比较组件下的节点
- 对于不同类的组件，我们认为以这两个节点为根节点的树会完全不同

![clipboard.png](https://segmentfault.com/img/bVbjz1q?w=542&h=221)

因此上面这种情况下 D 整棵子树会重新删掉，E、F 节点会重新被创建

![clipboard.png](https://segmentfault.com/img/bVbjzVs?w=532&h=309)

还有上图这种情况，虽然将 A 子树整个移动到 D 节点是最优的 diff ，但是这样就必须涉及到跨层级的比较，时间复杂度也会上升，因此 React 的 diff 算法会先删除掉整个 A 子树，然后在 D 节点下面再重新创建

### 对于子节点的比较

当节点处于同一级时，react 希望开发者给同一层级的节点添加唯一的 key 进行区分

![image.png](https://cdn.nlark.com/yuque/0/2019/png/146046/1556242828648-c8f5a671-af4c-4b58-9b8f-ee97455493fc.png?x-oss-process=image/resize,w_400)

如上图，如果没有 Key 时，React 发现 B != A ，就会删除 A 然后创建 B，以此类推。但其实这些节点都是相同的节点，只是由于位置的变化，并不需要进行繁琐低效的删除创建操作。

![image.png](https://cdn.nlark.com/yuque/0/2019/png/146046/1556242875967-9ac94c85-edab-44fe-84d6-1e6ab74a4fca.png?x-oss-process=image/resize,w_388)

如上图，通过添加的 Key 值，React 可以对比新老集合的节点，当 React 发现节点是相同节点时，只会将其进行位置的移动，节省了大量的开支。



## 参考链接

https://segmentfault.com/a/1190000017039293

https://github.com/hujiulong/blog/issues/6

# React 合成事件

当我们在组件上绑定事件时，React 并不会在该 DOM 元素上直接绑定事件处理器，React 内部自定义了一套事件系统，在这个系统上进行统一的事件订阅和分发。

例如真正的 Dom Event 可以通过合成事件的 `nativeEvent`获得

## 动机

- 抹平浏览器之间的兼容性与事件的差异
- 对绑定的事件做整体的优化，比如利用事件委托机制，大部分的事件最终都绑定到了 Document
- 干预事件的分发，V16 引入 Fiber 让不同的类型的事件拥有不同的优先级，高优先级的事件可以中断渲染，可以优先响应用户的交互

## 过程

**事件注册**

在 Props 初始化或更新时会进行事件的绑定。首先 React 会判断元素是否是媒体类型，**媒体类型的事件是无法在 Document 上监听的，所以会直接在元素上进行绑定，反之就统一在 Document 上绑定**。拥有统一的回调函数 `dispatchEvent` 来执行事件分发。

**事件合成**

从原生的 `nativeEvent` 对象生成合成事件对象，同一种事件类型只能生成一个合成事件 `Event`，如 `onclick` 这个类型的事件，dom 上所有带有通过 jsx 绑定的 `onClick` 的回调函数都会按顺序（冒泡或者捕获）会放到`Event._dispatchListeners` 这个数组里，后面依次执行它。

**事件派发**

首先根据触发的 DOM 找到对应的 React Component ，然后将此组件与父组件的事件方法放入队列去依次执行，

因此其实 **React 合成事件的冒泡并不是真正的冒泡，而是节点的遍历**

## 事件池

`SyntheticEvent` 是在事件池中的，这意味着`SynctheticEvent` 对象可能会被重用，而且在事件回调函数被调用后，所有的属性都会无效。出于性能考虑， `SyntheticEvent` 在正常情况下是不能以异步方式访问的。

在 React 中，因为 `setState` 也是异步的，所以也没办法将 `SyntheticEvent` 保存下来。但其实如果你想异步获取的话只需要在事件中调用 `event.persist()`，此方法会从事件池中移除合成事件，允许用户代码保留对事件的引用。

## 处理捕获

React 的事件处理函数在冒泡阶段被触发。如果需要注册捕获阶段的事件处理函数，则应为事件名添加 `Capture` ，例如，处理捕获阶段的点击事件请使用 `onClickCapture` 而不是 `onClick` 

## 合成事件与原生事件的注意点

- 合成事件时驼峰写法，原生事件是小写
- 合成事件全部委托到 document 上，而原生事件绑定到 Dom 元素本身。因此原生事件的执行时机是要早于全部的合成事件，这样就造成一个问题，当原生事件阻塞后，其后的合成事件都将无法执行。

## 参考链接

https://juejin.im/post/5d44e3745188255d5861d654

# React Hook

React Hook 的设计目的，就是加强函数组件，完全不使用「类」，就能写出一个全功能组件。组件尽量写成纯函数，如果需要外部功能和副作用，就用钩子把外部代码「钩」进来。

组件类的缺点：

- 大型组件很难拆分和重构，也很难测试。
- 业务逻辑分散在组件的各个方法之中，导致重复逻辑或关联逻辑。
- 组件类引入了复杂的编程模式，比如 render props 和高阶组件。
- 类组件中的 `this` 增加学习成本，类组件在基于现有工具优化上存在些许问题

Hook 会建立 State 数组与 Setters 数组分别存储对应的数据，并根据下标去取数据或者对应的方法

![img](https://miro.medium.com/max/640/1*LAZDuAEm7nbcx0vWVKJJ2w.png)

## 注意事项

我们只能在顶层代码「Top Level」中调用 Hooks，不能在循环或判断语句里调用，因为我们的 Hooks 会记住第一次的调用顺序，之后会根据这个顺序返回对应的数据，因此我们必须在顶层代码中调用 Hooks。

## 解决的问题

- 关于状态有关的逻辑重用及共享现在一般使用 render Props 或者 HOC，但是这两种都会造成组件数量和嵌套层级过深的问题。
- 生命周期函数过多太乱，现在只有 `useEffect`一个函数管理 `mount` ,`didUpdate`  与 `unmount` 生命周期

## 参考链接

https://medium.com/@ryardley/react-hooks-not-magic-just-arrays-cd4f1857236e

# React 推出新生命周期的原因

- FIber 架构下，reconciler 会进行多次，reconciler 过程又会调用多次之前的 willxxx, 为了避免多次执行副作用代码而造成的性能安全和数据错乱等问题，因此将其删掉
- Reconciler 时改用 static getDerivedStateFromProps ，不能获取 this, 因此基本不会存在副作用代码
- getSnapShotBeforeUpdate 替换之前 willxxx，可讲之前 willxxx 的一些逻辑代码移到此处，此方法执行时已经是 commit 阶段，因此只会执行一次
- componentDidCatch 这种组件**可以捕获并打印发生在其子组件树任何位置的 JavaScript 错误，并且，它会渲染出备用 UI**，而不是渲染那些崩溃了的子组件树。错误边界在渲染期间、生命周期方法和整个组件树的构造函数中捕获错误。