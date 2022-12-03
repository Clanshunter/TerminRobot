const express=require("express")
const puppeteer = require('puppeteer');
const notifier = require('node-notifier');
var delay = 20000;
var countBeratung = 0;
var countAntrag = 0;
var countUnterlagen = 0;


setInterval(() => {
  testBratung()
  countBeratung++;
}, delay);

setInterval(() => {testAntrag();countAntrag++;}, delay + 7500);

setInterval(() => { testUnterlagen(); countUnterlagen++; }, delay + 16000);


async function testBratung() {
  try {
    const browser = await puppeteer.launch({ headless: false, slowMo: 40, })
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
    await page.screenshot({ path: "pic/" + countBeratung + "Beratung.jpg", fullPage: true })
    var result = await page.$eval("body > div.container.wrapper > div.content.content--mdt > h1", el => el.textContent);


    if (result == "Kein freier Termin verfügbar") {
      await navigationPromise
      await page.screenshot({ path: 'pic/beratung/kein/' + countBeratung + 'KeinFrei.jpg', fullPage: true });
      await browser.close();
    } else {

      notifier.notify(
        {
          title: 'Termin Available Beratung',
          message: 'Hello from node, Mr. User!',
          sound: true, // Only Notification Center or Windows Toasters
          wait: false // Wait with callback, until user action is taken against notification, does not apply to Windows Toasters as they always wait or notify-send as it does not support the wait option
        },)
      await page.screenshot({ path: 'pic/frei/' + countBeratung + 'Termin.jpg', fullPage: true });
    }
  } catch (error) {
    console.log(error);
  }

};

async function testAntrag() {
  try {
    const browser = await puppeteer.launch({ headless: false, slowMo: 50 })
    const page = await browser.newPage()
    const navigationPromise = page.waitForNavigation()

    await page.goto('https://termine.moenchengladbach.de/')

    await page.setViewport({ width: 1920, height: 969 })
    //await page.type('.TEVISWEB', 'undefined')
    //await page.type('.TEVISWEB > #cookie_msg > span', 'undefined')
    //await page.type('#cookie_msg_btn_yes', 'Akzeptieren')

    await page.waitForSelector('#cookie_msg_btn_no')
    await page.click('#cookie_msg_btn_no')

    await page.waitForSelector('.container > .content > .button_container > a:nth-child(4) > .sel_button')
    await page.click('.container > .content > .button_container > a:nth-child(4) > .sel_button')

    await navigationPromise

    await page.waitForSelector('.row:nth-child(2) > .input-number-control > .input-group-btn:nth-child(3) > .btn > .glyphicon')
    await page.click('.row:nth-child(2) > .input-number-control > .input-group-btn:nth-child(3) > .btn > .glyphicon')

    await page.waitForSelector('.container > .content > .button_container > #cnc-select-form > .pull-right')
    await page.click('.container > .content > .button_container > #cnc-select-form > .pull-right')

    await navigationPromise

    await page.waitForSelector('.TEVISWEB > .container > .content > h1')
    await page.click('.TEVISWEB > .container > .content > h1')
    await page.screenshot({ path: "pic/" + countAntrag + "Antrag.jpg", fullPage: true })
    var result = await page.$eval("body > div.container.wrapper > div.content.content--mdt > h1", el => el.textContent);


    if (result == "Kein freier Termin verfügbar") {
      await navigationPromise
      await page.screenshot({ path: 'pic/antrag/kein/' + countAntrag + 'KeinFrei.jpg', fullPage: true });
      await browser.close();
    } else {

      notifier.notify(
        {
          title: 'Termin Available',
          message: 'Hello from node, Mr. User!',
          sound: true, // Only Notification Center or Windows Toasters
          wait: true // Wait with callback, until user action is taken against notification, does not apply to Windows Toasters as they always wait or notify-send as it does not support the wait option
        },)
      await page.screenshot({ path: 'pic/antrag/frei/' + countAntrag + 'Termin.jpg', fullPage: true });
    }
  } catch (error) {
    console.log(error);
  }

}

async function testUnterlagen() {
  const browser = await puppeteer.launch({ headless: false, slowMo: 50 })
  const page = await browser.newPage()
  const navigationPromise = page.waitForNavigation()
  await page.goto('https://termine.moenchengladbach.de/')
  await page.setViewport({ width: 1920, height: 969 })
  await page.waitForSelector('#cookie_msg_btn_no')
  await page.click('#cookie_msg_btn_no')
  await page.waitForSelector('.container > .content > .button_container > a:nth-child(4) > .sel_button')
  await page.click('.container > .content > .button_container > a:nth-child(4) > .sel_button')
  await navigationPromise
  await page.waitForSelector('.row:nth-child(3) > .input-number-control > .input-group-btn:nth-child(3) > .btn > .glyphicon')
  await page.click('.row:nth-child(3) > .input-number-control > .input-group-btn:nth-child(3) > .btn > .glyphicon')
  await page.waitForSelector('.container > .content > .button_container > #cnc-select-form > .pull-right')
  await page.click('.container > .content > .button_container > #cnc-select-form > .pull-right')
  await navigationPromise
  await page.waitForSelector('.TEVISWEB > .container > .content > h1')
  await page.click('.TEVISWEB > .container > .content > h1')
  await page.screenshot({ path: 'pic/' + countUnterlagen + 'Unterlagen.jpg', fullPage: true })
  var result = await page.$eval("body > div.container.wrapper > div.content.content--mdt > h1", el => el.textContent);


  if (result == "Kein freier Termin verfügbar") {
    await navigationPromise
    await page.screenshot({ path: 'pic/unterlagen/kein/' + countUnterlagen + 'KeinFrei.jpg', fullPage: true });
    await browser.close();
  } else {

    notifier.notify(
      {
        title: 'Termin Available',
        message: 'Hello from node, Mr. User!',
        sound: true, // Only Notification Center or Windows Toasters
        wait: true // Wait with callback, until user action is taken against notification, does not apply to Windows Toasters as they always wait or notify-send as it does not support the wait option
      },)
    await page.screenshot({ path: 'pic/unterlagen/frei/' + countUnterlagen + 'Termin.jpg', fullPage: true });
  }
}






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


