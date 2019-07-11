import scrapy
import yaml
from ..items import AmazonscrapperItem
class AmazonSpider(scrapy.Spider):
    data = yaml.safe_load(open("config.yml"))
    products_list = [x.replace(' ', '+') for x in data['products_list']]

    name = "amazonSpider"
    start_urls = []
    for product in products_list:
        start_urls.append(data['search_url']+product+"&ref=nb_sb_noss")

    def parse(self, response):
        items = AmazonscrapperItem()
        items['price'] = response.css('.a-price-whole::text').extract_first()
        items['product_name'] = response.css('#search > div.sg-row > div.sg-col-20-of-24.sg-col-28-of-32.sg-col-16-of-20.sg-col.s-right-column.sg-col-32-of-36.sg-col-8-of-12.sg-col-12-of-16.sg-col-24-of-28 > div > span:nth-child(4) > div.s-result-list.s-search-results.sg-row > div:nth-child(1) > div > div > div > div:nth-child(2) > div.sg-col-4-of-12.sg-col-8-of-16.sg-col-16-of-24.sg-col-12-of-20.sg-col-24-of-32.sg-col.sg-col-28-of-36.sg-col-20-of-28 > div > div:nth-child(1) > div > div > div:nth-child(1) > h2 > a > span::text').extract()
        yield items