const SibApiV3Sdk = require('sib-api-v3-sdk');

async function sendEmail(
  senderEmail,
  senderName,
  receiverEmail,
  receiverName,
  subject,
  content
) {
  try {
    const defaultClient = SibApiV3Sdk.ApiClient.instance;
    const apiKey = defaultClient.authentications['api-key'];
    apiKey.apiKey = process.env.SEND_IN_BLUE_API_KEY;

    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

    const sender = { email: senderEmail, name: senderName };
    const receivers = [{ email: receiverEmail, name: receiverName }];

    const sendEmail = await apiInstance.sendTransacEmail({
      sender,
      to: receivers,
      subject,
      textContent: content,
      htmlContent: `<p>${content}</p>`,
    });

    console.log('Email sent successfully:', sendEmail);

    return true;
  } catch (error) {
    console.error('Error sending email:', error.message,error);
    return false;
  }
}

module.exports=sendEmail