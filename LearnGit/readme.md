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

#### 修改 commit 作者的信息

**配置方法**

全局

```
git config --global user.email "youremail@google.com"
git config --global user.name "your name"<br><br>
```

局部

```
git config --local user.email "youremail@google.com"
git config --local user.name "your name"
```

但是补救措施只对以后的 commit 起效。 

如果想修改之前的作者信息，可以通过脚本重写历史信息： 

1. 创建一个你的 repo 的全新裸 clone （repo.git 替换为你的项目，下同）

```
git clone --bare https://github.com/user/repo.git
cd repo.git
```

2.复制粘贴脚本，并根据你的信息修改以下变量：

```shell
OLD_EMAIL # 历史记录中的邮箱
CORRECT_NAME # 新的用户名
CORRECT_EMAIL # 新的邮箱
```

3.脚本

```
#!/bin/sh
 
git filter-branch --env-filter '
 
OLD_EMAIL="your-old-email@example.com"
CORRECT_NAME="Your Correct Name"
CORRECT_EMAIL="your-correct-email@example.com"
 
# 可以通过或关系重写多个用户名
if [ "$GIT_COMMITTER_EMAIL" = "$OLD_EMAIL" ]
then
    export GIT_COMMITTER_NAME="$CORRECT_NAME"
    export GIT_COMMITTER_EMAIL="$CORRECT_EMAIL"
fi
if [ "$GIT_AUTHOR_EMAIL" = "$OLD_EMAIL" ]
then
    export GIT_AUTHOR_NAME="$CORRECT_NAME"
    export GIT_AUTHOR_EMAIL="$CORRECT_EMAIL"
fi
' --tag-name-filter cat -- --branches --tags
```

4.按 Enter 执行脚本。

5.查看新 Git 历史有没有错误。

6.把正确历史 push 到 Github：（push 有困难时记得修改 DNS 或者搭梯子）

```
git push --force --tags origin 'refs/heads/*'
```

7.清除临时 clone

cd ..
rm -rf repo.git
