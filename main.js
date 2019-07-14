const Scraper = require('./Scraper');



const scrap = new Scraper();
scrap.fetchProduct().then(p => console.log(p))