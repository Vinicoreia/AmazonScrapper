'use strict';
const axios = require('axios');
const cheerio = require('cheerio');
const yaml = require('js-yaml');
const fs = require('fs');

class Scraper{
    constructor(path = "./config.yml"){
        this.path = path;
        try{
            this.urls = yaml.safeLoad(fs.readFileSync(this.path,'utf8'));
        }
        catch(e){
            return null;
        }
    }

    printUrls(){
        for(const url of this.urls.products_url){
            console.log(url);
        }
    }

    async fetchProduct (urls){
        const products = [];
        for(const url of urls){
            const resp  = await axios.get(url);
            const $ = cheerio.load(resp.data);
            products.push(
                {
                    price: $("#priceblock_ourprice").text(),
                    title: $("#productTitle").text().replace(/(\r\n|\n|\r)/gm, "").trim()
                }
            );
        }
        return products;
    }
}
module.exports = Scraper;