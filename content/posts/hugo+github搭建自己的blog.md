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

ssh-keygen -t ed25519 -C "haha077@github.com"
```

一路回车。生成后查看公钥：

```

cat ~/.ssh/id_ed25519.pub
```

1. 复制输出的公钥内容
2. 打开 GitHub → [SSH settings](https://github.com/settings/ssh/new) → 添加公钥
    填入刚复制的公钥，起个名字
3. 然后切换远程地址为 SSH：

```
 


 
git remote set-url origin git@github.com:haha077/blog.git
```

1. 再次 push：

```
 


 
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
toml baseURL = "https://haha077.github.io/blog/"
publishDir = "docs"
```

> 👆 如果你用的是 `hugo.yaml`，请改写成：
>
> ```
> yaml baseURL: "https://haha077.github.io/blog/"
> publishDir: "docs"
> ```

------

## ✅ 第二步：重新构建网站输出到 `docs/`

```
  cd ~/blog
hugo
```

这会把博客的静态页面输出到 `docs/` 文件夹。

------

## ✅ 第三步：提交 `docs/` 到 main 分支

```
  git add docs
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
 


 
hugo new posts/twrp无法充电.md
```

这会自动在 `content/posts/` 下创建一个 Markdown 文件，例如：

```
 


 
content/posts/twrp无法充电.md
```

------

### Step 2：编辑文章内容

打开刚生成的文件：

```
 


 
nano content/posts/twrp无法充电.md
```

默认内容像这样：

```
markdown ---
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


 
draft: true
```

改为：

```
yaml


 
draft: false
```

或者直接删除这一行，Hugo 默认会发布。

------

### Step 4：重新构建博客

```
 


 
hugo    # 会输出到 docs/
```

### Step 5：推送到 GitHub（发布）

```
git add .
git commit -m "新增文章：TWRP 模式无法充电"
git push
```

------

## ✅ 几分钟后访问你的博客：

👉 https://haha077.github.io/blog/

即可看到刚发布的文章！



# 快速在另外一台，比如Windows电脑上同步hugo项目，写blog



## ✅ 一次性准备步骤（在新电脑上操作）

### Step 1：安装 Hugo

1. 下载 Hugo 可执行文件：
    👉 https://github.com/gohugoio/hugo/releases
2. 选择 `hugo_extended_X.X.X_windows-amd64.zip`（不要选不带 extended 的和不要选 withdeploy。）
3. 解压后，把 `hugo.exe` 放入C:\Program Files（然后用cmd加入系统路径：setx PATH "%PATH%;C:\Program Files\hugo"）
4. 重新打开命令行（CMD / PowerShell），验证安装：

```
 hugo version
```

------

### Step 2：安装 Git（如未安装）

👉 https://git-scm.com/download/win #一路next即可

git --version

------

### Step 3：克隆你的博客仓库

打开 PowerShell 或 CMD，执行：

```
git clone https://github.com/haha077/blog.git
cd blog
```

> 📦 ***这一步会下载你博客的全部源码（含 `docs/` 输出目录），注意这一步非常重要，尤其是在一台新的设备上，这行命令会吧已发布的所有文章git下来，这样你后面push的时候，才不会丢失！切记***

------

## ✅ 每次写博客时的流程（可复用）

我的github博客是hugo → 生成到 docs/（非**`public/`**） → git push

每次新建文章只需cmd输入指令：hugo new posts/你的文章标题.md

然后用typora编辑就行（编辑完之后记得把draft的值改为false）

用如果要插入图片，直接把图片上传到图床，

```
![img](图片地址)
```

然后按上面格式插入即可

md文档写好之后，放入：C:\Program Files\hugo\blog\content\posts目录

然后构建站点：

```
 hugo
 或者用绝对路径
 "C:\Program Files\hugo\hugo.exe"
```

这会输出到 `docs/` 文件夹

1. 推送到 GitHub：

```
git add .
git commit -m "update blog"
git push
```

另外如果是首次还需要登录授权

git config --global user.name "haha077"
git config --global user.email "your_github_email@example.com"

等几分钟，访问博客查看：

👉 `https://haha077.github.io/blog/`



如果不想每次都手动输入指令，也可以按下面的脚本创建一个.bat

```
@echo off
chcp 65001

REM === 路径一定要加引号 ===
set "HUGO_EXE=C:\Program Files\hugo\hugo.exe"
set "BLOG_DIR=C:\Program Files\hugo\blog"
set http_proxy=http://127.0.0.1:10810
set https_proxy=http://127.0.0.1:10810

REM === 进入博客目录 ===
cd /d "%BLOG_DIR%"
if errorlevel 1 (
    echo 无法进入博客目录
    pause
    exit /b
)

REM === 构建 Hugo（输出到 docs） ===
"%HUGO_EXE%"
if errorlevel 1 (
    echo Hugo 构建失败
    pause
    exit /b
)

REM === Git 提交并推送 ===
git add .
git commit -m "update blog %date% %time%"
git push

echo.
echo 博客发布完成！
pause
```

++++++++++++++

markdown插入图片，本地与服务器同步显示（虚拟机版本）

https://haha077.github.io/blog/64eb5aef2743f81.png_e1080.jpg这样就能显示

但是./blog/static/image-20250708150018657-1751958525790-1.png这样就无法显示，只需定义好对应关系就行

1：首先是检查hugo.toml文件

在 `toml` 中添加或修改这一行：

```
toml
baseURL = "https://haha077.github.io/blog/"
```

2：✅ 正确图片引用方式（不需要写 static）

你的 Hugo 项目结构像这样：

```
arduino blog/
├── static/
│   └── image-xxx.png
├── content/
│   └── posts/
│       └── your-post.md
```

**在 Markdown 中你应该这样引用**：

```
markdown


 
![示意图](/blog/image-20250708150018657-1751958525790-1.png)
```

### ❗ 不能写成：

```
markdown ![×](/blog/static/image-2025xxxx.png) ❌
![×](./blog/static/xxxx.png) ❌
```

![image-20250718173932985](/blog/image-20250718173932985.png)

偏好设置的图片路径要设置为virtualbox和debian的共享文件夹的挂载路径，注意debian要打通和宿主机的文件夹共享，需要安装要virtualbox的增强包才行哦

![image-20250718174340680](/blog/image-20250718174340680.png)

然后再手动修改（）的图片路径格式为/blog/即可

这样git push后，就能正常显示图片了



# 备份博客

Hugo 是静态网站生成器，在 Debian 下备份 Hugo 博客（例如 `/home/debian/blog`）并转移到另一台主机，**只需要打包整个博客目录即可**。不需要数据库，所有内容都在文件里。

## 一、你应该备份的内容（完整博客源码）

只需打包 **博客源文件**，不需要打包 Hugo 生成的输出文件（即 `public/` 和 `docs/`，这两个通常是生成后的静态站点）。

### **推荐备份以下内容：**

- 所有内容，**排除 `public/` 和 `docs/`（如果是 GitHub Pages 用的也可以保留）**

### 建议目录结构打包如下：

```
cd /home/debian/blog
tar --exclude=public --exclude=docs -czvf blog-src.tar.gz *
```

这个命令说明：

- `--exclude=public`：不打包 Hugo 构建产物
- `--exclude=docs`：同上，很多人用于 GitHub Pages
- `*`：打包当前目录下所有源文件

这样可以确保你转移的是**可重建的博客源码**，而不是构建后的 HTML。

## 二、迁移后在新主机上使用

### 1. 安装 Hugo

```
sudo apt update
sudo apt install hugo
```

> 如果你之前用的是 Hugo 的 extended 版本（用于 SCSS），请告诉我，我可以给你 `.deb` 下载链接。

------

### 2. 解压博客文件

假设压缩包在 `/home/user/` 目录下：

```
cd /home/user
mkdir blog
tar -xzvf blog-src.tar.gz -C blog
cd blog
```
