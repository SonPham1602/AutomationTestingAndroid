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
    sessionName: 'Automation test session',
    sessionDescription: '',
    deviceOrientation: 'portrait',
    noReset: true,
    fullReset: false,
    captureScreenshots: true,
    // The maximum size of application is 500MB
    // By default, HTTP requests from testing library are expired
    // in 2 minutes while the app copying and installation may
    // take up-to 30 minutes. Therefore, you need to extend the HTTP
    // request timeout duration in your testing library so that
    // it doesn't interrupt while the device is being initialized.
    app: 'kobiton-store:35901',

    deviceGroup: 'ORGANIZATION',
    // Specify UDID of a device you or your company owns
    udid: 'RS988bf0b0cdd'
}

main()
async function main() {

    wd.configureHttp({
        timeout: 20 * 60000, // 20 mins
        retries: 3,
        retryDelay: 1000
    })

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

    await driver.waitForElementById("io.github.hidroh.materialistic:id/search_button")
    .click()
    .waitForElementById("io.github.hidroh.materialistic:id/search_src_text")
    .click()
    .sendKeys('Kobiton')
    .sleep(3000)
    .pressKeycode(66)
    .waitForElementById("io.github.hidroh.materialistic:id/swipe_layout")
    .waitForElementsByClassName("android.widget.FrameLayout")
    .then( (els) => {
        els[1].click()
    })
    .sleep(5000)
    .flick(0,-1000,1000)
    .sleep(10000)
    .flick(0,-1000,1000)
    .back()
    .waitForElementById("io.github.hidroh.materialistic:id/swipe_layout")
    .waitForElementsByClassName("android.widget.FrameLayout")
    .then( (els) => {
        els[2].click()
    })
    .sleep(5000)
    .flick(0,-1000,2000)
    .sleep(10000)
    .flick(0,-1000,2000)
    .sleep(10000)
    .flick(0,-1000,2000)
    .back()
    .waitForElementById("io.github.hidroh.materialistic:id/swipe_layout")
    .waitForElementsByClassName("android.widget.FrameLayout")
    .then( (els) => {
        els[0].flick(-1000,0,500)
    })
    .waitForElementById("io.github.hidroh.materialistic:id/search_button")
    .click()
    .waitForElementById("io.github.hidroh.materialistic:id/search_src_text")
    .click()
    .sendKeys('automation testing')
    .pressKeycode(66)
    .waitForElementById("io.github.hidroh.materialistic:id/swipe_layout")
    .waitForElementsByClassName("android.widget.FrameLayout")
    .then( (els) => {
        els[3].click()
    })
    .sleep(10000)
    .flick(0,-500,1000)
    .sleep(10000)
    .flick(0,-500,1000)
    .sleep(10000)
    .flick(0,-500,1000)
    .back()
    .waitForElementByXPath("//android.widget.ImageView[@content-desc='More options']")
    .click()
    .waitForElementById("io.github.hidroh.materialistic:id/title")
    .click()
    .waitForElementById("io.github.hidroh.materialistic:id/switchWidget")
    .click()
    .waitForElementById("io.github.hidroh.materialistic:id/content")
    .flick(0,1000,500)
    .waitForElementByXPath("//android.widget.ImageButton[@content-desc='Open drawer']")
    .click()
    .waitForElementById("io.github.hidroh.materialistic:id/drawer_favorite")
    .click()
    .waitForElementById("io.github.hidroh.materialistic:id/recycler_view")
    .waitForElementsByClassName("android.widget.RelativeLayout")
    .then((els) => {
        els[0].click()
    })
    .flick(0,500,500)
    .sleep(5000)
    .flick(0,500,500)
    .sleep(5000)
    .back()
    .waitForElementByXPath("(//android.widget.ImageButton[@content-desc='More'])[1]")
    .click()
    .waitForElementByXPath("//android.widget.TextView[@text='Add comment']")
    .click()
    .waitForElementById("io.github.hidroh.materialistic:id/edittext_body")
    .click()
    .sendKeys("A article is very good!!!!")
    .waitForElementById("io.github.hidroh.materialistic:id/menu_send")
    .click()


    
    

    




    // await driver.waitForElementById("android:id/list")
    //     .flick(0, -1000, 100)
    //     .sleep(5000)
    //     .flick(0, -1000, 100)
    //     .sleep(5000)
    //     .flick(0, -1000, 100)
    //     .sleep(5000)
    //     .flick(0, 1000, 100)
    //     .waitForElementById("io.github.hidroh.materialistic:id/swipe_layout")
    //     .waitForElementsByClassName("android.widget.FrameLayout")
    //     .then((els) => {
    //         els[2].click()
    //             .waitForElementById("io.github.hidroh.materialistic:id/content_frame")
    //             .sleep(3000)
    //             .flick(0, -1200, 100)
    //     })

    //     .sleep(2000)
    //     .flick(0, -1200, 100)
    //     .sleep(2000)
    //     .flick(0, -1200, 100)
    //     .sleep(2000)
    //     .flick(0, +1200, 100)
    //     .sleep(2000)
    //     .flick(0, +1200, 100)
    //     .sleep(2000)
    //     it("Testing navigation",() => {
    //         return driver.waitForElementByXPath("//android.widget.ImageButton[@content-desc='Navigate up']")
    //         .click()
    //         .waitForElementById("io.github.hidroh.materialistic:id/swipe_layout")
    //         .waitForElementsByClassName("android.widget.FrameLayout")
    //         .then((els) => {
    //             els[5].click()
    //         })
    //         .waitForElementById("io.github.hidroh.materialistic:id/content_frame")
    //         .flick(0, -1200, 100)
    //         .sleep(10000)
    //         .flick(0, -1200, 100)
    //         .sleep(10000)
    //         .flick(0, -1200, 100)
    //         .sleep(10000)
    //         .flick(0, -1200, 100)
    //         .sleep(10000)
    //     });
        







    if (driver != null) {
        try {
            await driver.quit()
        }
        catch (err) {
            console.error(`quit driver: ${err}`)
        }
    }
}