const {Vonage} = require('@vonage/server-sdk');

const vonage = new Vonage({
    apiKey: "47d79273",
    apiSecret: "9bdqME3IM8AZeASd"
});

// 1404
exports.checkOTP = async (REQUEST_ID, CODE) =>{
  try {
    const result = await  vonage.verify.check(REQUEST_ID, CODE);
    console.log(result);
    return {
        result: result
    }
  } catch (error) {
    console.log('error',error);
  }
    
  }