# Requests库和xpath笔记
## Requests安装

``` python
pip install requests -i https://mirrors.aliyun.com/pypi/simple
```
## 核心函数
- `requests.requests()` 所有请求方法的基本方法
  - method:str 指定请求方法, GET, POST, PUT, DELETE
  - url:str 请求的资源接口（API）,在RESTful规范中即是URI
  - params:dict, 用于GET请求的查询参数(Query String Params)
  - data:dict, 用于POST/PUT/DELETE请求的表单参数(Form Data)
  - json:dict, 用于上传json数据的参数， 封装到body（请求体）中。请求头的Content-Type默认设置为 application/json
  - files:dict, 结构{'name':file-like-object|tuple}，如果是tuple，则有三种情况:
    - ('filename', file-like-object)
    - ('filename', file-like-object, content_type)
    - ('filename', file-like-object, content_type, custom-headers)
    指定files用于上传文件，一般使用POST请求， 默认请求头的Content-Type为`multipart/form-data`类型
  - headers/cookies:dict
  - proxies:dict, 设置代理
  - auth:tuple, 用于授权的用户名和口令,形式{'username', 'pwd'}
  
- `requests.get()` 发起GET请求， 查询参数
  - 可用参数
    - url
    - params
    - json
    - headers/cookies/auth
  
- `requests.post()`发起POST请求， 上传/添加数据
  - 可用参数:
    - url
    - data/files
    - json
    - headers/cookies/auth
  
- `requests.put()`发起PUT请求， 修改或更新数据

- `requests.patch()` HTTP幂等性的问题，可能会出现重复，不推荐使用

- `requests.delete()` 发起delete请求，删除数据 

## requests.Response

  以上的请求方法返回的对象类型是Response，对象常用的属性如下

  - status_code 响应状态码
  - url 请求的url
  - headers:dict, 响应的头，对应于urllib的响应对象的getheaders()， 但不包含cookie
  - cookies：可迭代的对象， 元素是Cookie类对象 (name, value, path)
  - text: 响应的文本信息
  - content: 响应的字节数据
  - encoding:响应数据的编码字符集， 如utf-8, gbk, gb2312
  - json():如果响应数据类型为application/json， 则将响应的数据进行反序列化python得List或者dict对象(javascripte序列化和反序列化是JSON.stringify(obj)和JSON.parse(text))
  - 

# 数据解析方法之xpath
> xpath 属于xml/html解析数据的一种方式，基于元素的树形结构(Node > Element)。选择某一元素时，根据元素的路径选择， 如`/hmtl/head/title`获取`<title>`标签。安装包`pip install lxml`

## 绝对路径
从根标签开始，按照tree结构依次向下查询

如`/html/body/table/tbody/tr`。
## 相对路径
相对路径可以有以下写法
- 相对于整个文档
```
//img
```
查找出文档中所有的`<img>`标签
- 相对于当前节点
```
//table
```
假如当前节点是`<table>`，查找他的`<img>`的路径的写法
```
.//img
```
## 数据提取
- 提取文本
```
//title/text()
```
- 提取属性
```
//img/@href
```
- 提取指定位置的元素
获取网页中的数据类型与字符集，获取第一个`<meta>`标签
```
//meta[1]/@content
```
获取最后一个`<meta>`标签
```
//meta[last()]/@content
```
获取倒数第二个`<meta>`标签
```
//meta[position()-2]/@content
```
获取前三个`<meta>`标签
```
//meta[position()<3]/@content
```
## 指定属性条件
查找class为`circle-img`的`<img>`标签
```
//img[@class="circle-img"]
```
## 在python 中的应用
安装包`pip install lxml`

## selenium

导入

from selenium import webdriver

创建谷歌浏览器操作对象

path = 谷歌浏览器驱动文件路径()

browser = webdriver.Chrome(path)

访问网址

url = 要访问的网址

browser.get(url)

元素定位

find_element_by_id

find_elements_by_name

find_elements_by_xpath

find_elements_by_tag_name

find_elements_by_class_name

find_elements_by_css_selector

find_elements_by_link_text

访问元素信息

获取元素属性 get_attribute('class')

获取元素文本 .text

获取id .id

获取标签名 .tag_name

交互

点击 click()

输入 send_keys()

模拟js滚动 

var q = document.documentElement.scrollToTop()

execute_script() 执行js代码

获取网页代码

page_source 

原因；由于网页中有ajax的异步执行的js，导致driver.get()之后查找元素到NoSuchElementError

网页异步ajax的解决方法

导包 from  selenium.webdriver.common.by import By

from selenium.webdriver.support import ui

from selenium.webdriver.support import expected_conditions as EC

等待某一个Element出现为止，否则一直阻塞下去，不过可以设置一个超时时间

ui.WebDriverWait(driver,60).until(EC.visibility_of_all_elements_located((By.CLASS_NAME, 'soupage')))



switch 的用法

原因：当页面中出现对话框alert或者内嵌I窗口iframe，如果查找的元素节点在alert或iframe的话，需要切入到alert中或iframe中

解决：1.查找iframe标签对象 iframe=driver.find_element_by_id('login_frame')

2.切换到iframe中 driver.switch_to.frame(iframe)

退出

driver.quit()

# scrapy 笔记

## 1. scrapy 安装

pip 安装

``` pip install Scrapy```

或者 conda 安装

``` conda install -c conda-forge scrapy```

## 2. Scrapy的结构和流程

scrapy 官方给出的架构图

<img src="https://upload-images.jianshu.io/upload_images/14946794-c32c1356bb94c85c.jpg?imageMogr2/auto-orient/strip|imageView2/2/w/700/format/webp" alt="img" style="zoom:80%;" />

| 各部分名称              |                          功能                           |       是否需要实现 |
| ----------------------- | :-----------------------------------------------------: | -----------------: |
| Scrapy Engine           |           负责数据和信号在不同模块之间的传递            |     scrapy已经实现 |
| Scheduler               |       一个负责存放引擎发送过来的reques请求的队列        |     scrapy已经实现 |
| Downloader              |          下载引擎发送过来的请求，并返回给引擎           |     scrapy已经实现 |
| Spider                  | 处理引擎发送过来的response，提取数据和url，并发送给引擎 |       需要自己实现 |
| Item Pipeline           |         处理引擎发送过来的数据，比如存到数据库          | 根据自己的需求实现 |
| Downloader Middlewares  |         可以自定义下载，设置代理，设置请求头等          | 根据自己的需求实现 |
| Spider MiddlewareSpider |          可以自定义requests请求和response过滤           | 根据自己的需求实现 |

scrapy的整体执行流程

> 1. Spider的```yield```将request发送给Engine
>
> 2. Engine对request不做任何处理发送给Scheduler
> 3. Scheduler生成request交给Engine
> 4. Engine拿到request，通过Middleware发送给Downloader
> 5. Downloader在获取到response之后，又经过Middleware发送给Engine
> 6. Engine在拿到response之后，返回给Spider，Spider的```parse()```方法对获取到的response进行处理，解析出items或者requests
> 7. 将解析出的items或者requests发送给Engine
> 8. Engine获取到items或者requests，将items发送给ItemPipeline，将requests发送给Scheduler

## 3. Scrapy的基本概念

### 3.1 命令行工具

命令行工具是在控制台输入的Scrapy命令

#### 配置设置

Scrapy的配置搜索顺序

1. ```/etc/scrapy.cfg``` 或者 ```c:\scrapy\scrapy.cfg```（操作系统范围)
2. ```~/.config/scrapy.cfg($XDG_CONFIG_HOME)```和```~/.scrapy.cfg($HOME)```（全局设置）
3. ```scrapy.cfg```（项目内的根目录）

用户自定义的值会比系统范围的默认值以及项目方位的值优先级高

Scrapy也通过环境变量配置

* SCRAPY_SETTINGS_MODULE (see Designating the settings)
* SCRAPY_PROJECT (see Sharing the root directory between projects)
* SCRAPY_PYTHON_SHELL (see Scrapy shell)

#### 默认的项目结构

```shell
scrapy.cfg
myproject/
    __init__.py
    items.py
    middlewares.py
    pipelines.py
    settings.py
spiders/
    __init__.py
    spider1.py
    spider2.py
    ...
```

``` python
### xpath.py
import requests
from lxml import etree

class ParseError(Exception):
    pass

class RequestError(Exception):
    pass

def get(url):
    resp = requests.get(url)
    if resp.status_code == 200:
        parse(resp.text)

    else:
        raise RequestError('请求失败')

def parse(html):
    root = etree.HTML(html)
    divs = root.xpath('//div[@class="li-itemmod"]')
    for div in divs:
        cover_url = div.xpath('.//img/@src').extract()[0]
        title = div.xpath('.//h3/a/text()').extract()[0]
        print(cover_url, title)

if __name__ == '__main__':
    get('http://shanghai.anjuke.com/community/?from=navigation')

```



