import { sendEmail } from "../../util/sendEmail";

export const testEmailRoute = {
    path: '/api/test-email',
    method: 'post',
    handler: async (req, res) => {
        try {
            await sendEmail({
                subject:'Hello from the Node SDK!',
                sender : {email:'kazmi.saidmojtaba@gmail.com', name:'Sendinblue'},
                to : [{name: 'John Doe', email:'smkaz46@gmail.com'}],
                htmlContent: '<html><body><h1> All is well done {{params.bodyMessage}}</h1></body></html>',
            });
            res.sendStatus(200);
        } catch (e) {
            console.log(e);
            res.sendStatus(500);
        }
    }
}