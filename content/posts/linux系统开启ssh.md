+++
date = '2025-07-02T00:01:45-04:00'

draft = false

title = 'Linux系统开启ssh'

+++

如果提示访问被拒绝

sudo nano /etc/ssh/sshd_config

确保以下几项

PubkeyAuthentication yes   # 允许公钥认证（默认开启）
PasswordAuthentication yes  # 允许密码登录（必须设为 yes）
ChallengeResponseAuthentication yes  # 允许交互式认证（可选）
