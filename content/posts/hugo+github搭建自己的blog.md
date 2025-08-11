+++
date = '2025-07-01T04:06:44-04:00'
draft = false
title = 'Hugo+github搭建自己的blog'
+++

在debian上安装

wget https://github.com/gohugoio/hugo/releases/download/v0.125.6/hugo_extended_0.125.6_Linux-64bit.tar.gz
tar -xvzf hugo_extended_0.125.6_Linux-64bit.tar.gz



sudo mv hugo /usr/local/bin/



hugo version



初始化

hugo new site blog
cd blog

去hugo官网找一个自己喜欢的theme，然后安装

git init  # 如果还没 git init
git submodule add https://github.com/knadh/hugo-ink.git themes/ink



配置主题hugo.toml文件

baseURL = "https://haha077.github.io/blog/"
title = "我的博客"
theme = "ink"
languageCode = "zh-cn"

paginate = 10

[params]
    subtitle = "一个极简 Hugo 博客"
    author = "haha077"
    mode = "dark"

写文章

hugo new posts/hello.md

编辑生成的文件 `content/posts/hello.md`



本地局域网预览写好的文章

hugo server -D --bind 192.168.x.x --baseURL http://192.168.x.x:1313/ --appendPort=false



预览没问题开始生成静态网页

hugo



### 如果还是失败：推荐直接使用 SSH（永久免密码）

1. 生成 SSH 密钥：

```
bash


复制代码
ssh-keygen -t ed25519 -C "haha077@github.com"
```

一路回车。生成后查看公钥：

```
bash


复制代码
cat ~/.ssh/id_ed25519.pub
```

1. 复制输出的公钥内容
2. 打开 GitHub → [SSH settings](https://github.com/settings/ssh/new) → 添加公钥
    填入刚复制的公钥，起个名字
3. 然后切换远程地址为 SSH：

```
bash


复制代码
git remote set-url origin git@github.com:haha077/blog.git
```

1. 再次 push：

```
bash


复制代码
git push -u origin main
```

✅ 成功，不再需要用户名密码！



自动化部署方案

## ✅ 总结：你的三种选择

| 方式              | 分支     | 结构清晰 | 推荐度 | 说明                        |
| ----------------- | -------- | -------- | ------ | --------------------------- |
| `main + docs/`    | 1 个分支 | ✅        | ⭐⭐⭐⭐   | Hugo 输出到 `docs/`，最省事 |
| `main + gh-pages` | 2 个分支 | ✅✅       | ⭐⭐⭐⭐   | 代码/页面分离，自动部署     |
| `main` 根目录混合 | 1 个分支 | ❌        | ⭐      | 不推荐，文件混乱            |

我选择第一种

## ✅ 第一步：修改 Hugo 配置文件

编辑 `hugo.toml` 或 `config.toml`，添加或修改以下内容：

```
toml复制代码baseURL = "https://haha077.github.io/blog/"
publishDir = "docs"
```

> 👆 如果你用的是 `hugo.yaml`，请改写成：
>
> ```
> yaml复制代码baseURL: "https://haha077.github.io/blog/"
> publishDir: "docs"
> ```

------

## ✅ 第二步：重新构建网站输出到 `docs/`

```
bash复制代码cd ~/blog
hugo
```

这会把博客的静态页面输出到 `docs/` 文件夹。

------

## ✅ 第三步：提交 `docs/` 到 main 分支

```
bash复制代码git add docs
git commit -m "构建 Hugo 博客到 docs 文件夹，用于 GitHub Pages"
git push
```

------

## ✅ 第四步：在 GitHub 设置 Pages 发布路径

1. 打开仓库的页面：
    👉 https://github.com/haha077/blog/settings/pages
2. 设置：
   - **Source**: `Deploy from branch`
   - **Branch**: `main`
   - **Folder**: `/docs`
3. 保存（Save）

------

## ✅ 第五步：访问你的博客

几分钟后生效，打开：

👉 https://haha077.github.io/blog/

你应该就能看到 Hugo 生成的博客页面了 🎉



后续新增文章

### Step 1：创建新文章

在博客根目录执行：

```
bash


复制代码
hugo new posts/twrp无法充电.md
```

这会自动在 `content/posts/` 下创建一个 Markdown 文件，例如：

```
bash


复制代码
content/posts/twrp无法充电.md
```

------

### Step 2：编辑文章内容

打开刚生成的文件：

```
bash


复制代码
nano content/posts/twrp无法充电.md
```

默认内容像这样：

```
markdown复制代码---
title: "TWRP 模式无法充电"
date: 2025-07-01T10:00:00+08:00
draft: true
---

在 Nexus 5X 上测试，TWRP 模式下无法充电……
```

你可以：

- 修改 `title` 和 `date`
- 删除或保留 `draft: true`（草稿状态不会被发布）
- 填写正文内容

------

### Step 3：去掉草稿标记（发布用）

将：

```
yaml


复制代码
draft: true
```

改为：

```
yaml


复制代码
draft: false
```

或者直接删除这一行，Hugo 默认会发布。

------

### Step 4：重新构建博客

```
bash


复制代码
hugo    # 会输出到 docs/
```

### Step 5：推送到 GitHub（发布）

```
bash复制代码git add .
git commit -m "新增文章：TWRP 模式无法充电"
git push
```

------

## ✅ 几分钟后访问你的博客：

👉 https://haha077.github.io/blog/

即可看到刚发布的文章！



快速在另外一台，比如Windows电脑上同步hugo项目，写blog

## ✅ 一次性准备步骤（在新电脑上操作）

### Step 1：安装 Hugo

1. 下载 Hugo 可执行文件：
    👉 https://github.com/gohugoio/hugo/releases
2. 选择 `hugo_extended_X.X.X_windows-amd64.zip`（不要选不带 extended 的）
3. 解压后，把 `hugo.exe` 放入任意路径（建议加入系统环境变量）
4. 打开命令行（CMD / PowerShell），验证安装：

```
bash


复制代码
hugo version
```

------

### Step 2：安装 Git（如未安装）

👉 https://git-scm.com/download/win

------

### Step 3：克隆你的博客仓库

打开 PowerShell 或 CMD，执行：

```
bash复制代码git clone https://github.com/haha077/blog.git
cd blog
```

> 📦 这一步会下载你博客的全部源码（含 `docs/` 输出目录）

------

## ✅ 每次写博客时的流程（可复用）

1. 进入博客目录：

```
bash


复制代码
cd blog
```

1. 创建新文章：

```
bash


复制代码
hugo new posts/你的文章标题.md
```

1. 编辑文章（可用 VSCode、Notepad++、Typora 等 Markdown 工具）

文件在：

```
bash


复制代码
content/posts/你的文章标题.md
```

1. 构建站点：

```
bash


复制代码
hugo
```

这会输出到 `docs/` 文件夹

1. 推送到 GitHub：

```
git add .
git commit -m "新增文章：XXX"
git push
```

1. 等几分钟，访问博客查看：

👉 `https://haha077.github.io/blog/`





写好的文章，如需要修改，操作如下：

你可以像编辑本地文档一样修改已发布的 Hugo 博客文章，**操作流程非常简单**：

------

## ✅ 修改已发布文章的完整流程

### ① 打开你博客的本地项目目录

例如：

```
bash


复制代码
cd ~/blog
```

或在 Windows 上双击打开你的 `blog/` 文件夹。

------

### ② 找到你要修改的文章文件

路径通常是：

```
bash


复制代码
content/posts/xxx.md
```

例如你要修改这篇文章：

```
bash


复制代码
content/posts/twrp无法充电.md
```

------

### ③ 修改 Markdown 内容

用你喜欢的编辑器打开修改（例如：VSCode、Typora、Notepad++ 等）
 修改完成后保存。

------

### ④ 重新生成静态网页

```
bash


复制代码
hugo
```

这一步会把新内容重新输出到 `docs/`（如果你使用的是 `publishDir = "docs"` 模式）

------

### ⑤ 推送到 GitHub 发布

```
bash复制代码
git add .
git commit -m "修改文章：TWRP 无法充电"
git push
```

几分钟后，GitHub Pages 会自动刷新部署，浏览器访问：

👉 `https://haha077.github.io/blog/posts/twrp无法充电/`

即可看到修改后的内容！



++++++++++++++

markdown插入图片，本地与服务器同步显示（虚拟机版本）

https://haha077.github.io/blog/64eb5aef2743f81.png_e1080.jpg这样就能显示

但是./blog/static/image-20250708150018657-1751958525790-1.png这样就无法显示，只需定义好对应关系就行

1：首先是检查hugo.toml文件

在 `toml` 中添加或修改这一行：

```
toml


复制代码
baseURL = "https://haha077.github.io/blog/"
```

2：✅ 正确图片引用方式（不需要写 static）

你的 Hugo 项目结构像这样：

```
arduino复制代码blog/
├── static/
│   └── image-xxx.png
├── content/
│   └── posts/
│       └── your-post.md
```

**在 Markdown 中你应该这样引用**：

```
markdown


复制代码
![示意图](/blog/image-20250708150018657-1751958525790-1.png)
```

### ❗ 不能写成：

```
markdown复制代码![×](/blog/static/image-2025xxxx.png) ❌
![×](./blog/static/xxxx.png) ❌
```

![image-20250718173932985](/blog/image-20250718173932985.png)

偏好设置的图片路径要设置为virtualbox和debian的共享文件夹的挂载路径，注意debian要打通和宿主机的文件夹共享，需要安装要virtualbox的增强包才行哦

![image-20250718174340680](/blog/image-20250718174340680.png)

然后再手动修改（）的图片路径格式为/blog/即可

这样git push后，就能正常显示图片了
