var SibApiV3Sdk = require('sib-api-v3-sdk');
let defaultClient = SibApiV3Sdk.ApiClient.instance;
let apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.SIB_API_KEY;

export const sendEmail = ({ subject, sender, to, htmlContent }) => {
    const msg = {subject, sender, to, htmlContent}
    let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi()
    return apiInstance.sendTransacEmail(msg);
}