const {Vonage} = require('@vonage/server-sdk');
const vonage = new Vonage({
  apiKey: "23c5f1a3",
  apiSecret: "bc77vDUy3fmoBeZB"
});
exports.SendSMS = async (req, res, next)=>{
   
    //   const from = "0356492255"
    // const to = "0356492230"
    // const text = 'A text message sent using the Vonage SMS API'
    
      vonage.verify.start({
        number: "84356492230",
        brand: "Vonage"
      })
        .then(resp => console.log(resp.request_id))
        .catch(err => console.error(err));

// await vonage.sms.send({to, from, text})
//         .then(resp => { console.log('Message sent successfully'); console.log(resp); })
//         .catch(err => { console.log('There was an error sending the messages.'); console.error(err); });
}

exports.checkOTP = async (req, res, next) =>{
  vonage.verify.check(REQUEST_ID, CODE)
  .then(resp => console.log(resp))
  .catch(err => console.error(err));
}