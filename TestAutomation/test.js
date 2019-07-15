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
  udid:               'RS988bf0b0cdd' 
}

main()



async function main() {
  let driver = wd.promiseChainRemote(kobitonServerConfig)
  try {
   const caps = await driver.init(desiredCaps)
   console.log(caps)
 }
 catch (err) {
   if (err.data) {
     console.error(`init driver: ${err.data}`)
   }
   throw err
 }

 await driver.get('https://www.thegioididong.com')
 .waitForElementByClassName('mobile')
 .click()

 .waitForElementByClassName(' ')
 .click()
 // .sleep(3000)
 // .keys(wd.SPECIAL_KEYS.Enter)



 if (driver != null) {
   try {
     await driver.quit()
   }
   catch (err) {
     console.error(`quit driver: ${err}`)
   }
 }
}
