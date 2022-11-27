const puppeteer=require('puppeteer');

  setInterval(() => {
    runTest()
  }, 10000);



async function runTest() {
  const browser = await puppeteer.launch({headless:false})
  const page = await browser.newPage()
  
  const navigationPromise = page.waitForNavigation()
  
  await page.goto('https://termine.moenchengladbach.de/')
  
  await page.setViewport({ width: 1920, height: 969 })
  
  //await page.type('.TEVISWEB', 'undefined')
  
  //await page.type('.TEVISWEB > #cookie_msg > span', 'undefined')
  
  await page.type('#cookie_msg_btn_yes', 'Akzeptieren')
  
  await page.waitForSelector('#cookie_msg_btn_no')
  await page.click('#cookie_msg_btn_no')

  //cookie_msg_btn_yes "akzeptieren";
  
  await page.waitForSelector('.container > .content > .button_container > a:nth-child(4) > .sel_button')
  await page.click('.container > .content > .button_container > a:nth-child(4) > .sel_button')
  
  await navigationPromise
  
  await page.waitForSelector('.row:nth-child(1) > .input-number-control > .input-group-btn:nth-child(3) > .btn > .glyphicon')
  await page.click('.row:nth-child(1) > .input-number-control > .input-group-btn:nth-child(3) > .btn > .glyphicon')
  
  await page.waitForSelector('.container > .content > .button_container > #cnc-select-form > .pull-right')
  await page.click('.container > .content > .button_container > #cnc-select-form > .pull-right')
  
  await navigationPromise
  
  await page.waitForSelector('.TEVISWEB > .container > .content > h1')
  await page.click('.TEVISWEB > .container > .content > h1')
  var result=await page.$eval("body > div.container.wrapper > div.content.content--mdt > h1",el=>el.textContent);
  console.log(result)
  if (result=="Kein freier Termin verfügbar1") {
    //await browser.close();
  } else {
    notifier.notify("fis")
  }
 
  return result;
};

/*(async () => {
  const browser = await puppeteer.launch({headless:false})
  const page = await browser.newPage()
  
  const navigationPromise = page.waitForNavigation()
  
  await page.goto('https://termine.moenchengladbach.de/')
  
  await page.setViewport({ width: 1920, height: 969 })
  
  //await page.type('.TEVISWEB', 'undefined')
  
  //await page.type('.TEVISWEB > #cookie_msg > span', 'undefined')
  
  await page.type('#cookie_msg_btn_yes', 'Akzeptieren')
  
  await page.waitForSelector('#cookie_msg_btn_no')
  await page.click('#cookie_msg_btn_no')

  //cookie_msg_btn_yes "akzeptieren";
  
  await page.waitForSelector('.container > .content > .button_container > a:nth-child(4) > .sel_button')
  await page.click('.container > .content > .button_container > a:nth-child(4) > .sel_button')
  
  await navigationPromise
  
  await page.waitForSelector('.row:nth-child(1) > .input-number-control > .input-group-btn:nth-child(3) > .btn > .glyphicon')
  await page.click('.row:nth-child(1) > .input-number-control > .input-group-btn:nth-child(3) > .btn > .glyphicon')
  
  await page.waitForSelector('.container > .content > .button_container > #cnc-select-form > .pull-right')
  await page.click('.container > .content > .button_container > #cnc-select-form > .pull-right')
  
  await navigationPromise
  
  await page.waitForSelector('.TEVISWEB > .container > .content > h1')
  await page.click('.TEVISWEB > .container > .content > h1')
  var test=await page.$eval("body > div.container.wrapper > div.content.content--mdt > h1",el=>el.textContent);
  console.log(test)
  if (test=="Kein freier Termin verfügbar") {
    console.log(test);
    await page.bringToFront();
    //await browser.close();
  }else{
    console.log("success");
  }
  
})();*/

/*(async ()=>{
    
const browser=await puppeteer.launch({headless:false});
const page=await browser.newPage();
await page.goto("https://www.google.com");

await page.waitForSelector("#L2AGLb > div");
await page.click("#L2AGLb > div");
await page.type(".gLFyf","test");
await page.keyboard.press('Enter');

})();*/

/*(async ()=>{
const browser = await puppeteer.launch({headless:false})
const page = await browser.newPage()
const navigationPromise = page.waitForNavigation()

await page.goto('https://termine.moenchengladbach.de/')
debugger;
await page.setViewport({ width: 1920, height: 969 })

await page.waitForSelector('.container > .content > .button_container > a:nth-child(4) > .sel_button')
await page.click('.container > .content > .button_container > a:nth-child(4) > .sel_button')

//await navigationPromise

await page.waitForSelector('#cnc-g-9 > .row:nth-child(1) > .input-number-control > .cnc-plus > .btn')
await page.click('#cnc-g-9 > .row:nth-child(1) > .input-number-control > .cnc-plus > .btn')

await page.waitForSelector('.container > .content > .button_container > #cnc-select-form > .pull-right')
await page.click('.container > .content > .button_container > #cnc-select-form > .pull-right')

//await navigationPromise

await page.waitForSelector('.TEVISWEB > .container > .content > h1')
await page.click('.TEVISWEB > .container > .content > h1')

await browser.close()
     
    })();*/


    