+++
date = '2025-07-03T04:27:59-04:00'
draft = false
title = 'nic.eu.org注册域名与绑定cloudflare dns解析'

+++

1：注册账号

2：登录，左上角new domain进入注册域名

3：![image-20250703152231793](https://haha077.github.io/blog/image-20250703152231793.png)填入自己需要的，点击回车确认是否被注册

4：添加ns服务器

![免费申请注册eu.org二级域名](https://haha077.github.io/blog/64eb5aef2743f81.png_e1080.jpg)

登录cloudflare，把刚才那个需要注册的域名添加到cf的站点上，把cf的ns服务器填写到https://nic.eu.org/的name1和name2那里，然后可以提交submit注册了，像下面这样就是提交成功的

![image-20250703151231291](https://haha077.github.io/blog/image-20250703151231291.png)

5：接下来就是耐心等待cf的邮件确认和nic的审核。通常nic审核会比较久……
