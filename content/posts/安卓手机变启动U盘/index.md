+++
date = '2026-08-07T17:55:34+08:00'
draft = false
title = '安卓手机变启动U盘'

+++

1：必须有root权限



2：用DriveDroid.apk安装好设定一个文件夹，然后后面直接直接跳过引导

3：**在 DriveDroid 创建空白镜像**

- 打开 DriveDroid → 右下角红色 + → **Create blank image**

1. **挂载为可写 USB**
   - 点击刚创建的空白镜像
   - 选择 **Writable USB**（可写 USB 模式，图标通常是不带锁的 USB）
   - 用数据线连接手机到电脑，电脑会识别出一个新的 U 盘
2. **在电脑上安装 Ventoy**
   - 运行 Ventoy2Disk.exe（以管理员身份）
   - 设备列表中选择刚才识别出的手机虚拟 U 盘（**一定要确认盘符正确，别选错真实硬盘**）
   - 点击 **安装**（Install）
   - 分区方案建议选 **MBR**（老电脑兼容好）或 **GPT**（新电脑 UEFI 优先）
   - 安装完成后，虚拟 U 盘会分成 Ventoy 分区（大）和 EFI 分区
3. **复制 pe.iso**
   - 打开 Ventoy 的大分区（exFAT 或 NTFS）
   - 直接把 pe.iso 复制进去（可以放在根目录或任意文件夹）
   - 复制完成后，在电脑上安全弹出该磁盘
4. **手机端卸载（eject）镜像**
   - 回到 DriveDroid，点击已挂载的镜像，选择卸载/停止

### 后续使用方法

1. 打开 DriveDroid → 点击 ventoy.img → 选择 **USB** 模式挂载（只读即可）
2. 用数据线连接目标电脑
3. 重启电脑，进入 Boot Menu（F12 / F10 / Esc 等），选择手机对应的启动项
4. 进入 Ventoy 菜单后，选择 pe.iso 启动即可进入 PE

### 注意事项

- **Secure Boot**：如果启动失败，进入 BIOS 临时关闭 Secure Boot。
- **挂载模式**：如果 USB 模式启动不了，可尝试 CD-ROM 模式（少数情况）。
- **更新 ISO**：以后想加其他系统镜像，重新挂载为 Writable USB，直接复制新 ISO 进去即可，无需重新安装 Ventoy。
- **备份**：操作前建议备份手机重要数据。

按这个流程做完后，你的 Nexus 5X 就成为随身携带的 Ventoy 多启动盘了。
