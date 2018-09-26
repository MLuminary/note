# 微信小程序

> 自己前些日子打算学习一下小程序但是没时间，现在公司正好给了一个小程序的项目，因此打算把小程序的开发流程及 bug 以及 mpvue 的学习记录下来

### mpvue

vue 语法 + 小程序自带组件 + 小程序 api

##### src 目录

- components
  - card.vue 「card 组件」
- pages
  - index
    - index.vue  「页面」
    - main.js  「引用入口」
    - main.json 「此页面配置信息」
- app.json 「全局配置信息」
- App.vue 「总入口页面」
- main.js 「总入口引用js」

#### app.js

在 app.js 中配置 pages 时，引用的页面路径为 `pages/×××/main` ，我尝试改了 `×××` 目录下的 main 文件名字和 app.js 中的 pages 对应， 但是确报错找不到路径

#### .wxml 报错

使用 mpvue 时，如果你曾写过一个组件，并把它导入到小程序中然后运行 `npm run dev` 弹出了报错信息，那你在 `src` 下将组件文件删除是不能解决问题的，因为此时文件组件已被编译到了 `./dist` 目录下，微信开发者工具编译的页面其实也就是 `./dist` 目录下的文件。



