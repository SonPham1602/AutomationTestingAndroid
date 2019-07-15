let wd = require('wd');
var chai = require('chai');
var should = chai.should();
let expect = chai.expect;  

var kobitonServerConfig = {
  protocol: 'https',
  host: 'api.kobiton.com',
  auth: 'tramy1602:22fd3b37-c6a7-47ab-99fd-d67d1ae6ac72'
}

var desiredCaps = { 
  // The generated session will be visible to you only. 
  sessionName:        'Automation test session',
  sessionDescription: '', 
  deviceOrientation:  'portrait',  
  noReset:            true,
  fullReset:          false, 
  captureScreenshots: true,  
  networkActivity:    false, 
  browserName:        'chrome', 
  deviceGroup:        'ORGANIZATION', 
  // Specify UDID of a device you or your company owns
  udid:               'ENU7N16321003570' 
}

let driver

describe('Android Web sample', () => {

 before(async () => {
   driver = wd.promiseChainRemote(kobitonServerConfig)

   driver.on('status', (info) => {
     console.log(info.cyan)
   })
   driver.on('command', (meth, path, data) => {
     console.log(' > ' + meth.yellow, path.grey, data || '')
   })
   driver.on('http', (meth, path, data) => {
     console.log(' > ' + meth.magenta, path, (data || '').grey)
   })

   try {
     await driver.init(desiredCaps)
   }
   catch (err) {
     if (err.data) {
       console.error(`init driver: ${err.data}`)
     }
     throw err
   }
 })

 it('should return the title that contains Kobiton', async () => {
   await driver.get('https://www.google.com')
   .waitForElementByName('q')
   .sendKeys('Kobiton')
   .sleep(3000)
   .keys(wd.SPECIAL_KEYS.Enter)
   let msg = await driver.title()
   assert.include(msg, 'Kobiton - Google Search')
 })

 after(async () => {
   if (driver != null) {
     try {
       await driver.quit()
     }
     catch (err) {
       console.error(`quit driver: ${err}`)
     }
   }
 })
})