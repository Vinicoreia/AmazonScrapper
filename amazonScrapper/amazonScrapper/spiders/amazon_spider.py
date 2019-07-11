import scrapy
import yaml
class AmazonSpider(scrapy.Spider):
    name = "amazonSpider"
    
    data = yaml.safe_load(open("config.yml"))
    products_list = [x.replace(' ', '+') for x in data['products_list']]
    start_urls = []
    for product in products_list:
        start_urls.append(data['search_url']+product+"&ref=nb_sb_noss")

    for i in start_urls:
        print(i)
    def parse(self, response):
        price = response.css('.a-price-whole::text').extract_first()
        yield {'price': price}