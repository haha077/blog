#!/bin/bash
# 替换 Typora Markdown 中的 Windows 本地路径为 Hugo 能识别的路径

echo "开始修复 Markdown 图片路径..."

# 遍历所有 .md 文件
find content/posts -type f -name "*.md" | while read file; do
    echo "处理文件: $file"

    # 备份原文件
    cp "$file" "$file.bak"

    # 替换 Windows 路径为 Hugo 路径
    sed -i 's#](C:\\\\Users\\\\Administrator\\\\Documents\\\\image\\\\#](/images/#g' "$file"

    # 去掉路径末尾的 \ 替换为 /
    sed -i 's#\\#/#g' "$file"
done

echo "全部处理完成 ✅"
