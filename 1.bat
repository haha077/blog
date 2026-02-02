@echo off
chcp 65001

REM === 路径一定要加引号 ===
set "HUGO_EXE=C:\Program Files\hugo\hugo.exe"
set "BLOG_DIR=C:\Program Files\hugo\blog"
set http_proxy=http://127.0.0.1:10810
set https_proxy=http://127.0.0.1:10810

REM === 进入博客目录 ===
cd /d "%BLOG_DIR%"
if errorlevel 1 (
    echo 无法进入博客目录
    pause
    exit /b
)

REM === 构建 Hugo（输出到 docs） ===
"%HUGO_EXE%"
if errorlevel 1 (
    echo Hugo 构建失败
    pause
    exit /b
)

REM === Git 提交并推送 ===
git add .
git commit -m "update blog %date% %time%"
git push

echo.
echo 博客发布完成！
pause
