#!/bin/bash
# 将旧路径改为 /blog/xxx.png

find content/posts -name "*.md" | while read file; do
    echo "修复: $file"
    sed -i -E 's#\]\(C:\\Users\\.*\\Documents\\image\\([^)]*)\)#](https://haha077.github.io/blog/\1)#g' "$file"
    sed -i 's#\\#/#g' "$file"
done
