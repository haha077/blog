+++
date = '2025-07-11T04:20:23-04:00'
draft = false
title = '给virtualbox下debian系统安装增强包实现文件与宿主机共享'
+++

在 Debian 系统中安装 **VirtualBox 增强功能（Guest Additions）**，可以带来如下好处：

- 自动调整分辨率
- 剪贴板共享（主机与虚拟机之间）
- 拖放文件支持
- 更好的鼠标集成
- 共享文件夹功能

### ✅ 1. 安装依赖包

打开虚拟机中的终端，运行：

```
bash复制代码sudo apt update
sudo apt install build-essential dkms linux-headers-$(uname -r)
```

------

### ✅ 2. 插入 Guest Additions 光盘

在 VirtualBox 菜单栏中（**虚拟机运行时**）：

> 设备（Devices） > 安装增强功能（Insert Guest Additions CD Image）

在纯命令行下，输入

lsblk 

ls /media

 ls /media/$USER

验证后，一般从输出可以看出：

- 虚拟光驱设备 `/dev/sr0` 已存在，大小为 `58.5M`，说明增强功能镜像已经成功加载。
- 但 **没有自动挂载到 `/media/` 下任何位置**（`/media/debian` 目录不存在），所以你看到 `cdrom0` 是空的。

## ✅ 解决方法：手动挂载增强功能光盘

请按以下步骤操作：

### 🔧 Step 1: 创建挂载点

```
bash


复制代码
sudo mkdir -p /mnt/cdrom
```

### 🔧 Step 2: 挂载 CD 镜像

```
bash


复制代码
sudo mount /dev/sr0 /mnt/cdrom
```

如果提示只读文件系统，可忽略。

### 🔧 Step 3: 安装增强功能

```
bash复制代码cd /mnt/cdrom
ls  # 确认里面有 VBoxLinuxAdditions.run
sudo ./VBoxLinuxAdditions.run
```

## 将当前用户加入 `vboxsf` 组（**非常关键**）

默认 VirtualBox 会把共享文件夹挂载成 `vboxsf` 用户组可访问，如果你不是这个组成员，就看不到内容：

```
bash


复制代码
sudo usermod -aG vboxsf $USER
```

然后**必须重启虚拟机**或重新登录：

```
bash


复制代码
reboot
```

这样配置完之后，就可以在virtualbox配置共享文件夹了

![image-20250711163408358](/blog/image-20250711163408358.png)
