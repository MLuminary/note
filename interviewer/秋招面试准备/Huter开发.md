## Huter开发日记

>  一款好看且方便用户的导航页

现在书签基本已经成为日常生活中必备的工具，我的书签也是非常庞大，因为自己的分类不明确有时需要找好久，便有了整理书签的想法。但对我来说书签太多也不是很方便我查找，因此自己打算制作一款导航页，可以用来方便自己管理书签。

因为利用的闲暇时间，期间还在做一些新项目新东西，所以陆陆续续拖得时间很长很长。

#### 项目初步构想

- 项目含有搜索功能，用户可以自定义添加搜索引擎。
- 将自己归类整理好的页面链接存在数据库中，前台拿到链接可以爬取出对应的图标和 title 在网页中分类展示出来
- 有用户登录登出功能，用户可以删除添加网页和类别，自定义导航页

#### 2018.08.11

技术选择为 vue + mongoDB + node + webpack ，因为前段时间聆听了 iview 3.0 的发布会，所以 UI 库就选择了 iview 3.0 

#### 2018.08.27

可以获取搜索提示并完成了搜索功能，但是 iview 3.0 bug 频出，图标加载不出来等一系列问题，最终更换为 elementUI 框架

#### 2018.09.10

项目大体样式和功能确认，如下

![1539155453218](C:\Users\admin\AppData\Roaming\Typora\typora-user-images\1539155453218.png)

其实有个问题我一直在思考，就是用户的**安全问题**，如果我要做用户的登录登出功能，用户的登录帐号和密码包括一些常用网站都存放在我的服务器上，但是我的服务器仅仅就是腾讯云的学生机，虽然这些书签被别人知道了也不能干啥，但是隐私泄露终究是隐私泄露，势必会影响到大部分的心情。再鉴于我的服务器的抗打击能力，暂时决定不做登录登出功能

但是不做登录登出也就相当于 Huter 不具备多终端同步的功能，用户在别的电脑登录 Huter 都只会看到初始化的 Huter ，这样违背了我的初心，我本来做的就是方便大家和自己使用的书签工具。

因为 js 不具备获取书签的能力，因此我把目标转向了 chrome 的扩展。