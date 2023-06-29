const axios = require('axios');
const puppeteer = require('puppeteer');
const ChatID = '11897986';
const Auth = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNjg4NjA5MDU0LCJpYXQiOjE2ODgwMDkwNTQsInN1YiI6IjBmYTgxMTU5LTQ5NDItNDExYi04YjRmLTQwYTcyMTFkNjViYSIsImVtYWlsIjoiZTE2ZDc3NDA0MzRAbGFtYXN0aWNvdHMuY29tIiwicGhvbmUiOiIiLCJhcHBfbWV0YWRhdGEiOnsicHJvdmlkZXIiOiJlbWFpbCIsInByb3ZpZGVycyI6WyJlbWFpbCJdfSwidXNlcl9tZXRhZGF0YSI6e30sInJvbGUiOiJhdXRoZW50aWNhdGVkIiwiYWFsIjoiYWFsMSIsImFtciI6W3sibWV0aG9kIjoicGFzc3dvcmQiLCJ0aW1lc3RhbXAiOjE2ODgwMDkwNTR9XSwic2Vzc2lvbl9pZCI6IjI2M2I0ZmM0LTUwZDUtNDMyZC04MTM0LTQ3ZDQ5MGQ2OThmNSJ9.saNw5k-a3YEvjZ_4_HG_oLBGnoAEBMV91G708jlpL1U";
const ErrorNone = 200;
const ErrorTooFew = 1000;

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('https://www.janitorai.com');

  async function mainLoop() {
    await sendPostRequest();
    console.log("Finished spamming! Cooldown time...");

    setTimeout(mainLoop, 6000);
  }

  mainLoop();

})();
  
  async function sendPostRequest() {
    let errorcount = 0;
  
    for (let i = 0; i < 50; i++) {
      setTimeout(async () => {
        try {
          const ci = i;
          const is_bot = i % 2 === 0;
          const is_main = !is_bot;
  
          await axios.post(`https://miguel.janitorai.com/chats/${ChatID}/messages`, {
            message: "1",
            is_bot,
            is_main,
          }, {
            headers: {
              Authorization: Auth,
              "Content-Type": "application/json",
            },
          });
  
          console.log(ci);
          if (ci >= 49) console.log("Done with batch.");
        } catch (error) {
          errorcount++;
          console.log(`Error occured! ${errorcount} errors out of 50`);
        }
      }, i *10);
    }
  
    setTimeout(sendPostRequest, errorcount ? (30 < errorcount ? 6000 : ErrorTooFew) : ErrorNone);
  }
  
  sendPostRequest();

