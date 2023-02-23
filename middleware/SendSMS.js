const {Vonage} = require('@vonage/server-sdk');

const checkOTP = require('../function/checkOTP');
const vonage = new Vonage({
  apiKey: "47d79273",
  apiSecret: "9bdqME3IM8AZeASd"
});
exports.SendSMS = async (req, res, next)=>{
   
    //   const from = "0356492255"
    // const to = "0356492230"
    // const text = 'A text message sent using the Vonage SMS API'
    
      vonage.verify.start({
        number: "84356492230",
        brand: "Vonage"
      })
        .then((resp) => {
          console.log('token',resp.request_id)
          res.json({token : resp.request_id});
        })
        .catch(err => console.error(err));

// await vonage.sms.send({to, from, text})
//         .then(resp => { console.log('Message sent successfully'); console.log(resp); })
//         .catch(err => { console.log('There was an error sending the messages.'); console.error(err); });
}

exports.VerifyOTP = async (req, res, next)=>{
  const MaXacNhan = req.query.MaXacNhan;
  const Token = req.query.Token;
  const check = await checkOTP.checkOTP(Token, MaXacNhan);
  console.log(check);
  if(check.result.status === '0'){
    res.json({result: 'success'});
  }
  else{
    res.json({result: 'failed'});
  }

}