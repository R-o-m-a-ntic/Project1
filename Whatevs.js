const axios = require('axios');
const ChatID = '10971518';
const Auth = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNjg4MzQwMjc3LCJpYXQiOjE2ODc3NDAyNzcsInN1YiI6IjdhMGQwZDY3LWE4ODgtNDdkZi04ZDY0LThlODI3NjYwOTdlMCIsImVtYWlsIjoiYWE5NDc3NDAyNjlAYmVhY29ubWVzc2VuZ2VyLmNvbSIsInBob25lIjoiIiwiYXBwX21ldGFkYXRhIjp7InByb3ZpZGVyIjoiZW1haWwiLCJwcm92aWRlcnMiOlsiZW1haWwiXX0sInVzZXJfbWV0YWRhdGEiOnt9LCJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFhbCI6ImFhbDEiLCJhbXIiOlt7Im1ldGhvZCI6Im90cCIsInRpbWVzdGFtcCI6MTY4Nzc0MDI3N31dLCJzZXNzaW9uX2lkIjoiOGE5NTdlMjEtMzNjNi00MWJiLWI3ZTctY2QxMmQyOWZjYWZhIn0.sZtXmTivNnoG5F4BsjckQW9esY5YGGXo5LHJnJ7ztG4";
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

