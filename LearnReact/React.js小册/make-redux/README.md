## 动手实现 Redux

需要一个共享的状态，但是害怕被任意修改，必须通过 `dispatch` 执行操作，并在 `action` 中声明

抽象出来一个 `createStore`, 可以产生 `store`, 并提供 `getState` 和 `dispatch` 函数

发现每次修改数据需要手动渲染，因此使用订阅者模式 `store.subscribe` 来订阅渲染的事件，每次数据修改时来自动渲染

优化 `stateChanger` 为 `reducer` ，定义 `reducer` 只能为纯函数，功能就是根据 `state` 和 `action` 返回新的 `state`