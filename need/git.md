### 基本命令



git remote add gh_sk_store git@github.com:oldGingerHead/sk_store.git  添加一个仓库

$ git init                          -->初始化一个本地仓库
$ git status                        -->查看本地仓库文件状态
$ git add readme.txt                -->添加有更改状态的文件(git add *   添加所有文件)
$ git commit -m "branch test"       -->添加到暂存区

### 远程仓库操作
$ git remote                        -->查看远程库
$ git push origin dev               -->推送dev到origin仓库

### 分支操作

查看分支：git branch
创建分支：git branch <name>
切换分支：git checkout <name>
创建+切换分支：git checkout -b <name>
合并某分支到当前分支：git merge <name>
删除分支：git branch -d <name>


### 协作
查看远程库信息，使用git remote -v;

本地新建的分支如果不推送到远程，对其他人就是不可见的;

从本地推送分支，使用git push origin branch-name，如果推送失败，用先git pull抓取远程的新提交;

在本地创建和远程分支对应的分支，使用git checkout -b branch-name origin/branch-name，本地和远程分支的名称最好一致;

建立本地分支和远程分支的关联，使用git branch --set-upstream branch-name origin/branch-name;

从远程抓取分支，使用git pull，如果有冲突，要先处理冲突


0、Git clone ssh://用户名@远端仓库地址                                  -->克隆仓库
1、git pull git@github.com:oldGingerHead/sk_store.git               -->下载代码
2、git remote add luo git@gitee.com:itzan/test1802.git              -->建立链接并取名
3、git commit -am "说明"   添加到暂存区
4、git push  luo  master
