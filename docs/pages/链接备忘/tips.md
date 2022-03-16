# 备忘

## windows终端设置代理
解决github不能正常使用，npm以及pip等包管理软件不能从国外站点下载的问题

1. powershell

```
$env:HTTPS_PROXY="http://127.0.0.1:1080"

$env:HTTP_PROXY="http://127.0.0.1:1080"

$env:all_proxy="socks5://127.0.0.1:1081"
```
2. cmd
```
set http_proxy=http://127.0.0.1:1080

set https_proxy=http://127.0.0.1:1080
```
