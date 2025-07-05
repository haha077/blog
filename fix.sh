#!/bin/bash
# 替换 Typora Markdown 中的 Windows 本地路径为 Hugo 网站根路径 /blog/

echo "开始修复 Markdown 图片路径..."

# 遍历所有 .md 文件
find content/posts -type f -name "*.md" | while read file; do
    echo "处理文件: $file"

    # 替换 Windows 本地路径为 Hugo 路径
    sed -i 's#](C:\\Users\\Administrator\\Documents\\image\\#](/blog/#g' "$file"

    # 将所有 \ 替换为 /
    sed -i 's#\\#/#g' "$file"
done

echo "✅ 全部处理完成，图片路径已替换为 /blog/ 下格式"
