+++
date = '2026-10-24T11:27:39+08:00'
draft = false
title = '用虚拟显示器节省购买显卡欺骗器的钱'

+++

由于某些场景，日常server只需要用uu远程访问，不需要接显示器，rtx显卡不接显示器会罢工不工作，以前的做法是购买一个显卡欺骗器，下面是直接通过软件的方案实现无需购买任何多余东西



1：安装VDDhttps://github.com/VirtualDrivers/Virtual-Display-Driver

2：主板要开启4g enable那个选项

一般完成1,2步然后重启后，就能正常工作了，如果不行，再执行下面的3后再重启

3：解除 Windows 的多卡资源限制（修改注册表）

Windows 偶尔会限制非主显卡（仅用于计算或挖矿/渲染的副卡）加载特定的显示驱动。

1. 按下 `Win + R` 输入 `regedit` 打开注册表。

2. 导航至：`HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Class\{4d36e968-e325-11ce-bfc1-08002be10318}`

3. 展开后会看到 `0000`、`0001`、`0002` 等子项，它们分别对应你的 3 张显卡和虚拟显卡。

   依次点击这些子项，检查右侧的 `DriverDesc` 确认对应哪张卡

4. **添加强制值**：

   - 在右侧的空白处**右键点击** -> 选择 **新建** -> 选择 **DWORD (32 位)值**。
   - 将该新建的值重命名为以下常见修复名称（请根据您的驱动说明决定，若为解除副卡显示限制，通常输入）：
     `DisplayNotSupported` 或 `AdapterType` 或 `GridLicensedFeatures`
   - 双击这个新创建的值，将“数值数据”修改为 `0`（有些项目如多卡混合强制渲染则需设为 `1`），基数选择 **十六进制**。

------
