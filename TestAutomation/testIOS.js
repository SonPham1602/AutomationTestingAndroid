let wd = require('wd');
var chai = require('chai');
var should = chai.should();
let expect = chai.expect;  
var fs = require('fs');


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
  // The maximum size of application is 500MB
  // By default, HTTP requests from testing library are expired
  // in 2 minutes while the app copying and installation may
  // take up-to 30 minutes. Therefore, you need to extend the HTTP
  // request timeout duration in your testing library so that
  // it doesn't interrupt while the device is being initialized.
  app:                'kobiton-store:35344',
  
  deviceGroup:        'ORGANIZATION',
  // Specify UDID of a device you or your company owns
  udid:               '471e46fb5d4dc6bcf0a55924a421a9548957ce05'
}

function SaveXML(name,data){
  fs.writeFile(name, data, function(err) {
    if(err) {
      return console.log(err);
    }

    console.log("The file was saved!");
  }); 
}

main()



async function main(){
  wd.configureHttp({
    timeout: 20 * 60000, // 20 mins
    retries: 3,
    retryDelay: 1000
  })
  let pageSource
  let driver = wd.promiseChainRemote(kobitonServerConfig)
  try{
   const caps = await driver.init(desiredCaps)
   console.log(caps)
  }
  catch (err){
   if (err.data) {
     console.error(`init driver: ${err.data}`)
   }

   throw err
 }

  //pageSource = await driver.source()
  //console.log(pageSource);
  await driver 
    .waitForElementByXPath("//XCUIElementTypeButton[@label='START A REPAIR']")
    .click()
  //Get XML
  pageSource = await driver.source()
  const fs = require('fs');
  fs.writeFile("testIOS2.xml", pageSource, function(err) {
      if(err) {
          return console.log(err);
      }

      console.log("The file was saved!");
  }); 
  await driver 
    .waitForElementByXPath("//XCUIElementTypeSearchField[@label='Search']")
    .click()
    .type("mac")
    .sleep(3000)
    .keys(wd.SPECIAL_KEYS.Enter)
  if (driver != null) {
   try {
     await driver.quit()
   }
   catch (err) {
     console.error(`quit driver: ${err}`)
   }
 }
}
