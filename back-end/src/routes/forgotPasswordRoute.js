import { v4 as uuid } from 'uuid';
import { sendEmail } from '../../util/sendEmail';
import { getDbConnection } from '../db';

export const forgotPasswordRoute = {
    path: '/api/forgot-password/:email',
    method: 'put',
    handler: async (req, res) => {
        const { email } = req.params;

        const db = getDbConnection('react-auth-db');
        const passwordResetCode = uuid();

        const { result } = await db.collection('users')
            .updateOne({ email }, { $set: { passwordResetCode } });

        if (result.nModified > 0) {
            try {
                await sendEmail({
                    subject: 'Password Reset',
                    sender: {email:'kazmi.saidmojtaba@gmail.com', name:'Sendinblue'},
                    to: [{email: email}],
                    htmlContent:`
                        <html>
                            <body>
                                <h1> To reset your password, click this link: {{params.bodyMessage}}</h1>
                                <p>http://localhost:3000/reset-password/${passwordResetCode}</p>
                            </body>
                        </html>`,
                })
            } catch (e) {
                console.log(e);
                res.sendStatus(500);
            }
        }

        res.sendStatus(200);
    }
}