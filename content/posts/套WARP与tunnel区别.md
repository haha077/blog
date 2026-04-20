+++
title = "套 WARP 和 Cloudflare Tunnel 区别"
draft = false
date = 2026-02-02
+++

https://gitlab.com/fscarmen/warp  #vps上安装这个项目一键脚本安装

`wget -N https://gitlab.com/fscarmen/warp/-/raw/main/menu.sh && bash menu.sh`

选2 Chinese，然后选13（安装 wireproxy，让 WARP 在本地创建一个 socks5 代理 (bash menu.sh w)

完成后脚本会自动：

- 下载wireproxy二进制（Go编译，无需apt）。
- 注册WARP账号。
- 生成WireGuard conf。
- 启动SOCKS5代理（默认127.0.0.1:40000，或提示端口）。

<!--再次运行用 warp [option] [lisence]，如 warp h (帮助菜单） warp n (获取 WARP IP) warp o (临时warp开关) warp u (卸载 WARP 网络接口和 Socks5 Client) warp b (升级内核、开启BBR及DD) warp v (同步脚本至最新版本) warp r (WARP Linux Client 开关) warp 4/6 (WARP IPv4/IPv6 单栈) warp d (WARP 双栈) warp c (安装 WARP Linux Client，开启 Socks5 代理模式) warp l (安装 WARP Linux Client，开启 WARP 模式) warp i (更换支持 Netflix 的IP) warp e (安装 Iptables + dnsmasq + ipset 解决方案) warp w (安装 WireProxy 解决方案) warp y (WireProxy socks5 开关) warp k (切换 wireguard 内核 / wireguard-go-reserved) warp g (切换 warp 全局 / 非全局) warp s 4/6/d (优先级: IPv4 / IPv6 / VPS default)-->

最后记得直接改Xray config.json的outbounds加socks到这个端口，routing国外走warp（如之前说的）

### 1. 什么是“双栈” (Dual Stack)？

简单来说，**双栈就是同时拥有 IPv4 和 IPv6 地址。**

- **只选 IPv4**：你的 VPS 访问外网时，看起来只有一个 WARP 的 IPv4 地址。如果目标网站只支持 IPv6，你就无法访问。
- **双栈 (IPv4 + IPv6)**：你的 VPS 同时获得一个 WARP 的 IPv4 和一个 IPv6。
  - **优势**：你可以访问纯 IPv6 的资源（比如某些教育网资源、特定的 PT 站），更重要的是，它可以完美**解锁 Netflix/ChatGPT**。这些服务有时会检查你的 IPv6 地址来判断你的真实位置，双栈的伪装效果更好。

------

### 2. 应该怎么选？

**强烈建议选：双栈 (Dual Stack)**。

即使你的 RackNerd VPS 原生只有 IPv4，WARP 也能为你虚拟出一个 IPv6 隧道。这对于绕过 Google 验证码和解除流媒体锁区非常有帮助。

最终完成后，效果如下图：

![img](https://i.imgur.com/YAn1LCK.png)

| 你的核心目标           | 更合适的方案 |
| ---------------------- | ------------ |
| 隐藏 VPS 出口 IP       | **WARP**     |
| 隐藏 VPS 入口 IP       | **Tunnel**   |
| 抗扫描 / 不暴露端口    | **Tunnel**   |
| 减少风控（像普通用户） | **WARP**     |
| 稳定性优先             | **Tunnel**   |
| 封号风险最低           | **Tunnel**   |
| 追求“伪装感”           | **WARP**     |
| 长期跑                 | **Tunnel**   |



# 二、本质差异（非常关键）

### 🟦 WARP 是什么？

> **“给 VPS 套一个 Cloudflare 的加密出口”**

- 改变的是 **出口**
- 不改变入口
- Xray 仍然暴露 443（或被扫）

### 🟧 Cloudflare Tunnel 是什么？

> **“让 VPS 主动连 Cloudflare，不开任何公网端口”**

- 改变的是 **入口**
- 出口仍然是 VPS（除非你再套 WARP）

# 三、结构对比（你一眼就懂）

### ① 套 WARP

```
你
 ↓
Xray（Reality / XHTTP）
 ↓
VPS
 ↓
WARP
 ↓
目标网站（Cloudflare IP）
```

- IP 查询：Cloudflare
- VPS 真实 IP：**隐藏**
- 端口：**暴露**

------

### ② Cloudflare Tunnel

```
你
 ↓
Cloudflare
 ↓
Tunnel
 ↓
Xray（127.0.0.1）
 ↓
目标网站（VPS IP）
```

- IP 查询：VPS
- VPS 真实 IP：**不暴露入口**
- 端口：**0 暴露**