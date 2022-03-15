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
