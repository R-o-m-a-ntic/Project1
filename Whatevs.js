const axios = require('axios')
const { HttpsProxyAgent } = require('https-proxy-agent')
const proxyList = [
  'http://177.86.120.11:3128',
  'http://54.237.145.145:80',
  'http://5.235.6.188:8080',
  'http://77.247.108.17:33080',
  'http://171.226.91.210:14023',
  'http://47.242.151.36:3128',
  'http://103.165.155.19:8080',
  'http://154.26.132.214:11990',
  'http://158.160.56.149:8080',
  'http://35.213.91.45:80'
]
axios.defaults.headers.common['User-Agent'] = 'GinkBot/1.0'
function getRandomProxy () {
  return proxyList[Math.floor(Math.random() * proxyList.length)]
}
const ChatID = '11897986'
const Auth = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNjg4NjA5MDU0LCJpYXQiOjE2ODgwMDkwNTQsInN1YiI6IjBmYTgxMTU5LTQ5NDItNDExYi04YjRmLTQwYTcyMTFkNjViYSIsImVtYWlsIjoiZTE2ZDc3NDA0MzRAbGFtYXN0aWNvdHMuY29tIiwicGhvbmUiOiIiLCJhcHBfbWV0YWRhdGEiOnsicHJvdmlkZXIiOiJlbWFpbCIsInByb3ZpZGVycyI6WyJlbWFpbCJdfSwidXNlcl9tZXRhZGF0YSI6e30sInJvbGUiOiJhdXRoZW50aWNhdGVkIiwiYWFsIjoiYWFsMSIsImFtciI6W3sibWV0aG9kIjoicGFzc3dvcmQiLCJ0aW1lc3RhbXAiOjE2ODgwMDkwNTR9XSwic2Vzc2lvbl9pZCI6IjI2M2I0ZmM0LTUwZDUtNDMyZC04MTM0LTQ3ZDQ5MGQ2OThmNSJ9.saNw5k-a3YEvjZ_4_HG_oLBGnoAEBMV91G708jlpL1U'
const puppeteerExtra = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteerExtra.use(StealthPlugin())
const ErrorNone = 200
const ErrorTooFew = 1000
const puppeteer = require('puppeteer')
const loopInterval = 500
const loopDuration = 500;

(async () => {
  const browser = await puppeteerExtra.launch({ headless: false })
  const page = await browser.newPage()

  await page.goto('https://www.janitorai.com')

  async function mainLoop () {
    await sendPostRequest()
    console.log('Finished spamming! Cooldown time...')

    setTimeout(sendPostRequest, Math.floor(Math.random() * 5000) + 1000)
  }

  mainLoop()

  async function sendPostRequest () {
    const agent = new HttpsProxyAgent(getRandomProxy())
    let errorcount = 0

    for (let i = 0; i < 50; i++) {
      setTimeout(async () => {
        try {
          const ci = i
          const is_bot = i % 2 === 0
          const is_main = !is_bot

          await axios.post(`https://miguel.janitorai.com/chats/${ChatID}/messages`, {
            message: '1',
            is_bot,
            is_main
          }, {
            headers: {
              Authorization: Auth,
              'Content-Type': 'application/json'
            },
            httpsAgent: agent
          })

          console.log(ci)
          if (ci >= 49) console.log('Done with batch.')
        } catch (error) {
          errorcount++
          console.log(`Error occured: ${error.message} - ${error.statusCode || 'No status code'} (${errorcount} errors out of 50)`)
        }
      }, i * 10)
    }

    setTimeout(sendPostRequest, errorcount ? (errorcount > 30 ? 6000 : ErrorTooFew) : ErrorNone)
  }

  mainLoop()
  await browser.close()
})()
