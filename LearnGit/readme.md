# 引言

寝室的笔记本太大，而且插了很多线。。本人很懒，又是穷b,于是将室友一年多没用的笔记本强行拿了过来。。说实话。电脑真的垃圾= =。不过拿着出去敲敲代码还是能满足的。

一直用 u 盘考代码显得太低端了，想到了 github，然后看了一些博文，但是有些命令还是记不住，在这里把一些自己常用的命令记下来，方便自己想不起来的时候查阅。:grin:

# git命令

#### 创建

``git init``

#### 添加文件到版本库

``git add 文件夹/文件名``

``git add . `` // 添加文件夹中的全部文件

#### 提交

``git commit -m "本次提交的信息"``

#### 添加ssh

``ssh-keygen -t rsa -C "youremail@example.com"``

#### 关联远程库

``git remote add origin git@github.com:MLuminary/repo-name.git``

#### 推送

``git push -u origin master`` //第一次推送

``git push origin master`` //正常推送

#### 克隆远程仓库

``git clone git@github.com:michaelliao/gitskills.git``

#### 拉取远程仓库同步到本地

``git pull origin master``

#### 添加分支

``git checkout -b hexo``

#### 推送分支

``git push --set-upstream origin hexo``

#### 克隆分支

``git clone -b hexo https://github.com/yourname/hexo-test.github.io.git``

#### 放弃未 `add` 的文件的修改

``git checkout -- readme.md`` //放弃readme.md文件

``git checkout .`` //放弃全部

#### 假如本地代码和远程代码库不相连并且都有 commit 

`git pull --allow-unrelated-histories`