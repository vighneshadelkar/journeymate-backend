const axios = require('axios');

const generateOTP = () => {
     return Math.floor(100000 + Math.random() * 900000).toString();
};

async function sendOtp(mobile) {
     const otp = generateOTP();
     const axios = require('axios');


     const config = {
          method: 'get',
          url: 'https://www.fast2sms.com/dev/bulkV2',
          params: {
               authorization: process.env.FAST2SMS_API_KEY,
               sender_id: 'MTRAFN',
               message: '165931',
               variables_values: `${otp}|asdaswdx`,
               route: 'dlt',
               numbers: mobile
          },
          headers: {
               'cache-control': 'no-cache'
          }
     };


     axios(config)
          .then(function (response) {
               console.log(response.data);
          })
          .catch(function (error) {
               console.error(error);
          });

}

module.exports = sendOtp