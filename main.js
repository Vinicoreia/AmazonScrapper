const Scraper = require('./Scraper');

const scrap = new Scraper();
scrap.printUrls();
// scrap.fetchProduct();



function crawlInterval(intervalTime, timeOutTime){
    const timer = setInterval(() =>{
        scrap.fetchProduct();
        //save file to a json (need more info)
        // creates graph from file
    }, intervalTime);
    setTimeout(()=>{
        clearInterval(timer);
        scrap.printProducts();
    }, timeOutTime)
}


crawlInterval(5000, 60000)