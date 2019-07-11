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
        items['product_price'] = response.css('.a-price-whole::text')[:5].extract()
        items['product_name'] = response.css('.a-color-base.a-text-normal::text')[:5].extract()
        items['product_link'] = response.css('a.a-link-normal.a-text-normal::attr(href)')[:5].extract()
        yield items
        