const axios = require('axios');
const ChatID = '5768450';
const Auth = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNjg3NzgxMjE0LCJzdWIiOiJiNjJkYWYwMi0xMjRkLTRjOTctYWI2NC1iZjhkY2U0MDQzNzAiLCJlbWFpbCI6ImFsdHRva2lsbGFsbEBwcm90b24ubWUiLCJwaG9uZSI6IiIsImFwcF9tZXRhZGF0YSI6eyJwcm92aWRlciI6ImVtYWlsIiwicHJvdmlkZXJzIjpbImVtYWlsIl19LCJ1c2VyX21ldGFkYXRhIjp7fSwicm9sZSI6ImF1dGhlbnRpY2F0ZWQiLCJhYWwiOiJhYWwxIiwiYW1yIjpbeyJtZXRob2QiOiJwYXNzd29yZCIsInRpbWVzdGFtcCI6MTY4NzE4MTIxNH1dLCJzZXNzaW9uX2lkIjoiNDBkZjJmNjgtY2EzZS00NDQzLTllZDctNDBhNzgwYTRjMjFlIn0.j-4r5X_P8Ozch9_lVFLws7rPFKrZOwy-H3r_LV-9hdI";
const ErrorNone = 200;
const ErrorTooFew = 1000;
sendPostRequest();
  
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

