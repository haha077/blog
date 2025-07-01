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
