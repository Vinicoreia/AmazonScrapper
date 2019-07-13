'use strict';
const axios = require('axios');
const cheerio = require('cheerio');
const yaml = require('js-yaml');
const fs = require('fs');


function getFile(){
    try{
        const urls = yaml.safeLoad(fs.readFileSync("./config.yml",'utf8'));
        return urls;
    }
    catch(e){
        console.log(e);
        return null;
    }
}

async function fetchProduct (url){
    const resp  = await axios.get(url);
    const $ = cheerio.load(resp.data);
    return  Promise.resolve({
                price: $("#priceblock_ourprice").text(),
                title: $("#productTitle").text().replace(/(\r\n|\n|\r)/gm, "").trim()
            })
}

const urlsList = getFile();