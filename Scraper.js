'use strict';
const axios = require('axios');
const cheerio = require('cheerio');
const yaml = require('js-yaml');
const fs = require('fs');

class Scraper{
    constructor(path = "./config.yml"){
        this.config = {headers:{"User-agent":"Mozilla/5.0 (Windows NT 5.1; rv:11.0) Gecko Firefox/11.0 (via ggpht.com GoogleImageProxy)"}}
        this.path = path;
        this.products = {}
        try{
            this.urls = yaml.safeLoad(fs.readFileSync(this.path,'utf8'));
            Object.keys(this.urls).map(item => this.products[item]={title:'', prices:[], minPrice: 9999999999})
        }
        catch(e){
            return null;
        }
    }

    printUrls(){
        console.log(this.urls)
    }
    printProducts(){
        console.log(this.products)
    }

    async fetchProduct (){
        for(const url of Object.keys(this.urls)){
            const resp  = await axios.get(this.urls[url], this.config);
            const $ = cheerio.load(resp.data);
            const price = parseFloat($("#priceblock_ourprice").text().replace(",", "."));
            const title = $("#productTitle").text().replace(/(\r\n|\n|\r)/gm, "").trim();
            this.products[url].title = title;
            this.products[url].prices.push(price);
            if(price < this.products[url].minPrice)
                this.products[url].minPrice = price;
        }
    }
}
module.exports = Scraper;